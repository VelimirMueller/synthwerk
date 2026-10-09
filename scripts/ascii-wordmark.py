#!/usr/bin/env python3
"""Print a block wordmark for a README (```text block).

Usage:  python3 scripts/ascii-wordmark.py SYNTHWERK.
        python3 scripts/ascii-wordmark.py VISION.

Glyphs are 5 rows high and use only U+2588 FULL BLOCK and spaces. That glyph
has the same advance as "A" in the GitHub code fonts (SF Mono, Menlo,
Consolas, Liberation Mono, DejaVu Sans Mono). Output must stay at 80 columns
or less, so GitHub does not wrap or scroll it on desktop.
Supported: A-Z, ".", "-", " ".
"""
import sys

B = "█"
GLYPHS = {
    "A": [" ####", "##  ##", "######", "##  ##", "##  ##"],
    "B": ["#####", "##  ##", "#####", "##  ##", "#####"],
    "C": [" #####", "##", "##", "##", " #####"],
    "D": ["#####", "##  ##", "##  ##", "##  ##", "#####"],
    "E": ["######", "##", "#####", "##", "######"],
    "F": ["######", "##", "#####", "##", "##"],
    "G": [" #####", "##", "## ###", "##  ##", " #####"],
    "H": ["##  ##", "##  ##", "######", "##  ##", "##  ##"],
    "I": ["######", "  ##", "  ##", "  ##", "######"],
    "J": ["    ##", "    ##", "    ##", "##  ##", " ####"],
    "K": ["##  ##", "## ##", "####", "## ##", "##  ##"],
    "L": ["##", "##", "##", "##", "######"],
    "M": ["##   ##", "### ###", "#######", "## # ##", "##   ##"],
    "N": ["##  ##", "### ##", "######", "## ###", "##  ##"],
    "O": [" ####", "##  ##", "##  ##", "##  ##", " ####"],
    "P": ["#####", "##  ##", "#####", "##", "##"],
    "Q": [" ####", "##  ##", "##  ##", "## ##", " ## ##"],
    "R": ["#####", "##  ##", "#####", "## ##", "##  ##"],
    "S": [" #####", "##", " ####", "    ##", "#####"],
    "T": ["######", "  ##", "  ##", "  ##", "  ##"],
    "U": ["##  ##", "##  ##", "##  ##", "##  ##", " ####"],
    "V": ["##  ##", "##  ##", "##  ##", " ####", "  ##"],
    "W": ["##   ##", "##   ##", "## # ##", "#######", " ## ##"],
    "X": ["##  ##", " ####", "  ##", " ####", "##  ##"],
    "Y": ["##  ##", "##  ##", " ####", "  ##", "  ##"],
    "Z": ["######", "   ##", "  ##", " ##", "######"],
    "-": ["", "", "#####", "", ""],
    ".": ["", "", "", "", "##"],
    " ": ["", "", "", "", ""],
}
WIDTH = {"M": 7, "W": 7, ".": 2, "-": 5, " ": 2}


def render(word):
    rows = []
    for r in range(5):
        cells = []
        for ch in word.upper():
            if ch not in GLYPHS:
                raise SystemExit(f"unsupported character: {ch!r}")
            cells.append(GLYPHS[ch][r].ljust(WIDTH.get(ch, 6)))
        rows.append("  ".join(cells).rstrip().replace("#", B))
    return rows


if __name__ == "__main__":
    word = " ".join(sys.argv[1:]) or "SYNTHWERK."
    rows = render(word)
    width = max(len(r) for r in rows)
    print("\n".join(rows))
    if width > 80:
        sys.exit(f"too wide: {width} columns (limit 80)")
