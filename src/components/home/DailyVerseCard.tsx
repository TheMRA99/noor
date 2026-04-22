import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SacredFrame } from '@/components/sacred/SacredFrame';
import { AyahBlock } from '@/components/sacred/AyahBlock';
import { NoorCard } from '@/components/ui/NoorCard';
import { getVerseOfTheDay } from '@/services/api/verses';
import { usePreferencesStore } from '@/store';
import { Colors, Spacing, FontSize } from '@/design/tokens';
import { FontFamily } from '@/design/typography';
import { Verse } from '@/types/quran';

function getDayIndex(): number {
  const start = new Date('2024-01-01').getTime();
  return Math.floor((Date.now() - start) / 86400000);
}

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DailyVerseCard({ dark = false }: { dark?: boolean }) {
  const navigation = useNavigation<any>();
  const { dailyVerse, setDailyVerse } = usePreferencesStore();
  const [verse, setVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const today = todayISODate();

    if (dailyVerse && dailyVerse.date === today) {
      setIsLoading(false);
      return;
    }

    getVerseOfTheDay(getDayIndex())
      .then((v) => {
        const translation = v.translations[0]?.text ?? '';
        setDailyVerse({
          date: today,
          verseKey: v.verse_key,
          arabicText: v.text_uthmani,
          translationText: translation,
        });
        setVerse(v);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const cached = dailyVerse?.date === todayISODate() ? dailyVerse : null;

  if (isLoading) {
    return (
      <NoorCard dark={dark} style={styles.card}>
        <ActivityIndicator color={Colors.accent} />
      </NoorCard>
    );
  }

  const arabicText      = cached?.arabicText      ?? verse?.text_uthmani ?? '';
  const translationText = cached?.translationText ?? verse?.translations[0]?.text ?? '';
  const verseKey        = cached?.verseKey        ?? verse?.verse_key ?? '1:1';
  const [surahId, ayahNum] = verseKey.split(':').map(Number);

  if (!arabicText) return null;

  return (
    <NoorCard dark={dark} style={styles.card}>
      <Text style={[styles.label, dark && { color: Colors.parchment }]}>
        Verse of the Day
      </Text>
      <SacredFrame dark={dark}>
        <AyahBlock
          verseKey={verseKey}
          arabicText={arabicText}
          translationText={translationText}
          verseNumber={ayahNum}
          dark={dark}
          onLongPress={() => {}}
        />
      </SacredFrame>
      <TouchableOpacity
        style={styles.readMore}
        onPress={() =>
          navigation.navigate('QuranTab', {
            screen: 'Reader',
            params: {
              chapterId: surahId,
              chapterNameSimple: '',
              chapterNameArabic: '',
              initialAyah: ayahNum,
            },
          })
        }
      >
        <Text style={styles.readMoreText}>Read in context →</Text>
      </TouchableOpacity>
    </NoorCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.md,
  },
  label: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   FontSize.caption,
    color:      Colors.inkMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  readMore: {
    alignSelf: 'flex-end',
  },
  readMoreText: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   13,
    color:      Colors.accent,
  },
});
