import { useBookmarksStore } from '@/store';
import { Bookmark } from '@/types/bookmarks';

export function useBookmark(verseKey: string) {
  const isBookmarked  = useBookmarksStore((s) => s.isBookmarked(verseKey));
  const addBookmark   = useBookmarksStore((s) => s.addBookmark);
  const removeBookmark = useBookmarksStore((s) => s.removeBookmark);

  function toggle(data: Omit<Bookmark, 'savedAt'>) {
    if (isBookmarked) {
      removeBookmark(verseKey);
    } else {
      addBookmark({ ...data, savedAt: Date.now() });
    }
  }

  return { isBookmarked, toggle };
}
