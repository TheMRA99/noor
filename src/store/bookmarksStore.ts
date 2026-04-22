import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';
import { Bookmark } from '@/types/bookmarks';

interface BookmarksState {
  bookmarks: Bookmark[];
  addBookmark:    (b: Bookmark) => void;
  removeBookmark: (verseKey: string) => void;
  isBookmarked:   (verseKey: string) => boolean;
  clearAll:       () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (b) =>
        set((s) => ({
          bookmarks: [b, ...s.bookmarks.filter((x) => x.verseKey !== b.verseKey)],
        })),
      removeBookmark: (verseKey) =>
        set((s) => ({ bookmarks: s.bookmarks.filter((b) => b.verseKey !== verseKey) })),
      isBookmarked: (verseKey) =>
        get().bookmarks.some((b) => b.verseKey === verseKey),
      clearAll: () => set({ bookmarks: [] }),
    }),
    {
      name:    'noor-bookmarks',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
