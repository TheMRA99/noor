export const Colors = {
  // Madinah palette — primary brand
  base:         '#0F4C3A',
  accent:       '#C9A961',
  ink:          '#1A1A1A',
  parchment:    '#F5F0E1',
  // RESERVED — only SacredFrame may reference this directly
  sacred:       '#0F4C3A',
  // Dark mode surfaces
  darkSurface:  '#0D1F1A',
  darkSurface2: '#162E27',
  darkBorder:   '#1F3D30',
  // Muted variants
  accentMuted:  'rgba(201,169,97,0.15)',
  accentFaint:  'rgba(201,169,97,0.06)',
  inkMuted:     'rgba(26,26,26,0.5)',
  // Semantic
  error:        '#C0392B',
  success:      '#27AE60',
  // Highlighted ayah background
  highlight:    'rgba(201,169,97,0.12)',
} as const;

export const Spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
  xxxl: 64,
} as const;

export const Radius = {
  sm:   4,
  md:   8,
  lg:   16,
  xl:   24,
  full: 9999,
} as const;

export const FontSize = {
  quranBody:  28,
  quranSmall: 22,
  arabicUI:   18,
  heading1:   32,
  heading2:   24,
  heading3:   20,
  body:       16,
  small:      14,
  caption:    12,
} as const;

export const LineHeight = {
  quran:   52,  // quranBody * 1.85
  arabic:  32,
  heading: 40,
  body:    24,
  caption: 18,
} as const;

export const Duration = {
  fast:   150,
  normal: 250,
  slow:   400,
} as const;
