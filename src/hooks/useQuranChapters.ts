import { useState, useEffect } from 'react';
import { getChapters } from '@/services/api/chapters';
import { Chapter } from '@/types/quran';

interface State {
  chapters: Chapter[];
  isLoading: boolean;
  error: string | null;
}

export function useQuranChapters(): State {
  const [state, setState] = useState<State>({
    chapters:  [],
    isLoading: true,
    error:     null,
  });

  useEffect(() => {
    let cancelled = false;
    getChapters()
      .then((chapters) => {
        if (!cancelled) setState({ chapters, isLoading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled)
          setState({ chapters: [], isLoading: false, error: err.message ?? 'Failed to load' });
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
