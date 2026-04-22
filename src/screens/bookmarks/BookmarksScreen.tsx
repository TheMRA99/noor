import React from 'react';
import {
  FlatList, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Star, Trash2 } from 'lucide-react-native';
import { useBookmarksStore, usePreferencesStore } from '@/store';
import { Colors, Spacing, Radius } from '@/design/tokens';
import { FontFamily } from '@/design/typography';
import { Bookmark } from '@/types/bookmarks';

export function BookmarksScreen() {
  const navigation = useNavigation<any>();
  const { bookmarks, removeBookmark } = useBookmarksStore();
  const { darkMode } = usePreferencesStore();
  const dark = darkMode;
  const bg   = dark ? Colors.darkSurface : Colors.parchment;
  const text = dark ? Colors.parchment   : Colors.ink;

  function openVerse(b: Bookmark) {
    navigation.navigate('QuranTab', {
      screen: 'Reader',
      params: {
        chapterId:         b.chapterId,
        chapterNameSimple: b.surahNameSimple,
        chapterNameArabic: b.surahNameArabic,
        initialAyah:       b.verseNumber,
      },
    });
  }

  function renderItem({ item: b }: { item: Bookmark }) {
    return (
      <TouchableOpacity
        style={[styles.card, dark && styles.cardDark]}
        onPress={() => openVerse(b)}
        activeOpacity={0.8}
      >
        {/* Arabic preview — 2 lines max height, no text ellipsis */}
        <View style={styles.arabicWrap}>
          <Text
            style={styles.arabicPreview}
            allowFontScaling={false}
            numberOfLines={2}
          >
            {b.arabicText}
          </Text>
        </View>

        <View style={styles.meta}>
          <View>
            <Text style={[styles.surahName, { color: text }]}>{b.surahNameSimple}</Text>
            <Text style={[styles.ref, { color: Colors.inkMuted }]}>{b.verseKey}</Text>
          </View>
          <TouchableOpacity onPress={() => removeBookmark(b.verseKey)} hitSlop={12}>
            <Trash2 size={16} color={Colors.inkMuted} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <FlatList
        data={bookmarks}
        keyExtractor={(b) => b.verseKey}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          !bookmarks.length && styles.listEmpty,
        ]}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Star size={48} color={Colors.accentMuted} />
            <Text style={[styles.emptyText, { color: Colors.inkMuted }]}>
              No bookmarks yet.{'\n'}Long-press any verse to save it.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:  { flex: 1 },
  list:  { padding: Spacing.md, gap: Spacing.md, paddingBottom: Spacing.xxxl },
  listEmpty: { flex: 1 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.lg,
    overflow:        'hidden',
    borderWidth:     1,
    borderColor:     Colors.accentMuted,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.05,
    shadowRadius:    4,
    elevation:       1,
  },
  cardDark: {
    backgroundColor: Colors.darkSurface2,
    borderColor:     Colors.darkBorder,
  },
  arabicWrap: {
    backgroundColor: Colors.accentFaint,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    padding:         Spacing.md,
    minHeight:       64,
    justifyContent:  'center',
  },
  arabicPreview: {
    fontFamily:       'KFGQPCUthmanicScriptHAFS',
    fontSize:         22,
    lineHeight:       38,
    writingDirection: 'rtl',
    textAlign:        'right',
    color:            Colors.ink,
    allowFontScaling: false,
  } as any,
  meta: {
    flexDirection:   'row',
    justifyContent:  'space-between',
    alignItems:      'center',
    padding:         Spacing.md,
  },
  surahName: { fontFamily: FontFamily.bodyMed, fontSize: 14 },
  ref:       { fontFamily: FontFamily.body,    fontSize: 12, marginTop: 2 },
  empty: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    gap: Spacing.md,
  },
  emptyText: {
    fontFamily: FontFamily.body, fontSize: 15,
    textAlign: 'center', lineHeight: 24,
  },
});
