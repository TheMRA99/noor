import { quranClient } from './quranClient';
import { Chapter } from '@/types/quran';

let chaptersCache: Chapter[] | null = null;

export async function getChapters(): Promise<Chapter[]> {
  if (chaptersCache) return chaptersCache;
  const data = await quranClient.request<{ chapters: Chapter[] }>('/chapters', {
    language: 'en',
  });
  chaptersCache = data.chapters;
  return chaptersCache;
}

export async function getChapter(id: number): Promise<Chapter> {
  const chapters = await getChapters();
  const found = chapters.find((c) => c.id === id);
  if (!found) throw new Error(`Chapter ${id} not found`);
  return found;
}

export function clearChaptersCache(): void {
  chaptersCache = null;
}
