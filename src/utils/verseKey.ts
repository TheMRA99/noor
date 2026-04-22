export interface ParsedVerseKey {
  surah: number;
  ayah: number;
}

export function parseVerseKey(key: string): ParsedVerseKey {
  const [s, a] = key.split(':').map(Number);
  return { surah: s, ayah: a };
}

export function buildVerseKey(surah: number, ayah: number): string {
  return `${surah}:${ayah}`;
}
