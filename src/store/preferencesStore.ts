import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './mmkvStorage';

interface DailyVerseCache {
  date: string;
  verseKey: string;
  arabicText: string;
  translationText: string;
}

interface PreferencesState {
  darkMode: boolean;
  dailyVerse: DailyVerseCache | null;
  selectedQariId: number;
  playbackSpeed: 0.75 | 1 | 1.25 | 1.5;
  toggleDarkMode: () => void;
  setDailyVerse: (v: DailyVerseCache) => void;
  setQari: (id: number) => void;
  setSpeed: (s: 0.75 | 1 | 1.25 | 1.5) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      darkMode:       false,
      dailyVerse:     null,
      selectedQariId: 7,   // Mishary Rashid Alafasy
      playbackSpeed:  1,
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setDailyVerse:  (v) => set({ dailyVerse: v }),
      setQari:        (id) => set({ selectedQariId: id }),
      setSpeed:       (speed) => set({ playbackSpeed: speed }),
    }),
    {
      name:    'noor-preferences',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
