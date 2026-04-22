import React from 'react';
import {
  View, Text, TouchableOpacity, Share, StyleSheet, Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Bookmark, BookmarkCheck, Copy, Share2 } from 'lucide-react-native';
import { useBookmark } from '@/hooks/useBookmark';
import { Colors, Spacing } from '@/design/tokens';
import { TextStyles, FontFamily } from '@/design/typography';
import { Bookmark as BookmarkType } from '@/types/bookmarks';

interface Props {
  verseKey:        string;
  arabicText:      string;
  translationText: string;
  surahNameArabic: string;
  surahNameSimple: string;
  verseNumber:     number;
  chapterId:       number;
  dark?:           boolean;
}

export function AyahActionBar({
  verseKey, arabicText, translationText,
  surahNameArabic, surahNameSimple, verseNumber, chapterId, dark = false,
}: Props) {
  const { isBookmarked, toggle } = useBookmark(verseKey);

  function handleBookmark() {
    const data: Omit<BookmarkType, 'savedAt'> = {
      verseKey, arabicText, translationText,
      surahNameArabic, surahNameSimple, verseNumber, chapterId,
    };
    toggle(data);
  }

  async function handleCopy() {
    await Clipboard.setStringAsync(
      `${arabicText}\n\n${translationText}\n\n— ${surahNameSimple} ${verseKey}`,
    );
  }

  async function handleShare() {
    await Share.share({
      message: `${arabicText}\n\n${translationText}\n\n— ${surahNameSimple} (${verseKey})`,
    });
  }

  const iconColor = dark ? Colors.parchment : Colors.ink;
  const accentColor = Colors.accent;

  return (
    <View style={[styles.bar, dark && styles.barDark]}>
      <ActionButton
        icon={
          isBookmarked
            ? <BookmarkCheck size={20} color={accentColor} />
            : <Bookmark size={20} color={iconColor} />
        }
        label={isBookmarked ? 'Saved' : 'Bookmark'}
        onPress={handleBookmark}
        dark={dark}
      />
      <ActionButton
        icon={<Copy size={20} color={iconColor} />}
        label="Copy"
        onPress={handleCopy}
        dark={dark}
      />
      <ActionButton
        icon={<Share2 size={20} color={iconColor} />}
        label="Share"
        onPress={handleShare}
        dark={dark}
      />
    </View>
  );
}

function ActionButton({
  icon, label, onPress, dark,
}: { icon: React.ReactNode; label: string; onPress: () => void; dark: boolean }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7}>
      {icon}
      <Text style={[styles.btnLabel, dark && { color: Colors.parchment }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection:   'row',
    justifyContent:  'space-around',
    alignItems:      'center',
    paddingVertical: Spacing.sm,
    borderTopWidth:  1,
    borderTopColor:  Colors.accentMuted,
    backgroundColor: Colors.accentFaint,
  },
  barDark: {
    backgroundColor: 'rgba(201,169,97,0.04)',
    borderTopColor:  'rgba(201,169,97,0.15)',
  },
  btn: {
    alignItems:    'center',
    gap:           4,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  btnLabel: {
    fontFamily: FontFamily.body,
    fontSize:   11,
    color:      Colors.inkMuted,
  },
});
