import { useState, useEffect, useCallback, useRef } from 'react';
import { getVersesByChapter } from '@/services/api/verses';
import { Verse } from '@/types/quran';

interface State {
  verses:        Verse[];
  isLoading:     boolean;
  error:         string | null;
  hasMore:       boolean;
  fetchNextPage: () => void;
}

export function useVerses(chapterId: number, translationId = 131): State {
  const [verses,    setVerses]    = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [page,      setPage]      = useState(1);
  const [hasMore,   setHasMore]   = useState(true);
  const loadingRef = useRef(false);

  useEffect(() => {
    setVerses([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [chapterId, translationId]);

  useEffect(() => {
    if (loadingRef.current) return;
    const controller = new AbortController();
    loadingRef.current = true;
    setIsLoading(true);

    getVersesByChapter(chapterId, page, translationId, controller.signal)
      .then((res) => {
        setVerses((prev) => (page === 1 ? res.verses : [...prev, ...res.verses]));
        setHasMore(res.meta.next_page !== null);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError')
          setError(err.message ?? 'Failed to load verses');
      })
      .finally(() => {
        loadingRef.current = false;
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [chapterId, translationId, page]);

  const fetchNextPage = useCallback(() => {
    if (!isLoading && hasMore) setPage((p) => p + 1);
  }, [isLoading, hasMore]);

  return { verses, isLoading, error, hasMore, fetchNextPage };
}
