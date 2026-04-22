import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  FlatList, View, Text, StyleSheet, StatusBar,
  TouchableOpacity, Modal, Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Settings2, Minus, Plus } from 'lucide-react-native';
import { SacredFrame }   from '@/components/sacred/SacredFrame';
import { AyahBlock }     from '@/components/sacred/AyahBlock';
import { BismillahHeader } from '@/components/sacred/BismillahHeader';
import { AyahActionBar } from '@/components/sacred/AyahActionBar';
import { AudioBar, AUDIO_BAR_HEIGHT } from '@/components/audio/AudioBar';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SkeletonRow }   from '@/components/ui/SkeletonRow';
import { useVerses }     from '@/hooks/useVerses';
import { useAudioStore, useReaderStore, usePreferencesStore } from '@/store';
import { audioService }  from '@/services/audio/AudioService';
import { Colors, Spacing } from '@/design/tokens';
import { FontFamily }    from '@/design/typography';
import { Verse }         from '@/types/quran';
import { QuranStackParamList } from '@/types/navigation';
import { buildEveryAyahUrl } from '@/utils/audioUrl';

type ReaderRoute = RouteProp<QuranStackParamList, 'Reader'>;

export function ReaderScreen() {
  const route     = useRoute<ReaderRoute>();
  const insets    = useSafeAreaInsets();
  const { chapterId, chapterNameSimple, chapterNameArabic, initialAyah } = route.params;

  const { darkMode }                      = usePreferencesStore();
  const { fontSizeOffset, setLastPosition, setFontSizeOffset } = useReaderStore();
  const { currentVerseKey }               = useAudioStore();
  const dark = darkMode;

  const { verses, isLoading, hasMore, fetchNextPage } = useVerses(chapterId);
  const [activeActionKey, setActiveActionKey] = useState<string | null>(null);
  const [showSizeModal, setShowSizeModal]     = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const bg   = dark ? Colors.darkSurface  : Colors.parchment;
  const text = dark ? Colors.parchment    : Colors.ink;

  // Auto-scroll to highlighted ayah when audio advances
  useEffect(() => {
    if (!currentVerseKey) return;
    const [, ayah] = currentVerseKey.split(':').map(Number);
    const idx = ayah - 1;
    if (idx >= 0 && idx < verses.length) {
      flatListRef.current?.scrollToIndex({ index: idx, animated: true, viewPosition: 0.3 });
    }
  }, [currentVerseKey]);

  // Track last position on scroll
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (!viewableItems.length) return;
      const first = viewableItems[0].item as Verse;
      setLastPosition({
        chapterId,
        chapterNameSimple: chapterNameSimple || '',
        chapterNameArabic: chapterNameArabic || '',
        ayahNumber: first.verse_number,
      });
    },
    [chapterId, chapterNameSimple, chapterNameArabic],
  );

  function buildPlaylist() {
    return verses.map((v) => ({
      url: buildEveryAyahUrl(chapterId, v.verse_number),
    }));
  }

  function renderItem({ item, index }: { item: Verse; index: number }) {
    const isHighlighted = currentVerseKey === item.verse_key;
    const isActionOpen  = activeActionKey === item.verse_key;
    const translation   = item.translations[0]?.text ?? '';

    return (
      <View>
        <SacredFrame dark={dark}>
          <AyahBlock
            verseKey={item.verse_key}
            arabicText={item.text_uthmani}
            translationText={translation}
            verseNumber={item.verse_number}
            isHighlighted={isHighlighted}
            fontSizeOffset={fontSizeOffset}
            dark={dark}
            onLongPress={() =>
              setActiveActionKey((k) => k === item.verse_key ? null : item.verse_key)
            }
            onPressPlay={() =>
              audioService.loadAndPlay(
                item.verse_key,
                chapterId,
                buildPlaylist(),
                index,
              )
            }
          />
        </SacredFrame>

        {isActionOpen && (
          <AyahActionBar
            verseKey={item.verse_key}
            arabicText={item.text_uthmani}
            translationText={translation}
            surahNameArabic={chapterNameArabic}
            surahNameSimple={chapterNameSimple}
            verseNumber={item.verse_number}
            chapterId={chapterId}
            dark={dark}
          />
        )}
      </View>
    );
  }

  const audioBarOffset = currentVerseKey ? AUDIO_BAR_HEIGHT + insets.bottom : 0;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={bg} />

      {/* Header */}
      <View style={[styles.header, dark && styles.headerDark]}>
        <View>
          <Text style={[styles.surahSimple, { color: text }]}>{chapterNameSimple}</Text>
          <Text style={[styles.surahArabic, { color: text }]} allowFontScaling={false}>
            {chapterNameArabic}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowSizeModal(true)} hitSlop={12}>
          <Settings2 size={20} color={Colors.accent} />
        </TouchableOpacity>
      </View>

      <ErrorBoundary>
        {isLoading && !verses.length ? (
          <FlatList
            data={Array(6).fill(null)}
            keyExtractor={(_, i) => String(i)}
            renderItem={() => <SkeletonRow />}
          />
        ) : (
          <FlatList
            ref={flatListRef}
            data={verses}
            keyExtractor={(v) => v.verse_key}
            renderItem={renderItem}
            ListHeaderComponent={<BismillahHeader chapterId={chapterId} dark={dark} />}
            onEndReached={() => hasMore && fetchNextPage()}
            onEndReachedThreshold={0.2}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            windowSize={5}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            contentContainerStyle={{
              padding:      Spacing.md,
              gap:          Spacing.md,
              paddingBottom: Spacing.xxxl + audioBarOffset,
            }}
            onScrollToIndexFailed={() => {}}
          />
        )}
      </ErrorBoundary>

      <AudioBar />

      {/* Font size modal */}
      <Modal
        visible={showSizeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSizeModal(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setShowSizeModal(false)}>
          <View style={[styles.modalCard, dark && styles.modalCardDark]}>
            <Text style={[styles.modalTitle, { color: text }]}>Font Size</Text>
            <View style={styles.sizeRow}>
              <TouchableOpacity
                style={styles.sizeBtn}
                onPress={() => setFontSizeOffset(fontSizeOffset - 2)}
              >
                <Minus size={18} color={Colors.accent} />
              </TouchableOpacity>
              <Text style={[styles.sizeValue, { color: text }]}>
                {28 + fontSizeOffset}px
              </Text>
              <TouchableOpacity
                style={styles.sizeBtn}
                onPress={() => setFontSizeOffset(fontSizeOffset + 2)}
              >
                <Plus size={18} color={Colors.accent} />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1 },
  header: {
    flexDirection:    'row',
    justifyContent:   'space-between',
    alignItems:       'center',
    paddingHorizontal: Spacing.md,
    paddingVertical:  Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accentMuted,
  },
  headerDark: { borderBottomColor: Colors.darkBorder },
  surahSimple: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   15,
  },
  surahArabic: {
    fontFamily: FontFamily.amiri,
    fontSize:   18,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  modalBackdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalCard: {
    backgroundColor: Colors.parchment,
    borderRadius: 16,
    padding: Spacing.xl,
    width: 220,
    alignItems: 'center',
    gap: Spacing.md,
  },
  modalCardDark: { backgroundColor: Colors.darkSurface2 },
  modalTitle: { fontFamily: FontFamily.heading, fontSize: 20 },
  sizeRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.lg,
  },
  sizeBtn: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1, borderColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
  },
  sizeValue: { fontFamily: FontFamily.bodyMed, fontSize: 18, minWidth: 60, textAlign: 'center' },
});
