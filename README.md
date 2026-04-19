# ひとくち (Hitokuchi) — Landing Page

Static landing page suite for the **Hitokuchi** iOS hydration app, designed to deploy on **GitHub Pages**.

- Live (once deployed): <https://kojok120.github.io/Hitokuchi-LP/>
- LP repo: <https://github.com/Kojok120/Hitokuchi-LP>
- App repo: <https://github.com/Kojok120/Hitokuchi>

---

## 1. Directory layout

```
lp/
├── index.html              # Japanese landing page (primary)
├── index.en.html           # English landing page
├── privacy.html            # Privacy policy (ja + en)
├── terms.html              # Terms of service (ja + en)
├── support.html            # Support / contact page (App Store required)
├── 404.html                # Custom 404 page
├── sitemap.xml             # Sitemap for search engines
├── robots.txt              # Crawler directives
├── .nojekyll               # Disable Jekyll on GitHub Pages
├── README.md               # This file
├── css/
│   └── styles.css          # Single stylesheet (design tokens + components)
├── js/                     # Reserved — currently empty (no JS required)
└── images/
    ├── app-icon.png              # 1024×1024 source app icon
    ├── favicon-16x16.png         # Browser favicon (small)
    ├── favicon-32x32.png         # Browser favicon (standard)
    ├── apple-touch-icon-180x180.png  # iOS home-screen icon
    ├── badges/
    │   ├── app-store-badge-ja.svg   # Official Apple JA badge (apple marketing tools)
    │   └── app-store-badge-en.svg   # Official Apple EN badge (apple marketing tools)
    ├── og/
    │   ├── og-image-ja.png  # 1200×630 OG/Twitter image (ja)
    │   └── og-image-en.png  # 1200×630 OG/Twitter image (en)
    ├── icons/               # Reserved — currently empty
    └── screenshots/
        └── screenshot-07-onboarding-ja.png  # Real capture (onboarding)
        # NOTE: other shots appear as honest "capture pending" placeholders in the gallery
```

---

## 2. Design & accessibility principles

- Vanilla HTML / CSS. **No frameworks, no build step, no npm.**
- Mobile-first responsive. Breakpoints: **375 / 768 / 1024 px**.
- **WCAG 2.2 AA** target: skip link, focus-visible outlines, semantic headings, `aria-labelledby`, `aria-current`, color contrast ≥ 4.5:1 for body text.
- **Dark mode** via `prefers-color-scheme: dark`.
- **Reduced motion** via `prefers-reduced-motion: reduce`.
- **System fonts only** — no external web fonts (performance + privacy).
- Japanese first, English parallel. `hreflang` set for ja / en / x-default.
- Every external link uses `target="_blank" rel="noopener"`.

---

## 3. Local verification

Serve the directory locally with Python's built-in server:

```bash
cd lp
python3 -m http.server 8000
# open http://localhost:8000/
```

Check:

- [ ] `index.html` renders correctly in Safari and Chrome (light + dark).
- [ ] `index.en.html` renders correctly.
- [ ] Header language switcher works (ja ⇄ en).
- [ ] Every anchor link (`#different`, `#faq`, etc.) scrolls smoothly.
- [ ] `privacy.html`, `terms.html`, `support.html`, `404.html` all render.
- [ ] No console errors, no 404s for images/CSS.
- [ ] Tab order is logical; skip-link appears on first Tab press.
- [ ] FAQ `<details>` elements expand/collapse.

---

## 4. Pre-release checklist (MUST complete before public launch)

The LP can go live on GitHub Pages today, but **the following items MUST be handled before App Store submission or any marketing push**. Treat this list as blockers.

### 4.0 Top-priority tasks (in order)

1. **Capture real Simulator screenshots** for Home / Record / Beverage / History / Themes (ja) and the English equivalents, and replace the placeholder cards in the `#gallery` section of both `index.html` and `index.en.html`. See §4.3.
2. **Verify the App Store badge SVGs are official Apple artwork.** Round 2 (2026-04-17) fetched them from Apple's Marketing Tools API — spot-check them at <https://toolbox.marketingtools.apple.com/app-store/> and re-download if Apple rotates the asset URLs. See §4.2.
3. **Replace `{{APP_STORE_ID}}`** and uncomment the Smart App Banner after App Store Connect assigns a real ID. See §4.1.
4. **Verify favicon/apple-touch-icon PNGs** are crisp and square (regenerate from a higher-fidelity master if the current derivatives from `app-icon.png` look blurry on Retina). See §4.5.
5. **Confirm `kojokamo120@gmail.com` is monitored** (spam filter off, mobile notifications on). Apple reviewer emails sometimes land here.

### 4.1 `{{APP_STORE_ID}}`

Every App Store link currently points to `id{{APP_STORE_ID}}`. Once App Store Connect assigns the real numeric ID (e.g. `6499999999`), run:

```bash
cd lp
grep -l '{{APP_STORE_ID}}' *.html
# Replace across all HTML files:
sed -i '' 's/{{APP_STORE_ID}}/6499999999/g' index.html index.en.html
```

After replacement, also **uncomment the Smart App Banner** meta tag in `index.html` and `index.en.html`:

```html
<!-- <meta name="apple-itunes-app" content="app-id=6499999999"> -->
```

### 4.2 App Store Badges (official)

`images/badges/app-store-badge-ja.svg` and `app-store-badge-en.svg` are the **official Apple artwork**, fetched on 2026-04-17 from:

- `https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ja-jp?releaseDate=...` (ja)
- `https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?releaseDate=...` (en)

Before public release, re-download from Apple's Marketing Tools toolbox (<https://toolbox.marketingtools.apple.com/app-store/>) to make sure we ship the most current version. Do **not** modify the SVG contents — Apple's guidelines prohibit color / rotation / skew / border changes. The HTML attribute widths are sized to the badges' native 108.85:40 (ja) and 119.66:40 (en) ratios; adjust the numbers if you swap to a differently-proportioned size.

### 4.3 Screenshots (placeholders still in gallery)

Round 1 committed 7 screenshot files, but 6 of them were byte-identical duplicates of the onboarding capture. Round 2 removed the duplicates and replaced the gallery entries with clearly-labelled "capture pending" placeholder cards. Current state:

- `screenshot-07-onboarding-ja.png` — real capture (used in Hero and the first Gallery figure)
- Everything else is a CSS placeholder card, not an image file

Before public release, capture the remaining shots and restore `<img>` elements in the `#gallery` section of both `index.html` and `index.en.html`. Target captures:

| File | Screen |
| --- | --- |
| `screenshot-01-hero-ja.png` | Home (filled state) |
| `screenshot-02-record-ja.png` | Record / beverage selection |
| `screenshot-03-beverage-ja.png` | Beverage grid detail |
| `screenshot-04-history-ja.png` | History |
| `screenshot-05-themes-ja.png` | Theme picker |
| `screenshot-01-hero-en.png` | Home (English locale) |
| `screenshot-03-beverage-en.png` | Beverage grid (English locale) |

Capture workflow (Simulator, iPhone 16 Pro, light mode, status bar cleared):

```bash
xcrun simctl status_bar "iPhone 16 Pro" override \
  --time "9:41" --dataNetwork wifi --wifiBars 3 --batteryState charged --batteryLevel 100
# then use Cmd-S in Simulator (Device → Save Screen) or xcrun simctl io booted screenshot <path>
```

Language override for Simulator launch:

```bash
xcrun simctl launch --terminate-running-process booted app.hitokuchi.Hitokuchi \
  -AppleLanguages '(ja)' -AppleLocale ja_JP   # swap to '(en)' + en_US for English captures
```

Honesty rule: **do not reuse a single screenshot under multiple alt texts.** If a capture is missing, keep the placeholder card rather than inserting another screen's image.

### 4.4 Contact email

`kojokamo120@gmail.com` is hard-coded across `index.html`, `support.html`, `privacy.html`, and `terms.html`. If the support address changes, update in all four files.

### 4.5 Favicon / apple-touch-icon derivatives

Round 2 generated `favicon-16x16.png`, `favicon-32x32.png`, and `apple-touch-icon-180x180.png` from `app-icon.png` via macOS `sips`. Verify visually on Retina displays and iOS home-screens; if anti-aliasing looks off at 16px, ask the designer (S06) to export purpose-built sizes from the vector master.

---

## 5. Deploy to GitHub Pages

The LP lives in a dedicated repo at <https://github.com/Kojok120/Hitokuchi-LP>. All files (`index.html`, `css/`, `images/`, etc.) sit at the repo root so the published URL is `https://kojok120.github.io/Hitokuchi-LP/`.

1. From this directory, initialize and push to the dedicated LP repo:
   ```bash
   cd lp
   git init
   git add .
   git commit -m "feat: initial Hitokuchi LP v4 (balanced brand × need framing)"
   git branch -M main
   git remote add origin git@github.com:Kojok120/Hitokuchi-LP.git
   git push -u origin main
   ```
2. In the `Hitokuchi-LP` repo on GitHub, **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`
3. Wait ~1 minute. GitHub Pages will serve the LP at `https://kojok120.github.io/Hitokuchi-LP/`.
4. The `.nojekyll` file disables Jekyll processing so underscore-prefixed files (if any) are served verbatim.

Updates flow through normal `git push` to the `main` branch of the LP repo. The iOS app repo (`Hitokuchi`) is separate and does not carry LP assets.

---

## 6. Post-deploy verification

After deployment, run through this checklist on the live URL:

- [ ] `https://kojok120.github.io/Hitokuchi-LP/` loads and renders.
- [ ] `https://kojok120.github.io/Hitokuchi-LP/index.en.html` loads.
- [ ] `privacy.html`, `terms.html`, `support.html` all resolve.
- [ ] Requesting a nonexistent path (e.g. `/lp/foo`) returns the custom `404.html`.
- [ ] Lighthouse audit (Chrome DevTools → Lighthouse → Mobile):
  - Performance **≥ 90**
  - Accessibility **≥ 95**
  - Best Practices **≥ 95**
  - SEO **≥ 95**
- [ ] OGP preview (paste URL into Slack, LINE, Twitter/X): card renders with `og-image-ja.png`.
- [ ] Structured data validator: <https://search.google.com/test/rich-results> accepts the `MobileApplication` JSON-LD.
- [ ] No mixed-content warnings (all assets are relative or https).
- [ ] Validate HTML: <https://validator.w3.org/nu/?doc=https://kojok120.github.io/Hitokuchi-LP/>.

---

## 7. Page-by-page notes

### `index.html` (Japanese primary)

10 sections matching the v4 GTM appeal spec (brand warmth × quiet root-need framing):

1. `#hero` — *ひとくち、飲んだ？* / *その小さなひとこえが、家族と自分の、やさしい夏になる。*
2. `#empathy` — quiet acknowledgment that summers feel harder lately
3. `#brand-story` — grandmother anecdote, written to preserve her dignity
4. `#facts` — MHLW hydration reference, cited as a quiet measuring stick (no alarm)
5. `#gap` — the small distance between "I drank" and "enough"
6. `#solution` — what Hitokuchi quietly does, in brand language
7. `#how-it-works` — three steps (朝 / 昼のそば / 夕暮れ)
8. `#trust` — honest list of what the app does and doesn't do
9. `#faq` — frequently asked questions
10. `#closing` — hero copy reprise + App Store badge

The App Store badge appears **twice** (Hero + Closing). No price is shown anywhere on the LP — pricing is surfaced only via the App Store's own StoreKit UI. The `#pricing` and `#for-loved-ones` sections from earlier iterations were removed (king's post-QA decision).

### `index.en.html`

English parallel of `index.html`. Same 10 sections. Gallery currently shows 1 real onboarding shot + placeholder cards (Round 2). All App Store links point to the US storefront path (`apps.apple.com/us/...`).

### `privacy.html`, `terms.html`

Bilingual (ja section + en section, separated by `<hr>`). Converted from `apps/app-2026-04-15-hitokuchi/legal/privacy-policy.md` and `terms-of-service.md`. The privacy page adds a section acknowledging GitHub Pages access logs per LP design §10.6.

### `support.html`

App Store submission requirement. Contains FAQ, contact info, bug-report guidance, refund flow (links to Apple's `reportaproblem.apple.com`), and a privacy inquiry pointer.

### `404.html`

Custom 404 in the Hitokuchi tone (gentle, never blaming the user). Links back to top + support. Marked `noindex` so search engines do not index error URLs.

---

## 8. Credits

- Copy: GTM Appeal v1.2 (Phase 11)
- Design spec: LP Design v1.1 (Phase 10)
- Voice / tone: Merchant + Translator agents
- Built by: S09 Web-builder (AI エージェント帝国 / Hitokuchi cycle 2026-04-15)
