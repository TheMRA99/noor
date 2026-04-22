const EVERY_AYAH_BASE = 'https://everyayah.com/data/Alafasy_128kbps';
const QURAN_CDN_BASE  = 'https://verses.quran.com';

export function buildEveryAyahUrl(surah: number, ayah: number): string {
  const s = String(surah).padStart(3, '0');
  const a = String(ayah).padStart(3, '0');
  return `${EVERY_AYAH_BASE}/${s}${a}.mp3`;
}

export function buildQuranCdnUrl(relativeUrl: string): string {
  return `${QURAN_CDN_BASE}/${relativeUrl}`;
}
