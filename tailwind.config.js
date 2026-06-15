/* Tailwind config for offline-safe precompile.
   Scans the single index.html source. Safelists `pt-4` because it
   only appears inside a Vue :class ternary that the scanner cannot
   see. All other dynamic class bindings reference custom classes
   defined in the inline <style> block (is-on, active, is-playing,
   tab-on, etc.) — those are not Tailwind classes and don't need to
   be in the safelist. */
module.exports = {
  content: ['./index.html'],
  safelist: ['pt-4'],
  theme: { extend: {} },
  plugins: [],
  corePlugins: { preflight: true }
};
