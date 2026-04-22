import { Audio, AVPlaybackStatus } from 'expo-av';
import { useAudioStore } from '@/store/audioStore';
import { buildEveryAyahUrl, buildQuranCdnUrl } from '@/utils/audioUrl';
import { parseVerseKey } from '@/utils/verseKey';
import { AudioFile } from '@/types/quran';

class AudioService {
  private sound: Audio.Sound | null = null;
  private playlist: AudioFile[] = [];
  private currentIndex = 0;

  async init(): Promise<void> {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldDuckAndroid:    false,
    });
  }

  async loadAndPlay(
    verseKey: string,
    chapterId: number,
    playlist: AudioFile[],
    index: number,
  ): Promise<void> {
    const store = useAudioStore.getState();
    store._set({ isLoading: true, error: null });

    await this.unload();

    this.playlist     = playlist;
    this.currentIndex = index;

    const audioFile = playlist[index];
    const primaryUrl = buildEveryAyahUrl(
      ...Object.values(parseVerseKey(verseKey)) as [number, number],
    );
    const fallbackUrl = audioFile?.url ? buildQuranCdnUrl(audioFile.url) : null;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: primaryUrl },
        { shouldPlay: true, rate: store.speed, shouldCorrectPitch: true },
        this.onStatusUpdate.bind(this),
      );
      this.sound = sound;
      store._set({
        isPlaying:        true,
        isLoading:        false,
        currentVerseKey:  verseKey,
        currentChapterId: chapterId,
        playlist,
        currentIndex:     index,
      });
    } catch {
      if (fallbackUrl) {
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: fallbackUrl },
            { shouldPlay: true, rate: store.speed, shouldCorrectPitch: true },
            this.onStatusUpdate.bind(this),
          );
          this.sound = sound;
          store._set({
            isPlaying:        true,
            isLoading:        false,
            currentVerseKey:  verseKey,
            currentChapterId: chapterId,
            playlist,
            currentIndex:     index,
          });
        } catch (err2) {
          store._set({ isLoading: false, isPlaying: false, error: 'Audio unavailable' });
        }
      } else {
        store._set({ isLoading: false, isPlaying: false, error: 'Audio unavailable' });
      }
    }
  }

  private onStatusUpdate(status: AVPlaybackStatus): void {
    if (!status.isLoaded) return;
    const store = useAudioStore.getState();

    if (status.isBuffering) {
      store._set({ isLoading: true });
      return;
    }
    store._set({ isLoading: false });

    if (status.didJustFinish) {
      if (store.repeat) {
        this.sound?.replayAsync();
      } else {
        this.playNext();
      }
    }
  }

  async pause(): Promise<void> {
    await this.sound?.pauseAsync();
    useAudioStore.getState()._set({ isPlaying: false });
  }

  async resume(): Promise<void> {
    await this.sound?.playAsync();
    useAudioStore.getState()._set({ isPlaying: true });
  }

  async playNext(): Promise<void> {
    const store  = useAudioStore.getState();
    const next   = this.currentIndex + 1;
    if (next >= this.playlist.length) {
      await this.stop();
      return;
    }
    const verseKey = store.currentChapterId
      ? `${store.currentChapterId}:${next + 1}`
      : '';
    await this.loadAndPlay(verseKey, store.currentChapterId!, this.playlist, next);
  }

  async playPrev(): Promise<void> {
    const store = useAudioStore.getState();
    const prev  = Math.max(0, this.currentIndex - 1);
    const verseKey = store.currentChapterId
      ? `${store.currentChapterId}:${prev + 1}`
      : '';
    await this.loadAndPlay(verseKey, store.currentChapterId!, this.playlist, prev);
  }

  async setSpeed(rate: number): Promise<void> {
    useAudioStore.getState()._set({ speed: rate });
    await this.sound?.setRateAsync(rate, true);
  }

  async stop(): Promise<void> {
    await this.unload();
    useAudioStore.getState()._set({
      isPlaying: false, currentVerseKey: null, currentChapterId: null,
    });
  }

  private async unload(): Promise<void> {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }
}

export const audioService = new AudioService();
