#!/usr/bin/env python3
"""
Procedural SVG asset generator for Pushp Narayan Stone Supplier.

AI image generation is unavailable on this account (insufficient provider
credits), so the entire image system is generated locally as SVG plates:

  1. STONE TEXTURES  — turbulence/vein/speckle filters tuned per variety
                       (marble veining, granite speckle, limestone mottling,
                       sandstone striations, cobble grids).
  2. ARCHITECTURAL PLATES — abstract interior/exterior/yard compositions built
                       from perspective planes, monoliths and light shafts,
                       filled with the same stone textures.
  3. LINE DIAGRAMS    — technical line-art for processing/service imagery.

Every asset is deterministic (fixed seeds), tiny (< 40 KB), resolution
independent, and clearly illustrative — never presented as company inventory.

Usage:  python3 scripts/generate_assets.py
Output: public/images/**.svg   (+ public/images/README.md inventory)
"""

from __future__ import annotations

import math
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"

# ---------------------------------------------------------------------------
# Design tokens (must match src/styles/index.css @theme)
# ---------------------------------------------------------------------------

OBSIDIAN = "#242321"
IVORY = "#F5F0E8"
CHAMPAGNE = "#D8C6A5"
TAUPE = "#A99A88"
BRONZE = "#9A6B43"

# ---------------------------------------------------------------------------
# Stone palettes: (base, light, dark, vein) — sampled to match real varieties
# ---------------------------------------------------------------------------

PALETTES: dict[str, tuple[str, str, str, str]] = {
    # Kota limestone
    "kota-blue": ("#7C8A8C", "#93A0A1", "#5F6C6E", "#4E5A5C"),
    "kota-green": ("#7C8B76", "#94A38C", "#5F6E5A", "#4F5C4C"),
    "kota-brown": ("#8A7358", "#A08A6D", "#6B583F", "#57472F"),
    "honey-yellow": ("#C6A266", "#DCBE86", "#A6834B", "#8A6A38"),
    "charcoal-grey": ("#4C4B48", "#63625E", "#35342F", "#26251F"),
    # Indian marble
    "makrana-white": ("#EFEDE7", "#FFFFFF", "#D6D2C8", "#A9A399"),
    "dungri": ("#E9E3D7", "#F8F5EE", "#D2CABA", "#B0A48F"),
    "albeta": ("#F2EEE7", "#FFFFFF", "#DCD7CD", "#BAB2A5"),
    "morwad-white": ("#F4F2EC", "#FFFFFF", "#DFDCD4", "#B7B2A8"),
    "rajnagar-white": ("#EEEAE2", "#FBF9F4", "#D8D3C9", "#ADA69A"),
    "katni-beige": ("#DED3C0", "#EFE7D9", "#C4B69E", "#A2917A"),
    "wonder-marble": ("#E9E4DA", "#F7F4EE", "#CEC7BA", "#9C9384"),
    "banswara-purple": ("#E9E3E6", "#F8F5F7", "#CFC6CE", "#8C7192"),
    # Granite
    "rajasthan-black": ("#232220", "#3A3937", "#141312", "#7C7772"),
    "lakha-red": ("#8C3A2C", "#A8503F", "#6B2A1F", "#C47C63"),
    "chima-pink": ("#C99A92", "#DEB6AE", "#A87A73", "#E7CEC7"),
    "jhansi-red": ("#9C4433", "#B65A46", "#7A3226", "#CE8873"),
    "tiger-skin": ("#A8763F", "#C69356", "#7E562C", "#5A3D1F"),
    "rosy-pink": ("#C89A96", "#DEB8B3", "#A87A77", "#E8CFCB"),
    "south-black": ("#1F1E1D", "#343331", "#111110", "#6E6A66"),
    # Parking & outdoor
    "kota-parking-tiles": ("#7E8380", "#969B97", "#616663", "#4E5350"),
    "black-basalt": ("#2E2C2A", "#45423F", "#1C1B1A", "#5E5A55"),
    "red-mandana": ("#A5573C", "#BE7052", "#84422B", "#C98A6A"),
    "chequered-grooved": ("#7A7F7C", "#929793", "#5D625F", "#4A4F4C"),
    "cobbles": ("#8B7F6E", "#A79A87", "#6B6154", "#574E43"),
    # Sandstone & cladding
    "dholpur-beige": ("#D9C7A8", "#EADCC3", "#BFAA87", "#A8916D"),
    "jodhpur-pink": ("#D3A99A", "#E4C2B5", "#B78B7D", "#9E7263"),
    "teakwood-sandstone": ("#B98A5E", "#D0A67A", "#9A6E45", "#7C5533"),
    "rainbow-sandstone": ("#C08A5E", "#DCB187", "#9E6B45", "#7E5133"),
    "rock-face-strips": ("#B99C77", "#D2B895", "#9A7E5C", "#7E6446"),
}


def _rgb_to_hsl(hex_color: str) -> tuple[float, float, float]:
    value = hex_color.lstrip("#")
    r, g, b = (int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))
    mx, mn = max(r, g, b), min(r, g, b)
    l = (mx + mn) / 2
    if mx == mn:
        return 0.0, 0.0, l
    d = mx - mn
    s = d / (2 - mx - mn) if l > 0.5 else d / (mx + mn)
    if mx == r:
        h = ((g - b) / d + (6 if g < b else 0)) / 6
    elif mx == g:
        h = ((b - r) / d + 2) / 6
    else:
        h = ((r - g) / d + 4) / 6
    return h, s, l


def _hsl_to_rgb(h: float, s: float, l: float) -> str:
    if s == 0:
        v = int(round(l * 255))
        return f"#{v:02x}{v:02x}{v:02x}"

    def hue(p: float, q: float, t: float) -> float:
        t %= 1
        if t < 1 / 6:
            return p + (q - p) * 6 * t
        if t < 1 / 2:
            return q
        if t < 2 / 3:
            return p + (q - p) * (2 / 3 - t) * 6
        return p

    q = l * (1 + s) if l < 0.5 else l + s - l * s
    p = 2 * l - q
    r = hue(p, q, h + 1 / 3)
    g = hue(p, q, h)
    b = hue(p, q, h - 1 / 3)
    return f"#{int(round(r * 255)):02x}{int(round(g * 255)):02x}{int(round(b * 255)):02x}"


def jitter(hex_color: str, amount: float, rng: random.Random) -> str:
    """Vary a stone colour in LIGHTNESS only.

    Hue is held constant so tiled units stay in the same stone family —
    per-channel noise turns near-neutral stones green/pink.
    """
    h, s, l = _rgb_to_hsl(hex_color)
    delta = amount * rng.uniform(-1, 1)
    l = max(0.05, min(0.95, l + delta))
    s = max(0.0, min(1.0, s * rng.uniform(0.92, 1.08)))
    return _hsl_to_rgb(h, s, l)


# ---------------------------------------------------------------------------
# Filter library
# ---------------------------------------------------------------------------


def filter_mottle(fid: str, freq: float, octaves: int, seed: int) -> str:
    """Soft tonal mottling (limestone / general stone body).

    Output is self-contained grey noise with its own alpha, so it reads on any
    renderer — no reliance on CSS blend modes.
    """
    return f"""
    <filter id="{fid}" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="{octaves}" seed="{seed}" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.48  0 0 0 0 0.45  1.4 0 0 0 -0.35"/>
    </filter>"""


def filter_mottle_tinted(fid: str, freq: float, octaves: int, seed: int, hex_color: str, gain: float = 1.5) -> str:
    """Noise tinted to a specific stone colour — reads on any renderer."""
    r = int(hex_color.lstrip("#")[0:2], 16) / 255
    g = int(hex_color.lstrip("#")[2:4], 16) / 255
    b = int(hex_color.lstrip("#")[4:6], 16) / 255
    return f"""
    <filter id="{fid}" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="{octaves}" seed="{seed}" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 {r:.3f}  0 0 0 0 {g:.3f}  0 0 0 0 {b:.3f}  {gain} 0 0 0 -0.55"/>
    </filter>"""


def filter_displace(fid: str, freq: float, scale: int, seed: int) -> str:
    """Warp whatever is drawn through it — the engine behind marble veining."""
    return f"""
    <filter id="{fid}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="4" seed="{seed}" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="{scale}"
        xChannelSelector="R" yChannelSelector="G"/>
    </filter>"""


def filter_speckle(fid: str, freq: float, light: str, seed: int, gain: float) -> str:
    """Granite-style mineral speckle: bright flecks on a transparent field."""
    lr = int(light.lstrip("#")[0:2], 16) / 255
    lg = int(light.lstrip("#")[2:4], 16) / 255
    lb = int(light.lstrip("#")[4:6], 16) / 255
    return f"""
    <filter id="{fid}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="turbulence" baseFrequency="{freq}" numOctaves="2" seed="{seed}" result="t"/>
      <feColorMatrix in="t" type="matrix"
        values="0 0 0 0 {lr:.3f}
                0 0 0 0 {lg:.3f}
                0 0 0 0 {lb:.3f}
                {gain} 0 0 0 -0.42"/>
    </filter>"""


def filter_blur(fid: str, dev: float) -> str:
    return f"""
    <filter id="{fid}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="{dev}"/>
    </filter>"""


# ---------------------------------------------------------------------------
# Texture bodies
# ---------------------------------------------------------------------------


def svg_wrap(w: int, h: int, label: str, body: str, defs: str = "") -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" role="img" aria-label="{label}">\n'
        f"  <title>{label}</title>\n"
        f"  <defs>{defs}</defs>\n{body}\n</svg>\n"
    )


def marble_veins(
    w: int, h: int, rng: random.Random, vein: str, count: int, seed: int, width: float = 2.4
) -> str:
    """Displaced bezier strokes = natural marble veining."""
    paths = []
    for i in range(count):
        x = rng.uniform(-0.1, 1.1) * w
        y = rng.uniform(-0.1, 1.1) * h
        d = [f"M {x:.0f} {y:.0f}"]
        for _ in range(rng.randint(3, 5)):
            cx1 = x + rng.uniform(-0.45, 0.45) * w
            cy1 = y + rng.uniform(-0.45, 0.45) * h
            x += rng.uniform(-0.4, 0.4) * w
            y += rng.uniform(-0.4, 0.4) * h
            d.append(f"C {cx1:.0f} {cy1:.0f} {cx1:.0f} {cy1:.0f} {x:.0f} {y:.0f}")
        opacity = rng.uniform(0.18, 0.5)
        sw = width * rng.uniform(0.5, 1.9)
        paths.append(
            f'<path d="{" ".join(d)}" fill="none" stroke="{vein}" '
            f'stroke-width="{sw:.2f}" stroke-opacity="{opacity:.2f}" '
            f'stroke-linecap="round"/>'
        )
    return (
        f'<g filter="url(#veinwarp)">{"".join(paths)}</g>'
    )


def sandstone_bands(
    w: int, h: int, rng: random.Random, base: str, dark: str, light: str,
    angle: float, count: int,
) -> str:
    """Linear sedimentary banding (teakwood / rainbow sandstone)."""
    bands = []
    step = h / count
    for i in range(count):
        y = i * step + rng.uniform(-step * 0.3, step * 0.3)
        thickness = step * rng.uniform(0.35, 1.1)
        color = rng.choice([base, dark, light])
        opacity = rng.uniform(0.25, 0.7)
        bands.append(
            f'<rect x="-{w}" y="{y:.1f}" width="{w * 3}" height="{thickness:.1f}" '
            f'fill="{color}" opacity="{opacity:.2f}"/>'
        )
    return f'<g transform="rotate({angle} {w/2} {h/2})">{"".join(bands)}</g>'


def tile_grid(
    w: int, h: int, rng: random.Random, base: str, dark: str,
    cols: int, rows: int, gap: float, rounded: bool = False,
) -> str:
    """Cobble / chequered / parking tile layout with per-unit variation."""
    cw, ch = w / cols, h / rows
    cells = []
    for r in range(rows):
        for c in range(cols):
            x, y = c * cw, r * ch
            color = jitter(base, 0.05, rng)
            rx = f' rx="{min(cw, ch) * 0.12:.1f}"' if rounded else ""
            cells.append(
                f'<rect x="{x + gap / 2:.1f}" y="{y + gap / 2:.1f}" '
                f'width="{cw - gap:.1f}" height="{ch - gap:.1f}"{rx} fill="{color}"/>'
            )
            # subtle per-tile highlight
            cells.append(
                f'<rect x="{x + gap / 2:.1f}" y="{y + gap / 2:.1f}" '
                f'width="{cw - gap:.1f}" height="{(ch - gap) * 0.28:.1f}"{rx} '
                f'fill="{lighten(color, 0.12)}" opacity="0.32"/>'
            )
            _ = dark
    return "".join(cells)


def lighten(color: str, amount: float) -> str:
    value = color.lstrip("#")
    r, g, b = (int(value[i : i + 2], 16) for i in (0, 2, 4))
    r = min(255, int(r + (255 - r) * amount))
    g = min(255, int(g + (255 - g) * amount))
    b = min(255, int(b + (255 - b) * amount))
    return f"#{r:02x}{g:02x}{b:02x}"


def texture_body(style: str, key: str, w: int, h: int, seed: int) -> tuple[str, str]:
    """Returns (defs, body) for a full-bleed stone texture.

    All layers use self-contained alpha (no CSS blend modes) so the plates
    render identically in browsers, image viewers and design tools.
    """
    rng = random.Random(seed)
    base, light, dark, vein = PALETTES[key]
    defs = ""
    body = f'<rect width="{w}" height="{h}" fill="{base}"/>'

    # --- universal tonal mottling: dark cloud + light cloud ---------------
    grid_style = style in ("tiles", "cobbles", "grooved")
    defs += filter_mottle_tinted("mott-dark", 0.006, 4, seed + 4, dark, gain=1.7)
    defs += filter_mottle_tinted("mott-light", 0.009, 4, seed + 5, light, gain=1.5)
    body += f'<rect width="{w}" height="{h}" filter="url(#mott-dark)" opacity="{0.28 if grid_style else 0.55}"/>'
    body += f'<rect width="{w}" height="{h}" filter="url(#mott-light)" opacity="{0.2 if grid_style else 0.42}"/>'

    if style == "marble":
        defs += filter_displace("veinwarp", 0.005, 90, seed + 11)
        count = 8 if key not in ("wonder-marble", "banswara-purple") else 14
        body += marble_veins(w, h, rng, vein, count, seed, width=3.4)
        body += marble_veins(w, h, rng, lighten(vein, 0.4), count // 2, seed + 3, width=1.6)
        # broad mineral clouds
        defs += filter_mottle_tinted("cloud", 0.0025, 3, seed + 6, dark, gain=1.3)
        body += f'<rect width="{w}" height="{h}" filter="url(#cloud)" opacity="0.35"/>'

    elif style == "granite":
        defs += filter_speckle("spec-a", 0.75, "#F2EFE9", seed + 5, 2.1)
        defs += filter_speckle("spec-b", 1.4, vein, seed + 9, 1.7)
        body += f'<rect width="{w}" height="{h}" filter="url(#spec-a)" opacity="0.8"/>'
        body += f'<rect width="{w}" height="{h}" filter="url(#spec-b)" opacity="0.6"/>'
        if key == "tiger-skin":
            # irregular mineral blotches — fine, numerous, never clean stripes
            defs += filter_displace("blotchwarp", 0.03, 60, seed + 17)
            blobs = []
            for _ in range(46):
                bx, by = rng.uniform(0, w), rng.uniform(0, h)
                rx, ry = rng.uniform(w * 0.03, w * 0.11), rng.uniform(h * 0.01, h * 0.045)
                color = rng.choice([dark, light, vein, dark])
                blobs.append(
                    f'<ellipse cx="{bx:.0f}" cy="{by:.0f}" rx="{rx:.0f}" ry="{ry:.0f}" '
                    f'fill="{color}" opacity="{rng.uniform(0.28, 0.55):.2f}"/>'
                )
            body += f'<g filter="url(#blotchwarp)">{"".join(blobs)}</g>'
            body += f'<rect width="{w}" height="{h}" filter="url(#spec-a)" opacity="0.5"/>'

    elif style == "limestone":
        defs += filter_speckle("fleck", 1.1, dark, seed + 7, 1.2)
        body += f'<rect width="{w}" height="{h}" filter="url(#fleck)" opacity="0.28"/>'
        # faint bedding movement
        defs += filter_displace("warp", 0.004, 60, seed + 13)
        body += (
            f'<g filter="url(#warp)" opacity="0.3">'
            f'<rect y="{h * 0.42:.0f}" width="{w}" height="{h * 0.16:.0f}" fill="{dark}"/>'
            f'<rect y="{h * 0.68:.0f}" width="{w}" height="{h * 0.09:.0f}" fill="{light}"/>'
            f'<rect y="{h * 0.12:.0f}" width="{w}" height="{h * 0.07:.0f}" fill="{light}"/>'
            f"</g>"
        )

    elif style == "sandstone":
        body += sandstone_bands(w, h, rng, base, dark, light, rng.uniform(-6, 6), 14)
        defs += filter_speckle("grit", 1.6, dark, seed + 8, 1.1)
        body += f'<rect width="{w}" height="{h}" filter="url(#grit)" opacity="0.35"/>'

    elif style == "tiles":
        cols = 4 if w <= 900 else 6
        body += tile_grid(w, h, rng, base, dark, cols, int(cols * h / w), gap=w * 0.012)

    elif style == "cobbles":
        body += tile_grid(w, h, rng, base, dark, 6, int(6 * h / w), gap=w * 0.02, rounded=True)

    elif style == "rough":  # rock-face / split face
        defs += filter_displace("warp", 0.03, 40, seed + 15)
        body = (
            f'<g filter="url(#warp)">'
            f'<rect width="{w}" height="{h}" fill="{dark}"/>'
            f'<rect width="{w}" height="{h * 0.55:.0f}" fill="{base}" opacity="0.9"/>'
            f"</g>"
        )
        body += f'<rect width="{w}" height="{h}" filter="url(#mott-dark)" opacity="0.6"/>'
        # shadowed ledges
        for _ in range(11):
            y = rng.uniform(0, h)
            body += (
                f'<rect y="{y:.0f}" width="{w}" height="{rng.uniform(6, 30):.0f}" '
                f'fill="{dark}" opacity="{rng.uniform(0.12, 0.34):.2f}"/>'
            )
            body += (
                f'<rect y="{y - 3:.0f}" width="{w}" height="3" '
                f'fill="{light}" opacity="{rng.uniform(0.1, 0.25):.2f}"/>'
            )

    elif style == "grooved":  # chequered & grooved stone
        body += tile_grid(w, h, rng, base, dark, 4, int(4 * h / w), gap=w * 0.02)
        for i in range(1, 6):
            body += (
                f'<line x1="0" y1="{h * i / 6:.0f}" x2="{w}" y2="{h * i / 6:.0f}" '
                f'stroke="{dark}" stroke-width="{w * 0.014:.1f}" opacity="0.8"/>'
            )

    elif style == "strips":  # running-bond wall cladding courses
        rows = 7
        ch = h / rows
        joint = w * 0.006
        for row in range(rows):
            cols = 5 if row % 2 == 0 else 4
            cwid = w / cols
            offset = 0.0 if row % 2 == 0 else cwid * 0.5
            for c in range(cols + 1):
                x = -offset + c * cwid
                color = jitter(base, 0.07, rng)
                body += (
                    f'<rect x="{x + joint / 2:.1f}" y="{row * ch + joint / 2:.1f}" '
                    f'width="{cwid - joint:.1f}" height="{ch - joint:.1f}" fill="{color}"/>'
                )
                body += (
                    f'<rect x="{x + joint / 2:.1f}" y="{row * ch + joint / 2:.1f}" '
                    f'width="{cwid - joint:.1f}" height="{ch * 0.22:.1f}" '
                    f'fill="{lighten(color, 0.16)}" opacity="0.55"/>'
                )
                body += (
                    f'<rect x="{x + joint / 2:.1f}" y="{(row + 1) * ch - joint * 2:.1f}" '
                    f'width="{cwid - joint:.1f}" height="{joint * 2:.1f}" '
                    f'fill="{dark}" opacity="0.45"/>'
                )

    # --- universal finishing grain + vignette ----------------------------
    defs += filter_mottle_tinted("grain", 0.09, 2, seed + 21, "#000000", gain=1.1)
    body += f'<rect width="{w}" height="{h}" filter="url(#grain)" opacity="0.16"/>'
    defs += (
        f'<radialGradient id="vig" cx="50%" cy="42%" r="78%">'
        f'<stop offset="55%" stop-color="#000" stop-opacity="0"/>'
        f'<stop offset="100%" stop-color="#000" stop-opacity="0.22"/>'
        f"</radialGradient>"
    )
    body += f'<rect width="{w}" height="{h}" fill="url(#vig)"/>'
    return defs, body


# ---------------------------------------------------------------------------
# Architectural scene plates
# ---------------------------------------------------------------------------


def scene_interior(w: int, h: int, key: str, seed: int, label: str, dark: bool) -> str:
    """Perspective interior: floor plane, window light, monoliths, plinth."""
    rng = random.Random(seed)
    style = "marble" if key in ("makrana-white", "morwad-white", "albeta") else "limestone"
    tdefs, tbody = texture_body(style, key, 900, 600, seed)
    horizon = h * 0.54

    sky = "#171614" if dark else "#E7E0D3"
    wall = "#26241F" if dark else "#EFE9DE"
    joint_op = 0.3 if dark else 0.55
    shaft_op = 0.3 if dark else 0.55

    body = f'<rect width="{w}" height="{h}" fill="{sky}"/>'
    # back wall
    body += f'<rect y="0" width="{w}" height="{horizon:.0f}" fill="{wall}"/>'
    # wall texture wash
    body += f'<rect y="0" width="{w}" height="{horizon:.0f}" fill="url(#stone)" opacity="0.16"/>'

    # tall window openings with light spill
    win_opens = [(0.06, 0.16), (0.74, 0.2)]
    for wx, ww in win_opens:
        x, wid = w * wx, w * ww
        body += (
            f'<rect x="{x:.0f}" y="{h * 0.06:.0f}" width="{wid:.0f}" height="{horizon - h * 0.12:.0f}" '
            f'fill="{IVORY if dark else "#E4DCCD"}" opacity="{0.9 if dark else 0.75}"/>'
            f'<rect x="{x:.0f}" y="{h * 0.06:.0f}" width="{wid:.0f}" height="{horizon - h * 0.12:.0f}" '
            f'fill="none" stroke="{BRONZE}" stroke-width="3" opacity="0.7"/>'
        )
        # mullions
        for m in (0.33, 0.66):
            body += (
                f'<line x1="{x + wid * m:.0f}" y1="{h * 0.06:.0f}" x2="{x + wid * m:.0f}" '
                f'y2="{horizon - h * 0.12:.0f}" stroke="{OBSIDIAN}" stroke-opacity="0.35" stroke-width="3"/>'
            )

    # ceiling shadow band — warm, never a flat grey bar
    body += (
        f'<rect y="0" width="{w}" height="{h * 0.07:.0f}" fill="{OBSIDIAN}" '
        f'opacity="{0.5 if dark else 0.28}"/>'
    )

    # floor plane in perspective
    body += (
        f'<polygon points="0,{horizon:.0f} {w},{horizon:.0f} {w},{h} 0,{h}" fill="url(#floor)"/>'
    )
    # floor joints converging to a vanishing point
    vp = w * 0.5
    joints = []
    for i in range(-10, 11):
        x = vp + i * w * 0.14
        joints.append(f'<line x1="{vp}" y1="{horizon:.0f}" x2="{x:.0f}" y2="{h}"/>')
    for i in range(1, 8):
        t = i / 8
        y = horizon + (h - horizon) * (t ** 1.9)
        joints.append(f'<line x1="0" y1="{y:.0f}" x2="{w}" y2="{y:.0f}"/>')
    body += (
        f'<g stroke="{OBSIDIAN}" stroke-opacity="{joint_op}" stroke-width="1.6" fill="none">'
        f'{"".join(joints)}</g>'
    )
    # floor stone texture
    body += (
        f'<polygon points="0,{horizon:.0f} {w},{horizon:.0f} {w},{h} 0,{h}" '
        f'fill="url(#stone)" opacity="0.35"/>'
    )

    # monolith slabs with bronze reveal
    for i in range(3):
        sw_ = w * rng.uniform(0.1, 0.15)
        sh_ = horizon * rng.uniform(0.6, 0.9)
        x = w * (0.12 + i * 0.3) + rng.uniform(-w * 0.02, w * 0.02)
        y = horizon - sh_
        body += (
            f'<g transform="translate({x:.0f} {y:.0f})">'
            f'<rect width="{sw_:.0f}" height="{sh_:.0f}" fill="url(#stone)"/>'
            f'<rect width="{sw_:.0f}" height="{sh_:.0f}" fill="{"#000" if dark else OBSIDIAN}" '
            f'opacity="{0.14 if dark else 0.08}"/>'
            f'<rect x="{sw_ - 4:.0f}" width="4" height="{sh_:.0f}" fill="{BRONZE}"/>'
            f'<rect y="{sh_ - 4:.0f}" width="{sw_:.0f}" height="4" fill="{BRONZE}" opacity="0.6"/>'
            f"</g>"
        )
        # cast shadow anchoring the slab to the floor
        body += (
            f'<polygon points="{x:.0f},{horizon:.0f} {x + sw_:.0f},{horizon:.0f} '
            f'{x + sw_ * 1.3:.0f},{horizon + (h - horizon) * 0.34:.0f} '
            f'{x - sw_ * 0.3:.0f},{horizon + (h - horizon) * 0.34:.0f}" '
            f'fill="{"#000" if dark else "#6E6353"}" opacity="0.26"/>'
        )
        # polished reflection of the slab
        body += (
            f'<polygon points="{x + sw_ * 0.1:.0f},{horizon + (h - horizon) * 0.34:.0f} '
            f'{x + sw_ * 0.9:.0f},{horizon + (h - horizon) * 0.34:.0f} '
            f'{x + sw_ * 1.0:.0f},{horizon + (h - horizon) * 0.62:.0f} '
            f'{x:.0f},{horizon + (h - horizon) * 0.62:.0f}" '
            f'fill="{"#000" if dark else "#CFC4B2"}" opacity="0.22"/>'
        )

    # low plinth / bench in the foreground
    body += (
        f'<rect x="{w * 0.36:.0f}" y="{h * 0.66:.0f}" width="{w * 0.26:.0f}" '
        f'height="{h * 0.1:.0f}" fill="url(#stone)" stroke="{BRONZE}" stroke-width="2"/>'
    )

    # light shaft
    body += (
        f'<polygon points="{w * 0.06:.0f},0 {w * 0.3:.0f},0 {w * 0.56:.0f},{h} {w * 0.24:.0f},{h}" '
        f'fill="{CHAMPAGNE}" opacity="{shaft_op}" filter="url(#haze)"/>'
    )
    body += (
        f'<polygon points="{w * 0.74:.0f},0 {w * 0.94:.0f},0 {w * 0.98:.0f},{h} {w * 0.72:.0f},{h}" '
        f'fill="{CHAMPAGNE}" opacity="{shaft_op * 0.8:.2f}" filter="url(#haze)"/>'
    )

    # vignette
    body += f'<rect width="{w}" height="{h}" fill="url(#vigI)"/>'

    defs = tdefs + filter_blur("haze", 52) + f"""
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{TAUPE if dark else "#C6B9A4"}"/>
      <stop offset="100%" stop-color="{OBSIDIAN if dark else "#9C907B"}"/>
    </linearGradient>
    <radialGradient id="vigI" cx="50%" cy="45%" r="80%">
      <stop offset="45%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="{0.5 if dark else 0.36}"/>
    </radialGradient>
    <pattern id="stone" width="900" height="600" patternUnits="userSpaceOnUse">{tbody}</pattern>"""
    return svg_wrap(w, h, label, body, defs)


def scene_exterior(w: int, h: int, key: str, seed: int, label: str, facade: bool) -> str:
    """Facade strips or paving grid under an open sky."""
    rng = random.Random(seed)
    style = "strips" if facade else "tiles"
    tdefs, tbody = texture_body(style, key, 900, 600, seed)
    sky_h = h * (0.46 if facade else 0.3)

    body = (
        f'<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0%" stop-color="#E9E1D4"/>'
        f'<stop offset="100%" stop-color="#D6C9B4"/></linearGradient>'
        f'<pattern id="stone" width="900" height="600" patternUnits="userSpaceOnUse">{tbody}</pattern>'
        + filter_blur("haze", 40)
        + "</defs>"
        + tdefs
    )
    # full-bleed ground first — nothing may fall through to transparency
    body += f'<rect width="{w}" height="{h}" fill="#C9BCA6"/>'
    body += f'<rect width="{w}" height="{sky_h:.0f}" fill="url(#sky)"/>'

    if facade:
        # building mass
        bx, by = w * 0.08, h * 0.12
        bw, bh = w * 0.72, h * 0.78
        body += (
            f'<rect x="{bx:.0f}" y="{by:.0f}" width="{bw:.0f}" height="{bh:.0f}" '
            f'fill="url(#stone)"/>'
        )
        # window reveals
        for row in range(3):
            for col in range(4):
                wx = bx + bw * (0.08 + col * 0.23)
                wy = by + bh * (0.1 + row * 0.29)
                body += (
                    f'<rect x="{wx:.0f}" y="{wy:.0f}" width="{bw * 0.15:.0f}" '
                    f'height="{bh * 0.17:.0f}" fill="{OBSIDIAN}" opacity="0.82"/>'
                    f'<rect x="{wx:.0f}" y="{wy:.0f}" width="{bw * 0.15:.0f}" '
                    f'height="3" fill="{CHAMPAGNE}" opacity="0.5"/>'
                )
        # strip shadow rhythm
        for i in range(14):
            x = bx + bw * i / 14
            body += (
                f'<line x1="{x:.0f}" y1="{by:.0f}" x2="{x:.0f}" y2="{by + bh:.0f}" '
                f'stroke="{OBSIDIAN}" stroke-opacity="0.16" stroke-width="2"/>'
            )
        # ground
        body += (
            f'<rect y="{h * 0.9:.0f}" width="{w}" height="{h * 0.1:.0f}" fill="{TAUPE}" opacity="0.5"/>'
        )
    else:
        # paving plane receding to the horizon
        body += (
            f'<rect y="{sky_h:.0f}" width="{w}" height="{h - sky_h:.0f}" fill="url(#stone)"/>'
        )
        for i in range(1, 6):
            t = i / 6
            y = sky_h + (h - sky_h) * (t ** 1.7)
            body += (
                f'<line x1="0" y1="{y:.0f}" x2="{w}" y2="{y:.0f}" '
                f'stroke="{OBSIDIAN}" stroke-opacity="0.2" stroke-width="2"/>'
            )
        for i in range(-6, 7):
            x = w * 0.5 + i * w * 0.14
            body += (
                f'<line x1="{w * 0.5}" y1="{sky_h:.0f}" x2="{x:.0f}" y2="{h}" '
                f'stroke="{OBSIDIAN}" stroke-opacity="0.14" stroke-width="2"/>'
            )
        # planter / kerb
        body += (
            f'<rect x="{w * 0.62:.0f}" y="{sky_h - h * 0.07:.0f}" width="{w * 0.3:.0f}" '
            f'height="{h * 0.07:.0f}" fill="{OBSIDIAN}" opacity="0.85"/>'
        )

    body += (
        f'<rect width="{w}" height="{h}" fill="{CHAMPAGNE}" opacity="0.07"/>'
        f'<rect width="{w}" height="{h}" fill="url(#vig2)"/>'
    )
    defs_extra = f"""
    <radialGradient id="vig2" cx="50%" cy="45%" r="80%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.2"/>
    </radialGradient>"""
    return svg_wrap(w, h, label, body, defs_extra)


def scene_yard(w: int, h: int, key: str, seed: int, label: str) -> str:
    """Leaning slabs in a stockyard — used for stockyard/processing/gallery."""
    rng = random.Random(seed)
    tdefs, tbody = texture_body("limestone", key, 700, 500, seed)
    horizon = h * 0.66

    body = (
        f'<defs>'
        f'<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0%" stop-color="#EFE8DC"/><stop offset="100%" stop-color="#DCD1BE"/>'
        f"</linearGradient>"
        f'<pattern id="stone" width="700" height="500" patternUnits="userSpaceOnUse">{tbody}</pattern>'
        + filter_blur("haze", 34)
        + "</defs>"
        + tdefs
    )
    body += f'<rect width="{w}" height="{horizon:.0f}" fill="url(#sky)"/>'
    body += f'<rect y="{horizon:.0f}" width="{w}" height="{h - horizon:.0f}" fill="{TAUPE}" opacity="0.55"/>'
    body += (
        f'<line x1="0" y1="{horizon:.0f}" x2="{w}" y2="{horizon:.0f}" '
        f'stroke="{OBSIDIAN}" stroke-opacity="0.25" stroke-width="2"/>'
    )

    # rows of leaning slabs
    for i in range(7):
        sw_ = w * rng.uniform(0.08, 0.13)
        sh_ = horizon * rng.uniform(0.5, 0.78)
        x = w * 0.04 + i * (w * 0.135)
        lean = rng.uniform(-7, -3)
        body += (
            f'<g transform="translate({x:.0f} {horizon:.0f}) rotate({lean:.1f})">'
            f'<rect x="0" y="{-sh_:.0f}" width="{sw_:.0f}" height="{sh_:.0f}" fill="url(#stone)"/>'
            f'<rect x="{sw_ - 4:.0f}" y="{-sh_:.0f}" width="4" height="{sh_:.0f}" '
            f'fill="{BRONZE}" opacity="0.55"/>'
            f'<rect x="0" y="{-sh_:.0f}" width="{sw_:.0f}" height="{sh_:.0f}" '
            f'fill="{OBSIDIAN}" opacity="0.07"/>'
            f"</g>"
        )

    # light wash
    body += (
        f'<polygon points="{w * 0.2:.0f},0 {w * 0.55:.0f},0 {w * 0.4:.0f},{h} {w * 0.05:.0f},{h}" '
        f'fill="{CHAMPAGNE}" opacity="0.2" filter="url(#haze)"/>'
    )
    body += f'<rect width="{w}" height="{h}" fill="url(#vig3)"/>'
    defs_extra = """
    <radialGradient id="vig3" cx="50%" cy="45%" r="80%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.18"/>
    </radialGradient>"""
    return svg_wrap(w, h, label, body, defs_extra)


def scene_lineart(w: int, h: int, kind: str, label: str) -> str:
    """Technical line-art plate for processing / service imagery."""
    stroke = BRONZE
    ink = OBSIDIAN
    body = f'<rect width="{w}" height="{h}" fill="{IVORY}"/>'
    # architectural grid
    grid = []
    for i in range(1, 10):
        grid.append(f'<line x1="0" y1="{h * i / 10:.0f}" x2="{w}" y2="{h * i / 10:.0f}"/>')
        grid.append(f'<line x1="{w * i / 10:.0f}" y1="0" x2="{w * i / 10:.0f}" y2="{h}"/>')
    body += (
        f'<g stroke="{CHAMPAGNE}" stroke-width="1" opacity="0.55">{"".join(grid)}</g>'
    )

    cx, cy = w / 2, h / 2
    g = f'<g fill="none" stroke="{ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'

    if kind == "saw":  # circular blade cutting into a stone block
        r = min(w, h) * 0.24
        cx_b = w * 0.42
        teeth = []
        for i in range(28):
            a = i * math.tau / 28
            x1, y1 = cx_b + math.cos(a) * r, cy + math.sin(a) * r
            x2, y2 = cx_b + math.cos(a) * (r * 1.11), cy + math.sin(a) * (r * 1.11)
            teeth.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}"/>')
        # stone block the blade is cutting into
        bx, bw_ = cx_b + r * 0.98, w * 0.34
        by, bh_ = cy - r * 0.78, r * 1.56
        body += (
            f'{g}<rect x="{bx:.1f}" y="{by:.1f}" width="{bw_:.1f}" height="{bh_:.1f}" '
            f'fill="{CHAMPAGNE}" fill-opacity="0.5" stroke="none"/>'
            f'<rect x="{bx:.1f}" y="{by:.1f}" width="{bw_:.1f}" height="{bh_:.1f}"/>'
            f'<line x1="{bx:.1f}" y1="{cy:.1f}" x2="{bx + bw_:.1f}" y2="{cy:.1f}" '
            f'stroke="{BRONZE}" stroke-dasharray="10 7"/>'
            # blade + arbor
            f'<circle cx="{cx_b:.1f}" cy="{cy:.1f}" r="{r:.1f}"/>'
            f'<circle cx="{cx_b:.1f}" cy="{cy:.1f}" r="{r * 0.2:.1f}"/>'
            f'<g stroke-width="4.5">{"".join(teeth)}</g>'
            # machine arm
            f'<path d="M {cx_b:.1f} {cy - r * 1.25:.1f} L {cx_b:.1f} {cy - r * 1.05:.1f} '
            f'M {cx_b - r * 1.5:.1f} {cy - r * 1.25:.1f} L {cx_b + r * 1.5:.1f} {cy - r * 1.25:.1f}" '
            f'stroke="{BRONZE}"/>'
            f'<line x1="{cx_b - r * 1.5:.1f}" y1="{cy - r * 1.25:.1f}" x2="{cx_b - r * 1.5:.1f}" '
            f'y2="{h * 0.84:.1f}" stroke="{stroke}"/>'
            f'<line x1="{cx_b + r * 1.5:.1f}" y1="{cy - r * 1.25:.1f}" x2="{cx_b + r * 1.5:.1f}" '
            f'y2="{h * 0.84:.1f}" stroke="{stroke}"/>'
            f'<line x1="0" y1="{h * 0.84:.1f}" x2="{w}" y2="{h * 0.84:.1f}" stroke="{stroke}"/>'
            f"</g>"
        )
    elif kind == "polish":  # multi-head polishing line
        body += f'{g}<rect x="{w * 0.12:.0f}" y="{h * 0.3:.0f}" width="{w * 0.76:.0f}" height="{h * 0.4:.0f}"/>'
        for i in range(4):
            hx = w * (0.22 + i * 0.19)
            body += (
                f'<circle cx="{hx:.0f}" cy="{h * 0.5:.0f}" r="{w * 0.06:.0f}" stroke="{stroke}"/>'
                f'<line x1="{hx:.0f}" y1="{h * 0.3:.0f}" x2="{hx:.0f}" y2="{h * 0.44:.0f}"/>'
            )
        body += f'<line x1="{w * 0.12:.0f}" y1="{h * 0.78:.0f}" x2="{w * 0.88:.0f}" y2="{h * 0.78:.0f}" stroke="{stroke}"/></g>'
    elif kind == "truck":  # logistics
        body += (
            f'{g}<rect x="{w * 0.1:.0f}" y="{h * 0.38:.0f}" width="{w * 0.5:.0f}" height="{h * 0.26:.0f}"/>'
            f'<path d="M {w * 0.6:.0f} {h * 0.64:.0f} L {w * 0.6:.0f} {h * 0.46:.0f} '
            f'L {w * 0.78:.0f} {h * 0.46:.0f} L {w * 0.88:.0f} {h * 0.56:.0f} '
            f'L {w * 0.88:.0f} {h * 0.64:.0f} Z" stroke="{stroke}"/>'
            f'<circle cx="{w * 0.26:.0f}" cy="{h * 0.68:.0f}" r="{w * 0.05:.0f}"/>'
            f'<circle cx="{w * 0.74:.0f}" cy="{h * 0.68:.0f}" r="{w * 0.05:.0f}"/>'
            f'<line x1="0" y1="{h * 0.78:.0f}" x2="{w}" y2="{h * 0.78:.0f}" stroke="{stroke}"/></g>'
        )
    elif kind == "caliper":  # measurement / grading
        body += (
            f'{g}<rect x="{w * 0.2:.0f}" y="{h * 0.42:.0f}" width="{w * 0.6:.0f}" height="{h * 0.16:.0f}"/>'
            f'<line x1="{w * 0.2:.0f}" y1="{h * 0.34:.0f}" x2="{w * 0.2:.0f}" y2="{h * 0.66:.0f}"/>'
            f'<line x1="{w * 0.8:.0f}" y1="{h * 0.34:.0f}" x2="{w * 0.8:.0f}" y2="{h * 0.66:.0f}"/>'
            f'<line x1="{w * 0.2:.0f}" y1="{h * 0.34:.0f}" x2="{w * 0.8:.0f}" y2="{h * 0.34:.0f}" stroke="{stroke}"/>'
            f'<path d="M {w * 0.3:.0f} {h * 0.72:.0f} l {w * 0.06:.0f} {h * 0.05:.0f} '
            f'l {w * 0.12:.0f} -{h * 0.09:.0f}" stroke="{stroke}"/>'
            f'<path d="M {w * 0.56:.0f} {h * 0.72:.0f} l {w * 0.06:.0f} {h * 0.05:.0f} '
            f'l {w * 0.12:.0f} -{h * 0.09:.0f}" stroke="{stroke}"/></g>'
        )
    elif kind == "layers":  # sorting / grading
        for i in range(4):
            y = h * (0.3 + i * 0.12)
            color = stroke if i % 2 else ink
            body += (
                f'<rect x="{w * (0.18 + i * 0.04):.0f}" y="{y:.0f}" '
                f'width="{w * (0.64 - i * 0.08):.0f}" height="{h * 0.08:.0f}" '
                f'fill="none" stroke="{color}" stroke-width="3"/>'
            )
        body += "</g>"
    else:  # "consult" — document + discussion
        body += (
            f'{g}<rect x="{w * 0.2:.0f}" y="{h * 0.26:.0f}" width="{w * 0.42:.0f}" height="{h * 0.48:.0f}"/>'
            f'<line x1="{w * 0.28:.0f}" y1="{h * 0.38:.0f}" x2="{w * 0.54:.0f}" y2="{h * 0.38:.0f}" stroke="{stroke}"/>'
            f'<line x1="{w * 0.28:.0f}" y1="{h * 0.48:.0f}" x2="{w * 0.54:.0f}" y2="{h * 0.48:.0f}" stroke="{stroke}"/>'
            f'<line x1="{w * 0.28:.0f}" y1="{h * 0.58:.0f}" x2="{w * 0.46:.0f}" y2="{h * 0.58:.0f}" stroke="{stroke}"/>'
            f'<circle cx="{w * 0.72:.0f}" cy="{h * 0.4:.0f}" r="{w * 0.07:.0f}"/>'
            f'<path d="M {w * 0.62:.0f} {h * 0.68:.0f} q {w * 0.1:.0f} -{h * 0.14:.0f} {w * 0.2:.0f} 0"/></g>'
        )

    body += (
        f'<rect x="{w * 0.06:.0f}" y="{h * 0.06:.0f}" width="{w * 0.88:.0f}" height="{h * 0.88:.0f}" '
        f'fill="none" stroke="{CHAMPAGNE}" stroke-width="2"/>'
        f'<text x="{w * 0.08:.0f}" y="{h * 0.13:.0f}" fill="{BRONZE}" '
        f'font-family="Helvetica, Arial, sans-serif" font-size="{h * 0.032:.0f}" '
        f'letter-spacing="6">PUSHP NARAYAN · PROCESS</text>'
    )
    return svg_wrap(w, h, label, body)


# ---------------------------------------------------------------------------
# Asset manifest
# ---------------------------------------------------------------------------

PRODUCTS: list[tuple[str, str]] = [
    # key, style
    ("kota-blue", "limestone"),
    ("kota-green", "limestone"),
    ("kota-brown", "limestone"),
    ("honey-yellow", "limestone"),
    ("charcoal-grey", "limestone"),
    ("makrana-white", "marble"),
    ("dungri", "marble"),
    ("albeta", "marble"),
    ("morwad-white", "marble"),
    ("rajnagar-white", "marble"),
    ("katni-beige", "marble"),
    ("wonder-marble", "marble"),
    ("banswara-purple", "marble"),
    ("rajasthan-black", "granite"),
    ("lakha-red", "granite"),
    ("chima-pink", "granite"),
    ("jhansi-red", "granite"),
    ("tiger-skin", "granite"),
    ("rosy-pink", "granite"),
    ("south-black", "granite"),
    ("kota-parking-tiles", "tiles"),
    ("black-basalt", "rough"),
    ("red-mandana", "tiles"),
    ("chequered-grooved", "grooved"),
    ("cobbles", "cobbles"),
    ("dholpur-beige", "sandstone"),
    ("jodhpur-pink", "sandstone"),
    ("teakwood-sandstone", "sandstone"),
    ("rainbow-sandstone", "sandstone"),
    ("rock-face-strips", "rough"),
]

# scene plates: path, kind, key, size
SCENES: list[tuple[str, str, str, int, int]] = [
    ("hero/hero-main", "interior", "makrana-white", 1920, 1200),
    ("hero/cta-plate", "yard", "kota-blue", 1920, 1200),
    ("categories/kota-stone", "tiles-scene", "kota-blue", 1600, 1000),
    ("categories/indian-marble", "interior", "morwad-white", 1600, 1000),
    ("categories/granite", "yard", "rajasthan-black", 1600, 1000),
    ("categories/parking-outdoor", "paving", "kota-parking-tiles", 1600, 1000),
    ("categories/sandstone-cladding", "facade", "teakwood-sandstone", 1600, 1000),
    ("applications/flooring", "interior", "kota-blue", 1600, 1000),
    ("applications/marble-interior", "interior", "makrana-white", 1200, 1500),
    ("applications/elevation", "facade", "jodhpur-pink", 1600, 1000),
    ("applications/parking", "paving", "black-basalt", 1600, 1000),
    ("applications/driveway", "paving", "cobbles", 1600, 1000),
    ("applications/staircase", "interior", "rajasthan-black", 1200, 1500),
    ("processing/stockyard", "yard", "kota-brown", 1600, 1000),
    ("processing/sorting", "yard", "honey-yellow", 1600, 1000),
    ("processing/loading", "yard", "charcoal-grey", 1600, 1000),
    ("processing/inspection", "yard", "kota-green", 1600, 1000),
    ("processing/consultation", "lineart-consult", "makrana-white", 1600, 1000),
    ("processing/cutting", "lineart-saw", "kota-blue", 1200, 1500),
    ("processing/polishing", "lineart-polish", "makrana-white", 1600, 1000),
]


def build_scene(kind: str, key: str, w: int, h: int, seed: int, label: str) -> str:
    if kind == "interior":
        dark = key in ("rajasthan-black", "south-black", "charcoal-grey")
        return scene_interior(w, h, key, seed, label, dark=dark)
    if kind == "facade":
        return scene_exterior(w, h, key, seed, label, facade=True)
    if kind == "paving":
        return scene_exterior(w, h, key, seed, label, facade=False)
    if kind == "tiles-scene":
        return scene_exterior(w, h, key, seed, label, facade=False)
    if kind == "yard":
        return scene_yard(w, h, key, seed, label)
    if kind.startswith("lineart-"):
        return scene_lineart(w, h, kind.split("-", 1)[1], label)
    return scene_yard(w, h, key, seed, label)


def main() -> None:
    written = 0

    # 1 — product swatches (4:5)
    for i, (key, style) in enumerate(PRODUCTS):
        target = OUT / "products" / f"{key}.svg"
        target.parent.mkdir(parents=True, exist_ok=True)
        defs, body = texture_body(style, key, 800, 1000, seed=1000 + i * 7)
        target.write_text(
            svg_wrap(800, 1000, f"{key.replace('-', ' ')} — illustrative stone texture", body, defs),
            encoding="utf-8",
        )
        written += 1

    # 2 — scene plates
    for i, (path, kind, key, w, h) in enumerate(SCENES):
        target = OUT / f"{path}.svg"
        target.parent.mkdir(parents=True, exist_ok=True)
        label = path.replace("/", " ").replace("-", " ")
        target.write_text(build_scene(kind, key, w, h, 2000 + i * 13, label), encoding="utf-8")
        written += 1

    # 3 — favicon monogram
    favicon = OUT.parent / "favicon.svg"
    favicon.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        f'<rect width="64" height="64" fill="{OBSIDIAN}"/>'
        f'<rect x="6" y="6" width="52" height="52" fill="none" stroke="{BRONZE}" stroke-width="2"/>'
        f'<text x="32" y="41" text-anchor="middle" fill="{IVORY}" '
        f'font-family="Georgia, serif" font-size="26" font-weight="600">PN</text></svg>\n',
        encoding="utf-8",
    )

    print(f"Generated {written} SVG plates + favicon.svg")


if __name__ == "__main__":
    main()
