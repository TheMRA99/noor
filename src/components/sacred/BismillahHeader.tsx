import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { sacredTextStyle } from '@/design/typography';
import { Colors, Spacing } from '@/design/tokens';

// Not displayed for Surah At-Tawbah (9)
const BISMILLAH_ARABIC = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

interface Props {
  chapterId: number;
  dark?: boolean;
}

export function BismillahHeader({ chapterId, dark = false }: Props) {
  if (chapterId === 9) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.line, dark && styles.lineDark]} />
      <Text
        style={[
          sacredTextStyle(0),
          styles.text,
          dark && { color: Colors.parchment },
        ]}
        allowFontScaling={false}
        selectable={false}
        accessibilityLabel="Bismillah ir-Rahman ir-Raheem"
      >
        {BISMILLAH_ARABIC}
      </Text>
      <View style={[styles.line, dark && styles.lineDark]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:    'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  line: {
    width:           120,
    height:          1,
    backgroundColor: Colors.accent,
    marginVertical:  Spacing.sm,
  },
  lineDark: {
    backgroundColor: 'rgba(201,169,97,0.6)',
  },
  text: {
    textAlign:  'center',
    fontSize:   30,
    lineHeight: 52,
  },
});
