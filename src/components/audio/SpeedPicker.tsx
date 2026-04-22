import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/design/tokens';
import { FontFamily } from '@/design/typography';

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

interface Props {
  current: number;
  onSelect: (speed: 0.75 | 1 | 1.25 | 1.5) => void;
}

export function SpeedPicker({ current, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {SPEEDS.map((s) => (
        <TouchableOpacity
          key={s}
          style={[styles.chip, current === s && styles.chipActive]}
          onPress={() => onSelect(s)}
          activeOpacity={0.7}
        >
          <Text style={[styles.label, current === s && styles.labelActive]}>
            {s}×
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical:   4,
    borderRadius:      12,
    borderWidth:       1,
    borderColor:       'rgba(201,169,97,0.4)',
  },
  chipActive: {
    backgroundColor: Colors.accent,
    borderColor:     Colors.accent,
  },
  label: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   12,
    color:      Colors.parchment,
  },
  labelActive: {
    color: Colors.ink,
  },
});
