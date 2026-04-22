# Noor — Islamic Educational App

## Project Overview
A reverent Islamic educational mobile app built with **Expo + React Native**. Provides the Quran (Arabic + translations + recitations), hadith, stories of Prophets and companions, and curated Quranic wisdom.

## Current Phase: Phase 1 (Foundation)
Design system · Navigation shell · Home screen · Quran reader MVP · Bookmarks

---

## Sacred Text Rules (NEVER VIOLATE THESE)

1. **Never** set `numberOfLines` or `ellipsizeMode` on Quranic `Text` nodes
2. **Always** use `sacredTextStyle()` from `src/design/typography.ts` for Quranic Arabic
3. **Always** wrap Quranic text in `<SacredFrame>` — it enforces styling and warns in dev if bypassed
4. **Never** break Arabic words across lines
5. `writingDirection: 'rtl'` and `textAlign: 'right'` are mandatory on all Arabic text
6. `allowFontScaling={false}` on all Quranic `Text` nodes
7. The `sacred` color token in `tokens.ts` is **reserved** — only `SacredFrame` may use it directly

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Expo SDK 54 + React Native 0.81 |
| Language | TypeScript (strict) |
| Styling | NativeWind v4 + StyleSheet; tokens in `src/design/tokens.ts` |
| Navigation | React Navigation v7 (bottom tabs + native stack) |
| State | Zustand v5 |
| Audio | expo-av |
| Persistence | react-native-mmkv (requires `expo prebuild`) |
| Icons | lucide-react-native |

---

## Getting Started

```bash
npm install
npx expo prebuild        # required for MMKV native module
npx expo run:android     # or run:ios on macOS
```

> **Note:** `expo prebuild` generates `android/` and `ios/` directories. These are git-ignored. Rebuild after adding native modules.

---

## Fonts

Place these font files in `assets/fonts/` before running:

| File | Source |
|------|--------|
| `KFGQPCUthmanicScriptHAFS.ttf` | [King Fahd Complex](https://qurancomplex.gov.sa) — free download |
| `Amiri-Regular.ttf` | [Google Fonts / Amiri](https://fonts.google.com/specimen/Amiri) |
| `CormorantGaramond-SemiBold.ttf` | [Google Fonts / Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) |
| `Inter-Regular.ttf` | [Google Fonts / Inter](https://fonts.google.com/specimen/Inter) |
| `Inter-Medium.ttf` | Google Fonts / Inter |
| `Inter-SemiBold.ttf` | Google Fonts / Inter |

---

## Design Tokens (Madinah Palette)

Defined in `src/design/tokens.ts` — **single source of truth**.

| Token | Hex | Use |
|-------|-----|-----|
| `base` | `#0F4C3A` | Primary brand (emerald) |
| `accent` | `#C9A961` | Gold — decorative, CTA, highlights |
| `ink` | `#1A1A1A` | Body text |
| `parchment` | `#F5F0E1` | Light background |
| `sacred` | `#0F4C3A` | **Reserved — SacredFrame only** |
| `darkSurface` | `#0D1F1A` | Dark mode background |

---

## Key File Locations

| File | Purpose |
|------|---------|
| `src/design/tokens.ts` | All design tokens — start here |
| `src/design/typography.ts` | `sacredTextStyle()` — canonical Quranic text helper |
| `src/components/sacred/` | All Quranic text components live here |
| `src/services/api/quranClient.ts` | Quran.com API v4 client |
| `src/services/audio/AudioService.ts` | expo-av singleton |
| `src/store/` | All Zustand stores |

---

## API

- **Quran:** `https://api.quran.com/api/v4` — no key required for Phase 1
  - Translation ID `131` = The Clear Quran (Dr. Mustafa Khattab)
  - Recitation ID `7` = Mishary Rashid Alafasy
- **Audio CDN:** `https://everyayah.com/data/Alafasy_128kbps/{SSS}{AAA}.mp3`
- **Hadith (Phase 3):** Sunnah.com API — requires an API key, apply at sunnah.com/developers

---

## Do Nots

- ❌ No AI-generated images of Prophets or sacred figures
- ❌ No background music
- ❌ No auto-play recitation without user action
- ❌ No ads near Quran/hadith
- ❌ No da'if or mawdu' hadiths without clear labeling
- ❌ No flashy animations on sacred screens
- ❌ No breaking Arabic words across lines

---

## Phase Roadmap

| Phase | Focus |
|-------|-------|
| **1** ✅ | Design system, navigation, home, Quran reader MVP, bookmarks |
| 2 | Multiple translations, tafsir, multiple qaris, offline download |
| 3 | Hadith browser (Sunnah.com), search, bookmarks |
| 4 | Prophet stories, Seerah, Sahaba, quotes gallery |
| 5 | Prayer times, Qibla, widgets, accessibility audit |

---

*نِيَّةً لِوَجْهِ اللهِ — May this be a sadaqah jariyah.*
