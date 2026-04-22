import { quranClient } from './quranClient';
import { Verse, VersesResponse } from '@/types/quran';

const DEFAULT_TRANSLATION = 131; // The Clear Quran — Dr. Mustafa Khattab
const DEFAULT_RECITATION  = 7;   // Mishary Rashid Alafasy
const PER_PAGE            = 50;

export async function getVersesByChapter(
  chapterId: number,
  page = 1,
  translationId = DEFAULT_TRANSLATION,
  signal?: AbortSignal,
): Promise<VersesResponse> {
  return quranClient.request<VersesResponse>(
    `/verses/by_chapter/${chapterId}`,
    {
      translations: String(translationId),
      audio:        String(DEFAULT_RECITATION),
      fields:       'text_uthmani,verse_key,verse_number,page_number,juz_number',
      per_page:     String(PER_PAGE),
      page:         String(page),
    },
  );
}

export async function getVerseOfTheDay(dayIndex: number): Promise<Verse> {
  // Cycles through all 6236 verses deterministically by day
  const totalVerses = 6236;
  const verseIndex  = dayIndex % totalVerses;

  // Binary search the chapter: Al-Fatiha has 7, then cumulative counts
  const CHAPTER_VERSE_COUNTS = [
    7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,31,34,45,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6
  ];

  let cumulative = 0;
  let targetChapter = 1;
  let verseInChapter = 1;

  for (let i = 0; i < CHAPTER_VERSE_COUNTS.length; i++) {
    if (verseIndex < cumulative + CHAPTER_VERSE_COUNTS[i]) {
      targetChapter   = i + 1;
      verseInChapter  = verseIndex - cumulative + 1;
      break;
    }
    cumulative += CHAPTER_VERSE_COUNTS[i];
  }

  const page = Math.ceil(verseInChapter / PER_PAGE);
  const res  = await getVersesByChapter(targetChapter, page);
  const verse = res.verses.find((v) => v.verse_number === verseInChapter);
  if (!verse) throw new Error(`Verse of the day not found`);
  return verse;
}
