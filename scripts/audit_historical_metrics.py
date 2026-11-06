#!/usr/bin/env python3
"""One-time public Roblox metrics audit for studio and migrated experiences.

Keep source records distinct and never assume a current CCU value is a historical peak.
"""
from __future__ import annotations
import json
import pathlib
import time
import urllib.parse
import urllib.request
import urllib.error

ROOT = pathlib.Path(__file__).resolve().parents[1]
DEST = ROOT / "research" / "game-metrics-audit.json"
UA = {"User-Agent": "RedParasolPublicStudioAudit/1.0", "Accept": "application/json"}
LEGACY = [
    {"game": "seishun", "placeId": 99916990523640, "group": "HanamiSoft", "note": "Old upload explicitly redirects to current Seishun"},
    {"game": "kiseki", "placeId": 133366389873083, "group": "Red Parasol Games (user-identified)", "note": "Kiseki legacy upload. Verify creator of universe before describing public ownership"},
    {"game": "oath-of-office", "placeId": 110814051639689, "group": "Chesapeake Studios", "note": "Old political simulator redirects to current version"},
    {"game": "command-authority", "placeId": 115895476455258, "group": "Chesapeake Studios", "note": "Old military roleplay redirects to current version"},
    {"game": "marine-academy", "placeId": 71096510493525, "group": "Reef Points", "note": "Old academy explicitly redirects"},
    {"game": "army-bootcamp", "placeId": 135329589664705, "group": "Reef Points", "note": "Former Army Academy; product lineage requires confirmation"},
]
GROUPS = [
    {"name": "Chesapeake Studios", "id": 17005184},
    {"name": "Reef Points", "id": 10922050},
    {"name": "HanamiSoft", "id": 35475452},
]

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    for i in range(4):
        try:
            with urllib.request.urlopen(req,timeout=35) as r:
                return json.load(r)
        except (urllib.error.HTTPError, urllib.error.URLError) as e:
            if isinstance(e,urllib.error.HTTPError) and e.code not in (429,500,502,503,504): raise
            if i == 3: raise
            time.sleep(i+1)
    raise RuntimeError("Unreachable")

def run():
    current=json.loads((ROOT/"scripts"/"verified-games.json").read_text())
    all_rows=[dict(x, era="current") for x in current]
    all_rows += [dict(x,era="legacy") for x in LEGACY]
    ids={}
    errors=[]
    for row in all_rows:
        place=row["placeId"]
        try:
            info=fetch(f"https://apis.roblox.com/universes/v1/places/{place}/universe")
            uid=int(info["universeId"])
            if not uid: raise ValueError("Zero universeId")
            row["universeId"]=uid
            ids[uid]=1
        except Exception as e:
            if row.get("universeId"):
                ids[int(row["universeId"])]=1
                row["note"]=str(row.get("note",""))+"; used provided fallback universe ID"
            else:
                errors.append({"placeId":place,"error":str(e)})
                row["error"]=str(e)
    found={}
    keys=list(ids)
    for start in range(0,len(keys),40):
        batch=keys[start:start+40]
        uri="https://games.roblox.com/v1/games?"+urllib.parse.urlencode({"universeIds":",".join(map(str,batch))})
        try:
            rows=fetch(uri).get("data",[])
            for g in rows:
                found[int(g["id"])]={
                    "name":g.get("name"),"visits":g.get("visits"),
                    "playingAtAudit":g.get("playing"),"created":g.get("created"),
                    "creator":g.get("creator"),
                    "rootPlaceId":g.get("rootPlaceId")
                }
        except Exception as e:
            errors.append({"universes":batch,"error":str(e)})
    for row in all_rows:
        row["public"]=found.get(row.get("universeId"),None)
    groups=[]
    for group in GROUPS:
        entry=dict(group)
        try:
            all_games=[]
            cursor=""
            for page in range(8):
                params={"accessFilter":2,"limit":50,"sortOrder":"Asc"}
                if cursor:params["cursor"]=cursor
                result=fetch(f'https://games.roblox.com/v2/groups/{group["id"]}/games?'+urllib.parse.urlencode(params))
                all_games+=result.get("data",[])
                cursor=result.get("nextPageCursor") or ""
                if not cursor:break
            entry["games"]=[{"id":g.get("id"),"name":g.get("name"),"placeVisits":g.get("placeVisits"),
                               "rootPlace":g.get("rootPlace")} for g in all_games]
        except Exception as e:entry["error"]=str(e)
        groups.append(entry)
    compiled={}
    for row in all_rows:
        game=row.get("game") or row["slug"]
        compiled.setdefault(game,[]).append(row)
    totals={}
    for slug, rows in compiled.items():
        numbers=[r["public"]["visits"] for r in rows if r.get("public") and isinstance(r["public"].get("visits"),int)]
        totals[slug]={"observedVisits":sum(numbers),"complete":len(numbers)==len(rows),
                      "knownVersions":len(rows),"observedVersions":len(numbers),
                      "note":"Sum is only of identified universes. Further uploads may exist; don't publish as full lifetime total unless reconciled."}
    DEST.parent.mkdir(parents=True,exist_ok=True)
    report={"games":compiled,"totals":totals,"groupCatalogs":groups,"errors":errors,
       "definitions":{"playingAtAudit":"A point-in-time CCU, NOT historical peak",
       "visits":"Lifetime visit count for one universe",
       "observedVisits":"Sum only of public records identified in this audit, not certified total"}}
    DEST.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n")
    print("Audited",len(all_rows),"current+legacy pages; Roblox details",len(found),"errors",len(errors))
    for slug,record in totals.items():
        print(slug,record["observedVisits"],"complete",record["complete"])
    for g in groups:print(g["name"],"group entries",len(g.get("games",[])),g.get("error",""))
if __name__=="__main__":run()
