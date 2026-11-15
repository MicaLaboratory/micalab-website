# mica lab design system

This is a spec for restyling micalab.org to match the lab's slide template (`slideAssets/mica-lab-template.pptx`). It records what the slides actually do, then proposes how each part maps to the web.

- **From the slides** marks facts measured from the template: colours, fonts, sizes and layouts.
- **Web** marks how the site applies it. The site was built this way on 2026-11-15 (direction B). The "As built" notes in §2, §4, §7 and §9 record the decisions made while reviewing the mockups page by page.

Only the visual language comes from the template. Its wording (titles, figures, names, the lab name on the title slide, the Arts / Materials / Technology / People labels in the diagrams) is placeholder text and must never be reused as site copy.

## 1. Colour

**From the slides.** There are five colours plus white. The theme file still has Office's default palette, so these are applied directly to shapes.

| Token | Hex | Role in the slides |
|---|---|---|
| `charcoal` | `#3D3B3E` | Dark slide backgrounds (title, key figures, quotation, closing), headings on light slides, quote panel |
| `grey` | `#5E5759` | Body text on light backgrounds |
| `rose` | `#A8505A` | Large numerals (`01`, `+1.4`), one emphasised column heading, diagram nodes |
| `pink` | `#F5C4C4` | Section-divider background, waveforms on dark, subtitles and big figures on dark, process and portrait circles |
| `blush` | `#FCEDED` | Card and panel fills, the image-panel background, small text on dark |
| `white` | `#FFFFFF` | Content slide background, titles on dark |

A sixth tint, `#B8737A` (between rose and pink), is used only for the waveform on the blush image panel.

Charcoal and white carry most of the weight. Pink is the main accent, and rose is kept for a few emphasised moments.

**Contrast (WCAG 2.1).** Pairs used in the deck, with the ratios checked:

| Text on background | Ratio | Use on the web |
|---|---|---|
| charcoal on white | 11.1 | Any text |
| charcoal on blush | 9.8 | Any text |
| charcoal on pink | 7.2 | Any text |
| white on charcoal | 11.1 | Any text |
| blush on charcoal | 9.8 | Any text |
| pink on charcoal | 7.2 | Any text |
| grey on white | 7.0 | Any text |
| grey on blush | 6.2 | Any text |
| rose on white | 5.3 | Any text, including links |
| rose on blush | 4.7 | Any text (just over AA's 4.5) |
| grey on pink | 4.6 | Body text, barely AA. Prefer charcoal |
| rose on pink | 3.4 | **Large text only** (≥24px, or ≥19px bold), e.g. the section-divider numeral |
| rose on charcoal | 2.1 | **Never for text** |
| pink, blush or white on a light background | ≤1.6 | **Never for text**. Decoration only |

**Web.** Define the six colours as custom properties in `css/theme.css` and remap the W3 `w3-theme-*` / `w3-teal` classes onto them, so existing markup picks them up. Links are rose on light backgrounds and pink on charcoal. Focus outlines need at least 3:1 against what's next to them, so use charcoal on light backgrounds and pink on dark ones.

## 2. Typography

**From the slides.**

- Headings use **Century Gothic** at regular weight, apart from small subheads, which are bold. The heading font is set in the theme (`+mj`).
- Body text uses **Corbel** (theme `+mn`).
- Text is left-aligned. The only centred text is the process and team captions and the closing "Thank you".
- Sentence case throughout. The wordmark is lower case ("mica lab").

| Element | Size (pt) | Weight | Colour |
|---|---|---|---|
| Title-slide title | 44 | Regular | white |
| Closing title | 48 | Regular | white |
| Content slide title | 32 | Regular | charcoal (white on dark) |
| Section-divider title | 40 | Regular | charcoal |
| Section-divider numeral | 72 | Regular | rose |
| Key figure | 88 | Regular | pink on charcoal |
| Card numeral / stat | 40–54 | Regular | rose |
| Pull quote | 24–32 | Regular | white on charcoal |
| Subhead (card, column, person) | 18–20 | **Bold** | charcoal (or rose for emphasis) |
| Subtitle on dark | 16–20 | Regular | pink |
| Body | 16–18 | Regular | grey |
| Small body / captions | 14 | Regular | grey |
| Notes | 11 | Regular italic | grey |

**Web.**

- Headings: `"Century Gothic", "Questrial", sans-serif`. Century Gothic is installed on Windows and on Macs with Office. Questrial (Google Fonts) is the closest free fallback.
- Body font, as built: **Corbel**, matching the slides: `Corbel, "Segoe UI", "Helvetica Neue", Arial, sans-serif`. Atkinson Hyperlegible was compared and rejected, mainly because of its numerals. Corbel only exists on Windows and on Macs with Office, so many visitors see the fallback.
- Lab name: always lowercase, "mica lab", in copy, titles and alt text.
- Section headings: title case ("PhD Students", "Supporters and Partners").
- Suggested scale, from the slides' ratios to an 18px body:

| Web element | Slide equivalent | Size |
|---|---|---|
| Page title (h1, in the hero) | Title slide 44 | `clamp(2rem, 5vw, 2.75rem)` |
| Section heading (h2) | Content title 32 | `clamp(1.6rem, 3.5vw, 2rem)` |
| Subhead (h3, bold) | 20 | `1.25rem` |
| Body | 18 | `1.125rem` (18px) |
| Small | 14 | `0.875rem` |
| Big figure | 88 | `clamp(3rem, 8vw, 5.5rem)` |

- Keep headings at regular weight, as the slides do. Bold is only for h3-level subheads.
- Line length: 60–75 characters for body text. Line height: 1.5–1.6 for body, 1.15–1.25 for headings.

## 3. Logos and marks

**From the slides** (`slideAssets/mica-lab-svgs/02-logos/`).

- **mica lab wordmark**: a waveform "M" mark plus "mica lab" in lower case. It comes in four versions: `colour` (pink on dark), `white`, `grey` and `black`. There's also a mark-only version (`mica-lab-mark-colour`).
  - On dark slides, the wordmark sits top-left (colour version).
  - On light slides, it sits bottom-left next to the UWE logo (grey version).
  - The quotation slide uses the large mark on its own, top-left.
- **UWE Bristol**: shown on every slide, bottom-left. It's the black-square logo on light slides and white text on dark ones.
- **UKRI** and **The Bridge Studios**: bottom-right, on the title and closing slides only (white versions on charcoal).

**Web.**

- Nav: the wordmark at the left. Use `colour` or `white` on a charcoal nav, `grey` on a white one.
- Footer: UWE bottom-left and the wordmark next to it. UKRI and Bridge Studios go on the right, like the title and closing slides.
- Logos that link somewhere get alt text naming the destination (e.g. "MICA Lab home"). Logos that don't link get the organisation's name.
- Not in scope: the "Start" and "Now" marks, the EqualMotion / FiberFab graphics, and the triangle / square / entangled diagrams. Leave them out of the site design unless that's decided separately.

## 4. Waveform motif

**From the slides.** The main visual element is a bundle of 9–12 parallel, thin wave lines. They start calm on the left and grow chaotic on the right, running diagonally from bottom-left to top-right. Each slide type has its own variant (`01-slide-waveforms/`):

| File | Slide | Lines | Stroke | Opacity |
|---|---|---|---|---|
| `waveform-title-slide.svg` | Title (charcoal) | 12 | pink, 3 | 0.9 |
| `waveform-section-divider.svg` | Section divider (pink) | 12 | charcoal, 3 | 0.8 |
| `waveform-image-panel.svg` | Image panel (blush) | 12 | `#B8737A`, 3 | 0.85 |
| `waveform-card.svg` | Quote card (charcoal) | 10 | pink, 3.2 | 0.9 |
| `waveform-quotation.svg` | Quotation (charcoal) | 10 | pink, 3 | 0.9 |
| `waveform-closing-with-bridge-knot.svg` | Closing (charcoal) | 9 | pink, 3 | 0.9 |

The waveform always sits on the right or bottom edge and bleeds off the slide. It never sits behind text.

**Web.**

- The source SVGs are 600–940 KB. Shrink them before use: simplify the polylines (Ramer–Douglas–Peucker) and round coordinates to 1 decimal place, which gets them to roughly 10–30 KB.
- As built, the site uses one waveform: `images/waves/page-band.svg`, the title-slide wave in rose. It has `preserveAspectRatio="none"` and non-scaling 1.3px strokes, so it stretches to fill any box.
  - It sits very faint (opacity about .3) behind whole pages, as `.pagewave`, and behind the landing hero, as `.herowave`.
  - It may run behind text only because it's this faint. Keep it at or below that opacity, and fainter still on phones.
  - Leave it off very tall pages (Publications), where stretching flattens it into near-vertical lines.
  - Bands that hold detailed artwork, like the Outside-In diagram, sit above it (`section.above`).
- The waveform is decorative, so use `alt=""` or a CSS background.
- The slides don't animate. If the web version does, keep the motion slow and turn it off under `prefers-reduced-motion`.

## 5. Layout

**From the slides.** The slides are 16:9 (13.33 × 7.5 in).

- **Margins**: 0.4 in on each side (about 3% of the width). Content titles sit at the top-left.
- **Footer band**: UWE logo and wordmark bottom-left, page number bottom-right in small grey.
- **Grids**:
  - 4 equal columns with about 0.3 in gutters (overview cards, process, team)
  - 3 columns (key figures)
  - 2 columns (comparison)
  - About 50/50 split (content plus a dark quote panel, or text plus a full-bleed image panel)
- **No rules or stripes.** The slides don't use underlines under headings, accent bars or edge stripes anywhere. Sections are separated by background colour and white space.

**Web.**

- Keep the current `.page-wrapper` with max width 1400px. Side padding of about 3% (minimum 16px) matches the slide margins.
- Section spacing: alternate white and blush (or charcoal) bands, not rules. Vertical padding about 64px on desktop and 40px on mobile.
- Grids:
  - 4 columns: 2 under 900px, 1 under 600px.
  - 3 columns: 1 under 600px.
  - 2 columns: 1 under 768px.
- People and Contact partners already use the 5-per-row `.tom-fifth` grid, which can stay.

## 6. Page and section patterns

Each slide layout and the web element it would become:

| Slide layout | What it looks like | Web proposal |
|---|---|---|
| **Title** | Charcoal background, wordmark top-left, large white title, pink subtitle, waveform on the right; UWE bottom-left, UKRI and Bridge bottom-right | **Page hero**: charcoal band under the nav with the h1, a pink subtitle and the waveform on the right. On the home page it can carry the large wordmark |
| **Section divider** | Pink background, large rose numeral, charcoal title, charcoal waveform | **Section break** for long pages (e.g. Outside-In): a pink band with the h2. Rose numerals only at ≥24px, because of contrast |
| **Title and content** | White, title top-left, bulleted body in grey | Default text section |
| **Title only + cards** | Four blush rounded cards: rose numeral, bold charcoal subhead, grey text | **Cards**: blush fill, radius about 12px, no border, no shadow (or a very soft one), rose numeral optional. Fits the home job cards and project lists |
| **Text + quote panel** | Text on the left; on the right, a charcoal rounded panel with a white quote and a pink waveform at its foot | **Callout panel** for a key message or quote |
| **Two columns** | Two lists, each with a bold subhead; the emphasised side's subhead is in rose | Comparison or two-part sections |
| **Image and text** | Text on the left; the right half is a full-bleed blush panel holding a photo (cropped to fill) or the waveform | **Media split**: photo fills its half (`object-fit: cover`); without a photo, a blush panel with a waveform |
| **Key figures (dark)** | Charcoal, three huge pink figures with blush captions | **Stats band**, if real figures are ever needed |
| **Process** | Four 1.3 in circles alternating pink and blush fills, line icons inside, joined by a thin pink line; bold label and short text, centred | **Steps** row. On mobile, stack it vertically with the connecting line down the left |
| **Chart** | Chart on the left, blush stat card on the right | Only if the site needs data |
| **Quotation (dark)** | Charcoal, large mark top-left, white quote 32pt, pink attribution, waveform bottom-right | **Pull quote** band |
| **Team** | Circles alternating pink and blush (photo cropped to a circle, or initials), bold name, grey role, centred | **People grid**: circular portraits on a pink or blush disc, bold name, grey role |
| **Closing (dark)** | Charcoal, waveform with a "knot" at the top-left, centred white title, pink contact line, wordmark, partner logos | **Footer**: charcoal, wordmark, contact line in pink, partner logos on the right, social links |

## 7. Components

- **Nav** (as built): a white bar with the grey wordmark on the left and charcoal links. The current page is rose on a blush pill. There's no Home link. On phones, a menu button with `aria-expanded` opens the link list.
- **Buttons** (as built): charcoal with white text, turning rose on hover. The ghost variant has a charcoal outline. Radius 12px, matching the cards.
- **Labels**: small rose pills with white text and an icon, for "Composition" and for awards ("Honourable Mention", "Best Paper Nominee").
- **Logos** (Contact): partner logos are greyscale in white tiles and turn to colour on hover or focus. Pale logos get an SVG tone-curve filter so they stay visible in grey.
- **Links**: rose on light backgrounds, pink on dark. Underline links in body text. Links in nav, footer or card titles can drop the underline if they have a hover or focus state.
- **Icons**: the process icons (`03-process-icons/`) are thin charcoal line art on a 256px grid. Any Font Awesome icons should look similar: one colour, sitting inside pink or blush circles where they appear as a group.
- **Publications** (as built): grouped by year, with large rose year headings. Each entry has a small thumbnail, the authors, the title in the heading font, an italic venue, and labelled link buttons (PDF, DOI, Video, Zine, or the site's hostname). A sticky bar holds theme filter buttons and year jump links.

## 8. Accessibility

- Use only the text and background pairs marked "Any text" in §1 for body copy. Use rose on pink only for large text, and never use pink, blush or white text on a light background.
- Only the very faint page waveform may sit behind text (see §4). Never put a full-strength waveform behind text.
- Decorative art (waveforms, circles, bands) gets `alt=""` or goes in CSS. Photos and logos get meaningful alt text (see CLAUDE.md).
- Keep visible focus states and sensible heading order (one h1 in the hero, then h2s).
- Text has to reflow at 320px width and 200% zoom, so don't use fixed-height panels that clip text.

## 9. Decisions (settled 2026-11-15)

1. Body font: Corbel (§2).
2. Nav: white (§7).
3. Section numerals: not used.
4. Waveforms: one faint stretched wave per page, behind the content; none on Publications (§4).
