#!/usr/bin/env python3
"""Refresh a strictly internal display ranking from public Roblox CCU metadata.

Only an ordered list of slugs is saved; the numeric CCU values never appear in
the published static data. A bad or partial upstream response cannot replace a
previously successful snapshot.
"""
from __future__ import annotations

import json
import pathlib
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "verified-games.json"
DEST = ROOT / "src" / "data" / "ccu-order.json"
HEADERS = {
    "User-Agent": "RedParasolStudioSite/1.0 (public Roblox games metadata)",
    "Accept": "application/json",
}


def get_json(url: str) -> dict:
    request = urllib.request.Request(url, headers=HEADERS)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(request, timeout=35) as response:
                data = json.loads(response.read())
                if not isinstance(data, dict):
                    raise ValueError("Expected JSON object")
                return data
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as exc:
            if isinstance(exc, urllib.error.HTTPError) and exc.code not in (429, 500, 502, 503, 504):
                raise
            if attempt == 3:
                raise
            time.sleep(2 ** attempt + 1)
    raise RuntimeError("Roblox API could not be reached")


def main() -> None:
    entries = json.loads(SOURCE.read_text(encoding="utf-8"))
    if len(entries) != 13 or len({item["slug"] for item in entries}) != 13:
        raise ValueError("The verified 13-game catalog is missing or has duplicate slugs")

    universe_for_slug = {}
    for item in entries:
        url = f'https://apis.roblox.com/universes/v1/places/{item["placeId"]}/universe'
        try:
            data = get_json(url)
            universe_id = int(data["universeId"])
        except (ValueError, KeyError, TypeError, urllib.error.URLError) as exc:
            if item.get("universeId") is None:
                raise RuntimeError(f'Could not resolve universe for {item["slug"]}') from exc
            universe_id = int(item["universeId"])
        if universe_id <= 0 or universe_id in universe_for_slug.values():
            raise ValueError("Invalid or duplicated universe ID in the catalog")
        universe_for_slug[item["slug"]] = universe_id

    params = urllib.parse.urlencode({
        "universeIds": ",".join(str(value) for value in universe_for_slug.values())
    })
    data = get_json("https://games.roblox.com/v1/games?" + params).get("data")
    if not isinstance(data, list):
        raise ValueError("Roblox game response missing data list")

    ccu_by_id = {}
    for item in data:
        if not isinstance(item, dict):
            raise ValueError("Unexpected Roblox game metadata")
        game_id, playing = item.get("id"), item.get("playing")
        if not isinstance(game_id, int) or isinstance(playing, bool) or not isinstance(playing, int) or playing < 0:
            raise ValueError("Roblox returned invalid concurrent player counts")
        ccu_by_id[game_id] = playing

    if set(ccu_by_id) != set(universe_for_slug.values()):
        raise ValueError("Roblox returned partial game metadata; previous ordering preserved")

    order = [
        item["slug"]
        for item in sorted(
            entries,
            key=lambda game: -ccu_by_id[universe_for_slug[game["slug"]]]
        )
    ]
    result = json.dumps({"order": order}, indent=2) + "\n"

    if DEST.exists() and DEST.read_text(encoding="utf-8") == result:
        print("Current CCU ordering unchanged; no commit required.")
        return

    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(result, encoding="utf-8")
    print("Updated the private-of-metrics display ordering for all 13 games.")
    print("Numerical CCU values were not saved.")


if __name__ == "__main__":
    main()
