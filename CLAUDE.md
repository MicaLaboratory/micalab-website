# mica lab website

Static site for mica lab (music interaction and computational arts; both always lowercase), UWE Bristol, served at https://micalab.org. There's no build step, package manager or tests. You edit HTML/CSS/JS directly and upload the files to an Apache host (`.htaccess` forces HTTPS to micalab.org).

Design rules (palette, type, waveforms, components) are in `DESIGN.md`. Read it before restyling anything.

## Layout

- `index.html`: landing page. It has the "mica lab" hero with the lab description and a light waveform behind it, a blush collaboration band ("Get in touch" → Contact), and the `banner.jpg` photo strip.
- `outside-in/`, `people/`, `publications/`, `contact/`: one `index.html` each.
- `nav.js` / `footer.js` inject the shared nav and footer into `#site-nav` / `#site-footer` on `DOMContentLoaded`. Every page includes both in `<head>`.
  - `nav.js` sets `aria-current="page"` on the link for the current path, and toggles `.open` on the mobile menu button.
  - There's no "Home" or "Join Us" link: the logo goes home.
- `css/theme.css` holds the whole site style; W3.CSS is no longer used. `css/style.css` is the old vendored W3.CSS and isn't linked from anywhere.
  - CSS is linked with `?v=9` for cache busting. Bump it on all 5 pages when the CSS changes.
- External assets: Font Awesome 6.5.2 (cdnjs), Google Fonts Questrial (fallback for Century Gothic headings). The body font is Corbel, which isn't a web font, so visitors without it get Segoe UI, Helvetica Neue or Arial.
- `images/`:
  - `banner.jpg`: project collage, the photo strip on the landing page
  - `bridge.png`: sketch of the building, on Contact
  - `profiles/` (people), `partners/` (Contact logos)
  - `logos/`: `mica-lab-grey.svg` (nav and footer), `uwe-bristol.svg`, `ukri-grey.svg`, `bridge-studios-grey.svg`
  - `waves/page-band.svg`: the faint rose waveform used as a background. It uses `preserveAspectRatio="none"` plus `vector-effect:non-scaling-stroke`, so it stretches to any box with thin lines
  - `diagrams/entangled5-light.svg`: the Creativity/Materials/Technology/People/Place diagram on Outside-In (simplified to ~50 KB)
  - `micalogos/`, `jobs/`, `swish.jpg`, `chags.jpg`: older or unused images
- `slideAssets/`: the slide template (`mica-lab-template.pptx`) and its SVGs. Reference material only: **don't deploy it**, and it's not linked from the site. Never reuse its text: slogans, headings and figures in the deck are placeholders, not real lab copy.
- `audio/`: audio description for the Outside-In video. The MP3 is played; `AudioDescriptionText.docx` is its text, which is also inline on the page in a `<details>` box.
- `jobs/jobra1.html|.docx`: old job advert, not linked from anywhere.

## Page conventions

Every page copies the same `<head>` and skeleton: `.skip` link > `#site-nav` > `main#main` > `#site-footer`.

Inside `main`:
- `<div class="pagewave">` first, on every page except Publications, which is too tall for it.
- `header.titleband.blush` with the h1.
- `section`s, alternating `.blush` and white, each with a `.wrap`: a centred 1140px content column. Coloured bands and waveforms run full width; content stays in the column.

The h1 is the page title, so sections use `h2`. When adding a page, copy an existing one and add the link to the `<ul>` in `nav.js`.

## Publications

- Each paper lives in a numbered folder `publications/NNN/` holding `<name>.pdf` + `<name>.png` thumbnail. The numbers go up by date; the newest is currently `062`.
- Name files after the venue and paper, e.g. `NIME2026-Gulf.pdf`, `ASSETS2026-Procrustean.pdf`. Thumbnails are a figure cropped from the paper, not a page preview.
- `publications/index.html` is a Google Scholar-style list, newest first, with one `<article class="srow">` row per paper. It has four columns (thumbnail | title, authors, venue and labels | links | year) under a TITLE / LINKS / YEAR header row. New entry template:

```html
      <article class="srow" data-t="des ai">
        <a class="thumb" href="/publications/NNN/file.pdf" tabindex="-1" aria-hidden="true"><img src="/publications/NNN/file.png" alt=""></a>
        <div class="main"><a class="ti" href="/publications/NNN/file.pdf">Title</a>
          <div class="au">Surname, I., and Mitchell, T. J.</div>
          <div class="ve"><span class="venue">New Interfaces for Musical Expression (NIME)<span class="vy">, YEAR</span></span></div></div>
        <div class="lk"><a href="https://doi.org/..."><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>DOI</a><a href="/publications/NNN/file.pdf"><i class="fa-solid fa-file-pdf" aria-hidden="true"></i>PDF</a></div>
        <div class="yr">YEAR</div>
      </article>
```

- **Venue**: spell it out, with the usual acronym in brackets, e.g. "New Interfaces for Musical Expression (NIME)", "International Conference on Auditory Display (ICAD)". For journals, add volume and article, e.g. "Frontiers in Virtual Reality, 5, Article 1404865". The year goes in `.vy`, which only shows on phones, and in `.yr`. Don't put DOIs in the venue text: use a DOI link instead.
- **Title**: use the final published title, e.g. from the DOI or nime.org page, not the submitted one.
- **Authors**: list them all, in `Surname, I.` form. If there are more than seven, show the first five, the last author, and a "+N more" button:
  `First, A., …five…, <span class="more" hidden>Middle, M., … </span><span class="ell" aria-hidden="true">… </span>and Mitchell, T. <button class="more-btn" aria-expanded="false" data-n="N">+N more</button>` (N = total − 6). The script at the bottom of the page wires the button up.
- **Links** (`.lk`), always in this order:
  1. where it's published: `DOI`, or `Link` for any other page. A `Link` gets `title="nime.org"` and `<span class="sr-only"> (nime.org)</span>` so the site name isn't lost.
  2. files: `PDF`, `Extended` (fuller review version; give it a `title` saying so), `Zine` (`fa-solid fa-book`)
  3. media: `Video` (`fa-brands fa-youtube`)

  For NIME papers, link the permanent nime.org page (`nime.org/proc/…`, `/proc_music/…` for music, `/proc_alt/…` for alt.NIME), not the yearly conference site.
- **Labels** go in `<div class="labels">` after `.ve`, as outline pills: `<span class="badge"><i class="fa-solid fa-award" aria-hidden="true"></i>Honourable Mention</span>`. Use `fa-music` for "Composition", `fa-award` for awards ("Honourable Mention" in UK spelling, "Best Paper Nominee"), and `fa-book-open` for "Cover article".
- **Themes**: `data-t` holds the theme tags, which drive the filter buttons: `acc` Accessibility, `ges` Gesture, `des` Design and Making, `ai` AI (includes evolutionary computation), `son` Sonification, `imm` Immersion (includes robotics), `aud` Audio, `comp` Composition. The counts on the filter buttons are hard-coded, so update them when you add a paper.
- The thumbnail link is deliberately `aria-hidden` with `alt=""` because it repeats the title link next to it. Keep that pattern.
- `025` has only a PNG on purpose: that entry links to pushturnmove.com.

## Accessibility

The lab is inclusive and accessibility-focused:
- Give every new `<img>` meaningful alt text, or `alt=""` only when it duplicates adjacent text.
- Icon-only links need an `aria-label`.
- Decorative icons get `aria-hidden="true"`.

## Current state (as of 2026-11-15)

- The redesign (direction B, from the slide template) was built on the `redesign` branch on 2026-11-15. The old W3 site is on `main`.
- The Research Fellow posts on Outside Interactions have closed:
  - **Algorithmic Sensing for Music** was filled by Jingwei Liu.
  - **Digital Musical Instrument Design** shows as "Announced soon" on People. Update it when the appointment is announced.
- Footer social links: X (`x.com/teamaxe`), LinkedIn, Bluesky. The footer partner logos link to UKRI and The Bridge Studios (UWE page).

## Deploying

- The code is on GitHub at `MicaLaboratory/micalab-website` (public), SSH remote. The live site is IONOS webspace folder `/micalab`.
- `./deploy.sh` mirrors the repo to the server over SFTP with `lftp`. It uploads changed files and **deletes server files that aren't in the repo**, after a dry run and a y/N prompt. Paths in its exclude list (`CLAUDE.md`, `DESIGN.md`, `deploy.sh`, `slideAssets/`, `jobs/`, dotfiles) are never uploaded or deleted.
- Server host and user are in the git-ignored `.deploy.env`. The SFTP password is in the macOS keychain (`micalab-deploy`). Never commit either.
- Run `deploy.sh` and any `security … -w` command in the Terminal app. Through Claude Code's `!` prompt, their interactive input is not captured (the keychain once saved an empty password that way).
- A backup of the server's old `archive/` folder (removed 2026-11-15) is in `~/Work/research/websites/micalab-server-archive-2024/`.

## Checking local links

```bash
for p in $(grep -ohE '(href|src)="/[^"?#]+' index.html */index.html nav.js footer.js | sed -E 's/^(href|src)="//' | sort -u); do [ -e ".$p" ] || [ -e ".${p}index.html" ] || echo "MISSING: $p"; done
```

Preview locally with `python3 -m http.server` from the repo root (paths are root-absolute, so opening files directly won't work).

Screenshots:
- Headless Chrome (`--headless=new --screenshot`) works but can hang after writing the file, so run it in the background and kill it once the PNG exists.
- It won't go narrower than ~500px. To check mobile, load pages in 390px-wide `<iframe>`s inside a wrapper page.
- Headless Chrome can't see Century Gothic or Corbel (they ship inside Office), so screenshots show the Questrial and Helvetica fallbacks. That's what most visitors see.
