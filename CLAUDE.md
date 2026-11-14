# MICA Lab website

Static site for the Music Interaction and Computational Arts (MICA) Lab, UWE Bristol, served at https://micalab.org. There's no build step, package manager or tests. You edit HTML/CSS/JS directly and upload the files to an Apache host (`.htaccess` forces HTTPS to micalab.org).

## Layout

- `index.html`: home page, titled "Join Us". It has the lab blurb plus job cards (`w3-third` + `w3-card`).
- `outside-in/`, `people/`, `publications/`, `contact/`: one `index.html` each.
- `nav.js` / `footer.js`: inject the shared top nav and footer into `#site-nav` / `#site-footer` on `DOMContentLoaded`. Every page includes both in `<head>`. `nav.js` adds `.nav-active` to the link for the current path. Mobile menu = `#navDemo` toggled by `openNav()`.
- `css/style.css`: vendored W3.CSS 4.15 (don't edit). `css/theme.css`: site theme and custom classes:
  - `.page-hero` / `.page-hero-inner` / `.page-hero-sub` (title-slide header; `.page-hero-home` variant with `.hero-logo`)
  - `.site-footer` (built by `footer.js`), `.image-strip`, `.panel-blush`
  - `.page-wrapper`, `.nav-active`
  - `.publications` (the pubs table)
  - `.w3-quarter.tom-fifth` (5-per-row grid used on People and Contact partners; 2 per row under 600px)
  - CSS is linked with `?v=4` for cache busting. Bump it on all 5 pages when the CSS changes.
- External assets: Font Awesome 6.5.2 (cdnjs), Google Fonts Atkinson Hyperlegible + Questrial.
- `images/`:
  - `banner.jpg`: project collage, now only used as the strip under the home hero
  - `bridge.png`: sketch of The Bridge building, on the Contact page
  - `profiles/` (people), `partners/` (logos), `jobs/` (job card images)
  - `micalogos/`: SVG logos; `colour.svg` (blush) is used in the nav, the footer and the home hero
  - `waves/`: web-optimised waveforms from the slide deck (`title-slide`, `quotation`, `card`, `section-divider`)
  - `logos/`: UWE, UKRI and Bridge Studios logos for the footer
- `slideAssets/`: the source slide template (`mica-lab-template.pptx`) and its SVGs. Reference material only: **don't deploy it**, and it's not linked from the site. The originals in `mica-lab-svgs/01-slide-waveforms` are ~900 KB each; shrink them before web use (RDP-simplify the polylines and round to 1 dp, which gets them to ~10–30 KB).

## Design system (from the slide template)

- Colours (CSS custom properties in `theme.css`):
  - `--charcoal #3D3B3E`: nav, hero, footer, headings
  - `--grey #5E5759`: body text
  - `--rose #A8505A`: links/accents on light backgrounds, and the 56px rule under every `h2`
  - `--pink #F5C4C4`: accents on dark backgrounds, waveforms, active nav item, portrait rings
  - `--blush #FCEDED`: panels, card bodies
- Type: headings `"Century Gothic", "Questrial"` (Century Gothic matches the slides; Questrial is the web fallback). Body stays Atkinson Hyperlegible for accessibility; the slides use Corbel, which isn't a web font.
- W3 `w3-theme-*` / `w3-teal` classes are remapped onto this palette, so existing markup picks it up.
- Take only colours, fonts, images, style and logos from the slide template. **Never reuse its text**: slogans, headings and figures in the deck are placeholders, not real lab copy.
- `audio/`: audio description for the Outside-In video.
- `jobs/jobra1.html|.docx`: old job advert, not linked from anywhere.

## Page conventions

Every page copies the same `<head>` and skeleton: `body#myPage` > `#site-nav` > `<header class="page-hero">` (h1 + `.page-hero-sub`; clears the fixed nav via `--nav-height`) > `.page-wrapper` (content `w3-container`s, max 1400px) > `#site-footer` (outside the wrapper so it's full-width). The hero h1 is the page title, so content sections start at `h2`. When adding a page, copy an existing one and add the link in **both** nav blocks in `nav.js` (desktop bar and `#navDemo`).

## Publications

- Each paper lives in a numbered folder `publications/NNN/` holding `<name>.pdf` + `<name>.png` thumbnail. The numbers go up by date; the newest is currently `059`.
- `publications/index.html` lists them newest first, one `<tr>` per paper with 3 cells. New entry template:

```html
      <tr>
        <td><a target="_blank" href="/publications/NNN/file.pdf" tabindex="-1" aria-hidden="true"><img src="/publications/NNN/file.png" alt=""></a></td>
        <td><a target="_blank" href="/publications/NNN/file.pdf">
        Surname, I., and Mitchell, T. J. (YEAR) Title, In: <i>Venue</i></a></td>
        <td><a target="_blank" href="https://doi.org/..."><i class="fas fa-external-link-alt"></i></a><a target="_blank" href="/publications/NNN/file.pdf"><i class="fas fa-file-pdf"></i></a></td>
      </tr>
```

- The thumbnail link is deliberately `aria-hidden` with `alt=""` because it repeats the text link next to it. Keep that pattern.
- Name thumbnails after the paper (no raw `Screenshot ….png` names).
- `025` has only a PNG on purpose: that entry links to pushturnmove.com.
- Optional third-cell icons: DOI/external (`fa-external-link-alt`), PDF (`fa-file-pdf`), zine (`fa-book`).

## Accessibility

The lab is inclusive and accessibility-focused, so give every new `<img>` meaningful alt text (or `alt=""` only when it duplicates adjacent text).

## Current state (as of 2026-10-04)

- Recruiting two Research Fellows on the UKRI Outside Interactions project: "Digital Musical Instrument Design" and "Algorithmic Sensing for Music". The "Apply now" links (UWE webitrent) appear in `index.html` job cards **and** as "Recruiting Now!" entries on `people/index.html`. When the posts close or get filled, update both pages and the "We are currently recruiting two research fellows!" sentence in `index.html`. The webitrent pages are rendered with JS, so curl can't check whether a vacancy is open; ask the user.
- Footer social links: X (`x.com/teamaxe`), LinkedIn, Bluesky.
- Site was restyled to match the slide template on 2026-10-04 (charcoal title-slide heroes, pink waveforms, blush panels, charcoal footer with partner logos).

## Checking local links

```bash
for p in $(grep -ohE '(href|src)="/[^"?#]+' index.html */index.html nav.js | sed -E 's/^(href|src)="//' | sort -u); do [ -e ".$p" ] || [ -e ".${p}index.html" ] || echo "MISSING: $p"; done
```

Preview locally with `python3 -m http.server` from the repo root (paths are root-absolute, so opening files directly won't work).

Screenshots: headless Chrome (`--headless=new --screenshot`) works but can hang after writing the file, so run it in the background and kill it once the PNG exists. It also won't go narrower than ~500px; to check mobile, load pages in 390px-wide `<iframe>`s inside a wrapper page.
