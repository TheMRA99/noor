import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SkipBack, SkipForward, Play, Pause, Repeat, X } from 'lucide-react-native';
import { useAudioStore } from '@/store';
import { audioService } from '@/services/audio/AudioService';
import { SpeedPicker } from './SpeedPicker';
import { Colors, Spacing } from '@/design/tokens';
import { FontFamily } from '@/design/typography';

export const AUDIO_BAR_HEIGHT = 90;

export function AudioBar() {
  const insets     = useSafeAreaInsets();
  const { isPlaying, isLoading, currentVerseKey, repeat, speed, _set } = useAudioStore();

  if (!currentVerseKey) return null;

  const [surah, ayah] = currentVerseKey.split(':');

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + Spacing.xs }]}>
      {/* Verse label */}
      <View style={styles.labelRow}>
        <Text style={styles.verseLabel} numberOfLines={1}>
          Ayah {surah}:{ayah}
        </Text>
        <TouchableOpacity onPress={() => audioService.stop()} hitSlop={8}>
          <X size={16} color={Colors.parchment} />
        </TouchableOpacity>
      </View>

      {/* Controls row */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => audioService.playPrev()} hitSlop={8}>
          <SkipBack size={22} color={Colors.parchment} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => isPlaying ? audioService.pause() : audioService.resume()}
          hitSlop={8}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.ink} />
          ) : isPlaying ? (
            <Pause size={20} color={Colors.ink} fill={Colors.ink} />
          ) : (
            <Play size={20} color={Colors.ink} fill={Colors.ink} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => audioService.playNext()} hitSlop={8}>
          <SkipForward size={22} color={Colors.parchment} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => _set({ repeat: !repeat })} hitSlop={8}>
          <Repeat size={18} color={repeat ? Colors.accent : 'rgba(245,240,225,0.4)'} />
        </TouchableOpacity>

        <SpeedPicker
          current={speed}
          onSelect={(s) => audioService.setSpeed(s)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position:        'absolute',
    bottom:          0,
    left:            0,
    right:           0,
    backgroundColor: Colors.darkSurface2,
    paddingTop:      Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderTopWidth:  1,
    borderTopColor:  Colors.darkBorder,
    zIndex:          100,
  },
  labelRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:   Spacing.xs,
  },
  verseLabel: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   13,
    color:      Colors.parchment,
    opacity:    0.8,
  },
  controls: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing.md,
  },
  playBtn: {
    width:           40,
    height:          40,
    borderRadius:    20,
    backgroundColor: Colors.accent,
    justifyContent:  'center',
    alignItems:      'center',
  },
});
