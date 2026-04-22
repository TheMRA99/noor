import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { NoorCard } from '@/components/ui/NoorCard';
import { useReaderStore } from '@/store';
import { Colors, Spacing } from '@/design/tokens';
import { FontFamily } from '@/design/typography';

interface Props {
  onPress: (chapterId: number, ayah: number) => void;
  dark?: boolean;
}

export function ContinueReadingCard({ onPress, dark = false }: Props) {
  const { lastPosition } = useReaderStore();

  if (!lastPosition) {
    return (
      <NoorCard dark={dark} style={styles.card}>
        <View style={styles.row}>
          <BookOpen size={20} color={Colors.accent} />
          <Text style={[styles.prompt, dark && { color: Colors.parchment }]}>
            Start your reading journey
          </Text>
        </View>
      </NoorCard>
    );
  }

  return (
    <NoorCard
      dark={dark}
      style={styles.card}
      onPress={() => onPress(lastPosition.chapterId, lastPosition.ayahNumber)}
    >
      <Text style={[styles.label, dark && { color: Colors.parchment }]}>
        Continue Reading
      </Text>
      <View style={styles.row}>
        <BookOpen size={20} color={Colors.accent} />
        <View style={styles.info}>
          <Text style={[styles.surahName, dark && { color: Colors.parchment }]}>
            {lastPosition.chapterNameSimple}
          </Text>
          <Text style={[styles.ayahRef, dark && { color: Colors.parchment }]}>
            Ayah {lastPosition.chapterId}:{lastPosition.ayahNumber}
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
    </NoorCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: Spacing.sm },
  label: {
    fontFamily:    FontFamily.bodyMed,
    fontSize:      11,
    color:         Colors.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.sm,
  },
  info:     { flex: 1 },
  prompt:   { fontFamily: FontFamily.body, fontSize: 15, color: Colors.ink },
  surahName:{
    fontFamily: FontFamily.bodyMed,
    fontSize:   16,
    color:      Colors.ink,
  },
  ayahRef:  { fontFamily: FontFamily.body, fontSize: 13, color: Colors.inkMuted },
  arrow:    { fontFamily: FontFamily.body, fontSize: 20, color: Colors.accent },
});
