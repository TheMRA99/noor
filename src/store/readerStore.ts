import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';

interface LastPosition {
  chapterId: number;
  chapterNameSimple: string;
  chapterNameArabic: string;
  ayahNumber: number;
}

interface ReaderState {
  lastPosition: LastPosition | null;
  selectedTranslationId: number;
  fontSizeOffset: number;
  setLastPosition: (pos: LastPosition) => void;
  setTranslation: (id: number) => void;
  setFontSizeOffset: (offset: number) => void;
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      lastPosition:          null,
      selectedTranslationId: 131, // The Clear Quran — Dr. Mustafa Khattab
      fontSizeOffset:        0,
      setLastPosition:    (pos) => set({ lastPosition: pos }),
      setTranslation:     (id) => set({ selectedTranslationId: id }),
      setFontSizeOffset:  (offset) =>
        set({ fontSizeOffset: Math.max(-4, Math.min(8, offset)) }),
    }),
    {
      name:    'noor-reader',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
