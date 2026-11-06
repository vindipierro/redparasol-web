#!/usr/bin/env python3
"""Create a sourced, review-only public Roblox portfolio snapshot.

This script deliberately does not modify public game stats. Game copies are
matched by known Place IDs, never just by title or group membership.
"""
from __future__ import annotations

import datetime as dt
import json
import pathlib
import time
import urllib.parse
import urllib.request
import urllib.error

ROOT = pathlib.Path(__file__).resolve().parents[1]
CATALOG = ROOT / "scripts" / "verified-games.json"
OUTPUT = ROOT / "research" / "public-roblox-history.json"

LEGACY = [
    {"slug": "seishun", "placeId": 99916990523640, "label": "HanamiSoft original"},
    {"slug": "oath-of-office", "placeId": 110814051639689, "label": "Chesapeake Studios original"},
    {"slug": "command-authority", "placeId": 115895476455258, "label": "Chesapeake Studios original"},
    {"slug": "marine-academy", "placeId": 71096510493525, "label": "Reef Points original"},
    {"slug": "kiseki", "placeId": 133366389873083, "label": "Older Kiseki / Red Parasol Games-era release"},
    {"slug": "army-bootcamp", "placeId": 135329589664705, "label": "Reef Points Army Academy original"},
]
EXPLICIT_GROUPS = {
    17005184: "Chesapeake Studios",
    10922050: "Reef Points",
}

def get_json(url: str) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": "RedParasol/1.0 (public portfolio history audit)", "Accept": "application/json"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.load(response)
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError):
            if attempt == 2:
                raise
            time.sleep(2 ** attempt + 1)
    raise RuntimeError("Unable to fetch")

def universe_for_place(place: int, fallback=None):
    try:
        payload = get_json(f"https://apis.roblox.com/universes/v1/places/{place}/universe")
        return int(payload["universeId"])
    except Exception as exc:
        if fallback:
            return int(fallback)
        raise RuntimeError(f"Failed to resolve Place {place}: {exc}") from exc

def fetch_group_games(gid: int):
    results = []
    cursor = None
    for _ in range(5):
        query = {"accessFilter": "Public", "sortOrder": "Asc", "limit": 50}
        if cursor:
            query["cursor"] = cursor
        data = get_json("https://games.roblox.com/v2/groups/" + str(gid) + "/gamesV2?" + urllib.parse.urlencode(query))
        for g in data.get("data", []):
            results.append({
                "universeId": g.get("id"),
                "name": g.get("name"),
                "visits": g.get("placeVisits"),
                "rootPlaceId": (g.get("rootPlace") or {}).get("id"),
                "description": (g.get("description") or "")[:800],
            })
        cursor = data.get("nextPageCursor")
        if not cursor:
            break
    return results

def main():
    active = json.loads(CATALOG.read_text())
    input_records = [{"kind": "current", **r} for r in active] + [{"kind": "legacy", **r} for r in LEGACY]
    mapping = {}
    errors = []
    for item in input_records:
        try:
            universe = universe_for_place(item["placeId"], item.get("universeId"))
            mapping[universe] = mapping.get(universe, []) + [item]
            item["resolvedUniverseId"] = universe
            print("Resolved", item["slug"], item["kind"], universe, flush=True)
        except Exception as exc:
            item["error"] = str(exc)
            errors.append(str(exc))
    ids = list(mapping)
    by_id = {}
    for i in range(0, len(ids), 40):
        query = urllib.parse.urlencode({"universeIds": ",".join(map(str, ids[i:i + 40]))})
        response = get_json("https://games.roblox.com/v1/games?" + query)
        for game in response.get("data", []):
            by_id[int(game["id"])] = game
    current, historical = [], []
    discovered_groups = dict(EXPLICIT_GROUPS)
    for entry in input_records:
        u = entry.get("resolvedUniverseId")
        g = by_id.get(u) if u else None
        if not g:
            errors.append(f"Missing metadata for {entry['slug']} {entry['placeId']}")
        creator = (g or {}).get("creator") or {}
        if creator.get("type") == "Group" and creator.get("id"):
            discovered_groups[int(creator["id"])] = creator.get("name") or str(creator["id"])
        result = {
            "slug": entry["slug"],
            "placeId": entry["placeId"],
            "universeId": u,
            "groupEra": entry.get("label", ""),
            "metadataAvailable": bool(g),
            "name": (g or {}).get("name"),
            "visits": (g or {}).get("visits"),
            "playing": (g or {}).get("playing"),
            "creator": creator,
            "created": (g or {}).get("created"),
            "updated": (g or {}).get("updated"),
            "description": (g or {}).get("description"),
            "rootPlaceId": (g or {}).get("rootPlaceId"),
            "robloxUrl": f"https://www.roblox.com/games/{entry['placeId']}/",
        }
        (current if entry["kind"] == "current" else historical).append(result)

    group_games = {}
    for group_id, group_name in sorted(discovered_groups.items()):
        try:
            game_list = fetch_group_games(group_id)
            group_games[str(group_id)] = {"groupName": group_name, "games": game_list, "count": len(game_list)}
            print("Group", group_id, group_name, "games", len(game_list), flush=True)
        except Exception as exc:
            group_games[str(group_id)] = {"groupName": group_name, "error": str(exc)}
            print("Group collection not available for", group_id, exc, flush=True)

    sums = {}
    for game in current + historical:
        slot = sums.setdefault(game["slug"], {"knownReleases": [], "knownVisitSum": 0, "complete": True})
        if game["universeId"] in [x["universeId"] for x in slot["knownReleases"]]:
            slot["complete"] = False
            continue
        visits = game["visits"]
        if not isinstance(visits, int) or visits < 0:
            slot["complete"] = False
        else:
            slot["knownVisitSum"] += visits
        slot["knownReleases"].append({"kind": "legacy" if game in historical else "current", "placeId": game["placeId"], "universeId": game["universeId"], "visits": visits, "creator": (game["creator"] or {}).get("name")})

    payload = {
        "retrievedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "source": "https://games.roblox.com/v1/games?universeIds=...",
        "warning": "Public snapshot. knownVisitSum covers listed releases only; not an exhaustive studio history. CCU is an instantaneous sample, not an all-time peak. Group lists are candidates, NOT attribution.",
        "current": current,
        "historical": historical,
        "byGame": sums,
        "creatorGroupDiscovery": group_games,
        "errors": errors,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n")
    print("Wrote", OUTPUT, "with", len(current), "active and", len(historical), "historical releases, errors:",len(errors))

if __name__ == "__main__":
    main()
