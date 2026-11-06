#!/usr/bin/env python3
"""Download the actual Roblox thumbnail artwork for verified Red Parasol games.

This runs in GitHub Actions, not in the visitor's browser. Only place IDs that
have been checked against official Roblox experience pages are included.
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
DEST = ROOT / "public" / "images" / "games"
OUTPUT = ROOT / "src" / "data" / "game-thumbnails.json"
USER_AGENT = "RedParasolWebsiteArtworkSync/1.0 (official public Roblox thumbnails)"


def request(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=35) as response:
                return response.read()
        except urllib.error.HTTPError as exc:
            if exc.code in (429, 500, 502, 503, 504) and attempt < 3:
                time.sleep(2 ** attempt + 1)
                continue
            raise
        except urllib.error.URLError:
            if attempt == 3:
                raise
            time.sleep(2 ** attempt + 1)
    raise RuntimeError("Request retries exhausted")


def json_request(url: str) -> dict:
    return json.loads(request(url))


def get_universe(game: dict) -> int:
    place_id = game["placeId"]
    url = f"https://apis.roblox.com/universes/v1/places/{place_id}/universe"
    try:
        universe = json_request(url)
        if universe.get("universeId"):
            return int(universe["universeId"])
    except Exception as exc:
        print(f"  Universe lookup failed for {place_id}: {exc}")
    if game.get("universeId"):
        print("  Using independently verified universe ID as fallback")
        return int(game["universeId"])
    raise RuntimeError("No verified universe ID available")


def thumbnail(universe_id: int, kind: str) -> str | None:
    if kind == "thumbnail":
        path = "/v1/games/multiget/thumbnails"
        params = {"universeIds": str(universe_id), "countPerUniverse": 1, "defaults": "true",
                  "size": "768x432", "format": "Png", "isCircular": "false"}
    else:
        path = "/v1/games/icons"
        params = {"universeIds": str(universe_id), "returnPolicy": "PlaceHolder",
                  "size": "512x512", "format": "Png", "isCircular": "false"}
    url = "https://thumbnails.roblox.com" + path + "?" + urllib.parse.urlencode(params)
    data = json_request(url).get("data") or []
    if not data:
        return None
    if kind == "thumbnail":
        values = data[0].get("thumbnails") or []
    else:
        values = data
    for item in values:
        if item.get("state") == "Completed" and item.get("imageUrl"):
            return item["imageUrl"]
    return None


def image_extension(content: bytes) -> str:
    if content[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if content[:3] == b"\xff\xd8\xff":
        return "jpg"
    if content[:4] == b"RIFF" and content[8:12] == b"WEBP":
        return "webp"
    raise ValueError("Roblox CDN response was not a valid supported image")


def main() -> None:
    entries = json.loads(SOURCE.read_text())
    DEST.mkdir(parents=True, exist_ok=True)
    art = json.loads(OUTPUT.read_text()) if OUTPUT.exists() else {}
    updated = 0

    for game in entries:
        slug = game["slug"]
        print(f"Resolving official thumbnail: {slug} / place {game['placeId']}", flush=True)
        try:
            universe_id = get_universe(game)
            cdn_url = thumbnail(universe_id, "thumbnail")
            if not cdn_url:
                print("  No completed landscape thumbnail; trying official game icon")
                cdn_url = thumbnail(universe_id, "icon")
            if not cdn_url:
                print("  No completed official artwork available; retaining placeholder")
                continue
            if not cdn_url.startswith("https://tr.rbxcdn.com/"):
                print(f"  Refusing unexpected thumbnail host: {cdn_url[:130]}")
                continue
            content = request(cdn_url)
            extension = image_extension(content)
            filename = f"{slug}.{extension}"
            (DEST / filename).write_bytes(content)
            art[slug] = f"/images/games/{filename}"
            updated += 1
            print(f"  Saved {filename}: {len(content):,} bytes / universe {universe_id}", flush=True)
        except Exception as exc:
            print(f"  Failed ({type(exc).__name__}): {exc}", flush=True)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(dict(sorted(art.items())), indent=2) + "\n")
    print(f"Updated {updated}/{len(entries)} official thumbnail assets. Images never use unverified search matches.")
    if updated == 0:
        raise SystemExit("No Roblox thumbnails could be refreshed; check API connectivity and endpoints")


if __name__ == "__main__":
    main()
