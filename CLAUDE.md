# Noor — Islamic Educational App

## Project Overview
A reverent Islamic educational companion. Quran (Arabic + translations + recitations), 99 Names of Allah, themed Quranic wisdom, bookmarks, and remembrance. Ships as both an installable PWA and a Capacitor-wrapped Android app from a **single `index.html`**.

---

## Architecture at a glance

- **One file does the whole app.** `index.html` holds markup, CSS (tokens + components), and a Vue 3 app. No build step, no bundler, no node_modules for the app itself — only Capacitor's CLI for packaging.
- **Vue 3 from CDN** (`vue.global.prod.js`) + **Tailwind from CDN** (`cdn.tailwindcss.com`) + **Google Fonts** for display text.
- **Local font asset:** `assets/fonts/KFGQPCUthmanicScriptHAFS.ttf` is copied into `www/fonts/` and `@font-face`-loaded for Quranic Arabic. The other fonts (Amiri, Cormorant Garamond, Inter) come from Google Fonts at runtime.
- **Persistence:** `localStorage` only. Keys: `noor_profile`, `noor_bookmarks`, `noor_last`, `noor_theme`, `noor_prefs`, `noor_arabic_size`.
- **Offline shell:** `sw.js` — network-first with cache fallback; always-live pass-through for `api.quran.com`, `verses.quran.com`, `everyayah.com`.
- **Android wrapper:** Capacitor 8 copies `index.html`, `sw.js`, and fonts into `www/`, then into the Android project.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| App framework | Vue 3 (global build, CDN) |
| Styling | Tailwind (CDN) + CSS custom properties in `:root` / `.dark` |
| Persistence | `localStorage` |
| Offline | Service worker (`sw.js`) |
| Native wrapper | Capacitor 8 (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`) |
| Fonts | KFGQPC Uthmanic Hafs (local), Amiri / Cormorant Garamond / Inter (Google Fonts) |

---

## Getting Started

```bash
npm install              # installs Capacitor CLI + Android platform
npm run add-android      # first-time only — creates /android
npm run build            # copies index.html, sw.js, fonts into www/ and syncs Android
npm run open             # opens Android Studio
```

Scripts in `package.json`:

| Script | What it does |
|--------|--------------|
| `build` | `mkdir -p www/fonts && cp index.html www/ && cp sw.js www/ && cp assets/fonts/*.ttf www/fonts/ && npx cap copy android` |
| `sync` | `npx cap sync android` (copy + update native deps) |
| `open` | `npx cap open android` |
| `add-android` | One-time Android platform add |

For pure web testing, open `index.html` directly in a browser or serve the project root over any static server.

---

## Folder Layout

```
noor/
├── index.html              # THE app — markup, styles, Vue component
├── sw.js                   # Service worker
├── capacitor.config.json   # appId com.themra99.noor, webDir www, bg #0D1F1A
├── package.json
├── assets/
│   ├── fonts/
│   │   └── KFGQPCUthmanicScriptHAFS.ttf   # local Quran font (the others come from Google)
│   ├── icon.png, adaptive-icon.png, splash-icon.png, favicon.png
└── www/                    # build output — git-ignored, created by npm run build
```

`android/` and `www/` are git-ignored.

---

## Design Tokens (Madinah Palette)

Defined in the `:root` / `.dark` blocks of `index.html`. **Single source of truth** — never hard-code hex values outside those blocks.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--base` | `#0F4C3A` | same | Primary brand (emerald) |
| `--accent` | `#C9A961` | `#E8C979` | Gold — decorative, CTA, highlights |
| `--parchment` | `#F5F0E1` | — | Cream background in light mode |
| `--ink` | `#1A1A1A` | — | Body text in light mode |
| `--sacred` | `#0F4C3A` | same | **Reserved — `.sacred-frame` only** |
| `--bg` | `#F5F0E1` | `#0D1F1A` | App background |
| `--text` / `--text-2` / `--text-3` / `--text-4` | — | — | Text tiers (primary → muted) |

Motion tokens: `--ease-out-expo`, `--ease-in-out-expo`, `--ease-smooth`, `--ease-bounce`, `--dur-quick | med | slow`.

---

## Sacred Text Rules (NEVER VIOLATE)

1. **Always** use the `.sacred-text` CSS class for Quranic Arabic — it applies Uthmanic Hafs, RTL, right-align, and line-height tuned for ligatures.
2. **Never** apply `text-overflow: ellipsis`, `-webkit-line-clamp`, or any truncation to Quranic text.
3. **Never** break Arabic words across lines (the font + line-height in `.sacred-text` handles this; don't override with `word-break` / `overflow-wrap`).
4. `dir="rtl"` and `lang="ar"` go on every Quranic `<p>`.
5. The `--sacred` color token is reserved for `.sacred-frame` — don't reuse it elsewhere.
6. Ayah markers use the `.ayah-marker` class (gold circle with Arabic-Indic digit via `toArabicDigits`).

---

## App Structure (inside `index.html`)

### Pages (`page` reactive ref)
- `onboarding` / `setup-name` — first-run name capture
- `home` — greeting, daily verse, random-verse + solace shortcuts, continue reading, quick entries, daily reflection
- `quran` — surah list with search + Meccan/Medinan filter — each row shows Arabic name, Latin name, italic gold *meaning*, revelation place, ayāt count
- `reader` — ayah-by-ayah Arabic + transliteration (toggle) + Khattab translation + audio + bookmark; surah header shows the meaning prominently
- `bookmarks` — saved verses
- `names` — the 99 Names of Allah (grid)
- `wisdom` — themed Quranic verses (patience / gratitude / mercy / faith / prayer / hope / knowledge / humility)
- `hadith` — 40 selections from An-Nawawi's Forty Hadith plus extensions, with Arabic, transliteration, English, narrator, source
- `stories` — 25 prophets from Ādam to Muḥammad ﷺ — short summary + lesson
- `figures` — Companions, Women of Islam, Scholars (37 lives, category-chip filter)
- `seerah` — 17 chronological events from the Prophet's ﷺ life (Year of the Elephant → Farewell Pilgrimage → his ﷺ passing)
- `solace` — verses for the heart, grouped by emotional state (15 themes: anxiety / grief / hardship / forgiveness / trust / fear / gratitude / nearness / doubt / illness / parents / provision / sleep / guidance / patience)
- `library` — entry tiles to Names · Wisdom · Hadith · Stories · Figures · Seerah · Solace
- `profile` — theme, reciter, name edit, clear data, maker's signature

### Reactive state (all in the Vue `setup()` function)
- `page`, `isDark`, `profile`, `bookmarks`, `lastPosition`
- `currentSurah`, `verses`, `loadingVerses`, `versesError`
- `surahSearch`, `revFilter`, `arabicSize`
- `wisdomTheme`, `solaceTheme`, `figureCat`
- `selectedName`, `selectedVerse`, `selectedHadith`, `selectedStory`, `selectedFigure`, `selectedSeerah`
- `audio { isPlaying, currentAyah, label }`, `prefs { reciterId, showTranslit }`, `toast`

### Built-in data (no API needed)
- `SURAHS_DB` (114, with `meaning` field), `ASMA_DB` (99), `DAILY_VERSES` (~30), `DAILY_REFLECTIONS` (35)
- `WISDOM_THEMES` (8 + All) + `WISDOM_DB` (44), `RECITERS` (5)
- `HADITH_DB` (40), `STORIES_DB` (25)
- `FIGURE_CATEGORIES` (3 + All) + `FIGURES_DB` (37: 9 companions, 15 women, 13 scholars)
- `SEERAH_DB` (17 chronological events from the life of the Prophet ﷺ)
- `SOLACE_THEMES` (15) + `SOLACE_DB` (~79)

### API & audio
- Surahs + ayahs: `https://api.quran.com/api/v4/verses/by_chapter/{id}?translations=131&words=true&word_fields=text_uthmani,transliteration&fields=text_uthmani,verse_key,verse_number`
- Translation 131 = The Clear Quran (Dr. Mustafa Khattab); transliteration is built per-verse from `words[].transliteration.text`.
- Audio: `https://everyayah.com/data/{subfolder}/{SSS}{AAA}.mp3` — five reciter choices (Alafasy default). One `<audio>` element driven imperatively by `playAyah` / `toggleAudio` / `stopAudio`.

---

## Do Nots

- No AI-generated images of Prophets or sacred figures
- No background music
- No auto-play recitation without user action
- No ads near Quran
- No da'if or mawdu' hadiths without clear labeling
- No flashy animations on sacred screens
- No breaking Arabic words across lines
- No hard-coded hex values outside the token blocks

---

## Phase Roadmap

| Phase | Focus |
|-------|-------|
| **1** ✅ | Design system, navigation, home, Quran reader MVP, bookmarks, 99 Names, wisdom |
| 2 | Multiple translations, tafsir, multiple qaris, offline surah download |
| 3 | Hadith browser (Sunnah.com), search, bookmarks |
| 4 | Prophet stories, Seerah, Sahaba, quotes gallery |
| 5 | Prayer times, Qibla, widgets, accessibility audit |

---

*نِيَّةً لِوَجْهِ اللهِ — May this be a sadaqah jariyah.*
