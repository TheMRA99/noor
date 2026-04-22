import { create } from 'zustand';
import { AudioFile } from '@/types/quran';

interface AudioState {
  isPlaying:        boolean;
  isLoading:        boolean;
  currentVerseKey:  string | null;
  currentChapterId: number | null;
  playlist:         AudioFile[];
  currentIndex:     number;
  repeat:           boolean;
  speed:            number;
  error:            string | null;
  // Internal — called by AudioService to sync state
  _set: (partial: Partial<Omit<AudioState, '_set'>>) => void;
}

export const useAudioStore = create<AudioState>()((set) => ({
  isPlaying:        false,
  isLoading:        false,
  currentVerseKey:  null,
  currentChapterId: null,
  playlist:         [],
  currentIndex:     0,
  repeat:           false,
  speed:            1,
  error:            null,
  _set: (partial) => set(partial),
}));
