import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { useQuranChapters }  from '@/hooks/useQuranChapters';
import { usePreferencesStore } from '@/store';
import { SkeletonRow }       from '@/components/ui/SkeletonRow';
import { toArabicNumeral }   from '@/utils/arabicNumerals';
import { Colors, Spacing, FontSize, Radius } from '@/design/tokens';
import { FontFamily } from '@/design/typography';
import { Chapter } from '@/types/quran';
import { QuranStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<QuranStackParamList, 'SurahList'>;

export function SurahListScreen() {
  const navigation = useNavigation<Nav>();
  const { chapters, isLoading } = useQuranChapters();
  const { darkMode } = usePreferencesStore();
  const dark = darkMode;
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return chapters;
    const q = query.toLowerCase();
    return chapters.filter(
      (c) =>
        c.name_simple.toLowerCase().includes(q) ||
        c.translated_name.name.toLowerCase().includes(q) ||
        String(c.id).includes(q),
    );
  }, [chapters, query]);

  const bg   = dark ? Colors.darkSurface : Colors.parchment;
  const text = dark ? Colors.parchment   : Colors.ink;

  function openReader(chapter: Chapter) {
    navigation.navigate('Reader', {
      chapterId:        chapter.id,
      chapterNameSimple: chapter.name_simple,
      chapterNameArabic: chapter.name_arabic,
    });
  }

  function renderItem({ item }: { item: Chapter }) {
    return (
      <TouchableOpacity
        style={[styles.row, dark && styles.rowDark]}
        onPress={() => openReader(item)}
        activeOpacity={0.75}
      >
        {/* Chapter number */}
        <View style={styles.numBadge}>
          <Text style={styles.numText} allowFontScaling={false}>
            {toArabicNumeral(item.id)}
          </Text>
        </View>

        {/* Names */}
        <View style={styles.names}>
          <Text style={[styles.nameSimple, { color: text }]}>{item.name_simple}</Text>
          <Text style={[styles.meaning, { color: Colors.inkMuted }]}>
            {item.translated_name.name} · {item.verses_count} verses
          </Text>
        </View>

        {/* Arabic name + badge */}
        <View style={styles.right}>
          <Text
            style={[styles.nameArabic, { color: text }]}
            allowFontScaling={false}
          >
            {item.name_arabic}
          </Text>
          <View style={[
            styles.badge,
            item.revelation_place === 'makkah' ? styles.badgeMakkah : styles.badgeMadinah,
          ]}>
            <Text style={styles.badgeText}>
              {item.revelation_place === 'makkah' ? 'Makki' : 'Madani'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={bg} />

      {/* Search bar */}
      <View style={[styles.searchWrap, dark && styles.searchWrapDark]}>
        <Search size={16} color={Colors.inkMuted} />
        <TextInput
          style={[styles.searchInput, { color: text }]}
          placeholder="Search surahs…"
          placeholderTextColor={Colors.inkMuted}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
      </View>

      {isLoading ? (
        <FlatList
          data={Array(10).fill(null)}
          keyExtractor={(_, i) => String(i)}
          renderItem={() => <SkeletonRow />}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(c) => String(c.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={[styles.sep, dark && styles.sepDark]} />
          )}
          contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1 },
  searchWrap: {
    flexDirection:   'row',
    alignItems:      'center',
    margin:          Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(15,76,58,0.06)',
    borderRadius:    Radius.full,
    gap:             Spacing.sm,
  },
  searchWrapDark: { backgroundColor: Colors.darkSurface2 },
  searchInput:    { flex: 1, fontFamily: FontFamily.body, fontSize: 15 },
  row: {
    flexDirection:   'row',
    alignItems:      'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap:             Spacing.md,
  },
  rowDark:   {},
  numBadge:  {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
  },
  numText:    { fontFamily: FontFamily.amiri, fontSize: 14, color: Colors.ink },
  names:      { flex: 1 },
  nameSimple: { fontFamily: FontFamily.bodyMed, fontSize: 15 },
  meaning:    { fontFamily: FontFamily.body, fontSize: 12, marginTop: 2 },
  right:      { alignItems: 'flex-end', gap: 4 },
  nameArabic: {
    fontFamily: FontFamily.amiri, fontSize: FontSize.arabicUI,
    writingDirection: 'rtl', textAlign: 'right',
  },
  badge:        {
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  badgeMakkah:  { backgroundColor: 'rgba(184,92,58,0.15)' },
  badgeMadinah: { backgroundColor: 'rgba(15,76,58,0.15)'  },
  badgeText:    { fontFamily: FontFamily.body, fontSize: 10, color: Colors.inkMuted },
  sep:          { height: 1, backgroundColor: 'rgba(15,76,58,0.08)', marginHorizontal: Spacing.md },
  sepDark:      { backgroundColor: Colors.darkBorder },
});
