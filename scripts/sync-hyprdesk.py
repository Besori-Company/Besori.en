#!/usr/bin/env python3
"""Sincroniza el sitio con la última release publicada de HyprDesk."""

import json
import os
import pathlib
import re
import sys
import urllib.request

REPO = "Besori-Company/HyprDesk"
RAIZ = pathlib.Path(__file__).resolve().parent.parent


def leer_release():
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


def reglas(tag, version, pesos, html_hyprdesk):
    """Devuelve {ruta: [(patrón, reemplazo, etiqueta, flags), ...]}."""
    json_ld = (r'("softwareVersion":\s*")[^"]*(")',
               rf'\g<1>{version}\g<2>', "softwareVersion del JSON-LD", 0)

    reglas_hyprdesk = [
        (r'(id="hd-version"[^>]*>)[^<]*(</span>)',
         rf'\g<1>Available · {tag}\g<2>', "versión del badge", 0),
        json_ld,
    ]
    for nombre, bytes_ in sorted(pesos.items()):
        if f'<span class="hd-descargas__nombre">{nombre}</span>' not in html_hyprdesk:
            continue
        reglas_hyprdesk.append((
            rf'(<span class="hd-descargas__nombre">{re.escape(nombre)}</span>'
            rf'.*?<span class="hd-descargas__peso">)[^<]*(</span>)',
            rf'\g<1>{round(bytes_ / 1e6)} MB\g<2>', f"peso de {nombre}", re.S))

    return {
        "pages/hyprdesk.html": reglas_hyprdesk,
        "pages/catalog.html": [json_ld],
        "index.html": [json_ld],
        "llms.txt": [(r'Available \(v[^)]*\)',
                      f"Available ({tag})", "versión en llms.txt", 0)],
    }


def main():
    dry_run = "--dry-run" in sys.argv

    release = leer_release()
    tag = release["tag_name"]
    version = tag.lstrip("v")
    pesos = {a["name"]: a["size"] for a in release.get("assets", [])}

    html_hyprdesk = (RAIZ / "pages/hyprdesk.html").read_text(encoding="utf-8")

    pendientes = {}
    for ruta, lista in reglas(tag, version, pesos, html_hyprdesk).items():
        archivo = RAIZ / ruta
        texto = original = archivo.read_text(encoding="utf-8")

        for patron, reemplazo, etiqueta, flags in lista:
            encontrados = len(re.findall(patron, texto, flags))
            if encontrados != 1:
                sys.exit(f"error: «{etiqueta}» aparece {encontrados} veces "
                         f"en {ruta} (se esperaba exactamente 1)")
            texto = re.sub(patron, reemplazo, texto, count=1, flags=flags)

        if texto != original:
            pendientes[archivo] = texto
            print(f"  {ruta}")

    if not pendientes:
        print(f"Sin cambios: el sitio ya está en {tag}")
        return

    print(f"Actualizado a {tag} (ver arriba)")
    if dry_run:
        print("(--dry-run: no se ha escrito nada)")
        return

    for archivo, texto in pendientes.items():
        archivo.write_text(texto, encoding="utf-8")


if __name__ == "__main__":
    main()
