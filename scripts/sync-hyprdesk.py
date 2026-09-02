#!/usr/bin/env python3
"""Syncs the site with the latest published HyprDesk release."""

import json
import os
import pathlib
import re
import sys
import urllib.request

REPO = "Besori-Company/HyprDesk"
ROOT = pathlib.Path(__file__).resolve().parent.parent


def read_release():
    url = f"https://api.github.com/repos/{REPO}/releases/latest"
    req = urllib.request.Request(url, headers={
        "Accept": "application/vnd.github+json",
        "User-Agent": "besori-web-sync",
    })
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def rules(tag, version, sizes, html_hyprdesk):
    """Returns {path: [(pattern, replacement, label, flags), ...]}."""
    json_ld = (r'("softwareVersion":\s*")[^"]*(")',
               rf'\g<1>{version}\g<2>', "JSON-LD softwareVersion", 0)

    hyprdesk_rules = [
        (r'(id="hd-version"[^>]*>)[^<]*(</span>)',
         rf'\g<1>Available · {tag}\g<2>', "version badge", 0),
        json_ld,
    ]
    for name, bytes_ in sorted(sizes.items()):
        if f'<span class="hd-descargas__nombre">{name}</span>' not in html_hyprdesk:
            continue
        hyprdesk_rules.append((
            rf'(<span class="hd-descargas__nombre">{re.escape(name)}</span>'
            rf'.*?<span class="hd-descargas__peso">)[^<]*(</span>)',
            rf'\g<1>{round(bytes_ / 1e6)} MB\g<2>', f"size of {name}", re.S))

    return {
        "pages/hyprdesk.html": hyprdesk_rules,
        "pages/catalog.html": [json_ld],
        "index.html": [json_ld],
        "llms.txt": [(r'Available \(v[^)]*\)',
                      f"Available ({tag})", "version in llms.txt", 0)],
    }


def main():
    dry_run = "--dry-run" in sys.argv

    release = read_release()
    tag = release["tag_name"]
    version = tag.lstrip("v")
    sizes = {a["name"]: a["size"] for a in release.get("assets", [])}

    html_hyprdesk = (ROOT / "pages/hyprdesk.html").read_text(encoding="utf-8")

    pending = {}
    for path, rule_list in rules(tag, version, sizes, html_hyprdesk).items():
        file = ROOT / path
        text = original = file.read_text(encoding="utf-8")

        for pattern, replacement, label, flags in rule_list:
            found = len(re.findall(pattern, text, flags))
            if found != 1:
                sys.exit(f"error: '{label}' appears {found} times "
                         f"in {path} (expected exactly 1)")
            text = re.sub(pattern, replacement, text, count=1, flags=flags)

        if text != original:
            pending[file] = text
            print(f"  {path}")

    if not pending:
        print(f"No changes: the site is already on {tag}")
        return

    print(f"Updated to {tag} (see above)")
    if dry_run:
        print("(--dry-run: nothing was written)")
        return

    for file, text in pending.items():
        file.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
