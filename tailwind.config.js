/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './index.ts',
    './src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        base:         '#0F4C3A',
        accent:       '#C9A961',
        ink:          '#1A1A1A',
        parchment:    '#F5F0E1',
        sacred:       '#0F4C3A',
        darkSurface:  '#0D1F1A',
        darkSurface2: '#162E27',
      },
      fontFamily: {
        quran:   ['KFGQPCUthmanicScriptHAFS'],
        amiri:   ['Amiri_400Regular'],
        heading: ['CormorantGaramond_600SemiBold'],
        body:    ['Inter_400Regular'],
        bodyMed: ['Inter_500Medium'],
        bodySB:  ['Inter_600SemiBold'],
      },
    },
  },
  plugins: [],
};
