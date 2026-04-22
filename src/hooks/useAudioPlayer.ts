import { useEffect } from 'react';
import { useAudioStore } from '@/store';
import { audioService } from '@/services/audio/AudioService';
import { AudioFile } from '@/types/quran';

export function useAudioPlayer() {
  const state = useAudioStore();

  useEffect(() => {
    audioService.init();
  }, []);

  async function play(verseKey: string, chapterId: number, playlist: AudioFile[], index: number) {
    await audioService.loadAndPlay(verseKey, chapterId, playlist, index);
  }

  async function pause()  { await audioService.pause(); }
  async function resume() { await audioService.resume(); }
  async function next()   { await audioService.playNext(); }
  async function prev()   { await audioService.playPrev(); }
  async function stop()   { await audioService.stop(); }

  async function setSpeed(speed: number) {
    await audioService.setSpeed(speed);
  }

  function setRepeat(on: boolean) {
    state._set({ repeat: on });
  }

  return { ...state, play, pause, resume, next, prev, stop, setSpeed, setRepeat };
}
