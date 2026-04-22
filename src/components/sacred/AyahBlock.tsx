import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SacredFrame, useSacredContext } from './SacredFrame';
import { sacredTextStyle, TextStyles, FontFamily } from '@/design/typography';
import { Colors, Spacing, FontSize } from '@/design/tokens';
import { toArabicNumeral } from '@/utils/arabicNumerals';

interface Props {
  verseKey:           string;
  arabicText:         string;
  translationText:    string;
  verseNumber:        number;
  isHighlighted?:     boolean;
  fontSizeOffset?:    number;
  dark?:              boolean;
  onLongPress?:       () => void;
  onPressPlay?:       () => void;
}

export const AyahBlock = React.memo(function AyahBlock({
  verseKey,
  arabicText,
  translationText,
  verseNumber,
  isHighlighted = false,
  fontSizeOffset = 0,
  dark = false,
  onLongPress,
  onPressPlay,
}: Props) {
  // Warn in dev if rendered outside SacredFrame
  const inSacred = useSacredContext();
  if (__DEV__ && !inSacred) {
    console.warn(`[AyahBlock] ${verseKey} rendered outside <SacredFrame>. Sacred text rules not enforced.`);
  }

  return (
    <Pressable
      onLongPress={onLongPress}
      accessible={true}
      accessibilityLabel={`Verse ${verseKey}`}
      accessibilityRole="text"
    >
      <View style={[styles.container, isHighlighted && styles.highlighted]}>
        {/* Verse number badge */}
        <View style={styles.verseNumberRow}>
          <View style={[styles.badge, dark && styles.badgeDark]}>
            <Text style={styles.badgeText} allowFontScaling={false}>
              {toArabicNumeral(verseNumber)}
            </Text>
          </View>
          <View style={styles.badgeSeparator} />
        </View>

        {/* Arabic text — NEVER set numberOfLines or ellipsizeMode here */}
        <Text
          style={[sacredTextStyle(fontSizeOffset), dark && { color: Colors.parchment }]}
          allowFontScaling={false}
          selectable={false}
        >
          {arabicText}
        </Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Translation */}
        <Text
          style={[
            TextStyles.body,
            styles.translation,
            dark && { color: Colors.parchment },
          ]}
        >
          {translationText}
        </Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  highlighted: {
    backgroundColor: Colors.highlight,
    borderRadius: 8,
  },
  verseNumberRow: {
    flexDirection:  'row-reverse',
    alignItems:     'center',
    marginBottom:   Spacing.sm,
  },
  badge: {
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: Colors.accent,
    justifyContent:  'center',
    alignItems:      'center',
  },
  badgeDark: {
    backgroundColor: 'rgba(201,169,97,0.85)',
  },
  badgeText: {
    fontFamily:  FontFamily.amiri,
    fontSize:    14,
    color:       '#1A1A1A',
    lineHeight:  20,
  },
  badgeSeparator: {
    flex:            1,
    height:          1,
    backgroundColor: Colors.accentMuted,
    marginHorizontal: Spacing.sm,
  },
  divider: {
    height:          1,
    backgroundColor: Colors.accentMuted,
    marginVertical:  Spacing.sm,
  },
  translation: {
    fontSize:   15,
    lineHeight: 23,
    color:      Colors.ink,
    fontStyle:  'italic',
  },
});
