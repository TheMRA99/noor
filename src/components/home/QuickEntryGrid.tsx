import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BookOpen, BookMarked, Star, Users } from 'lucide-react-native';
import { Colors, Spacing, Radius } from '@/design/tokens';
import { FontFamily } from '@/design/typography';

interface Entry {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

interface Props {
  onPressQuran:     () => void;
  onPressHadith:    () => void;
  onPressStories:   () => void;
  onPressBookmarks: () => void;
  dark?: boolean;
}

export function QuickEntryGrid({
  onPressQuran, onPressHadith, onPressStories, onPressBookmarks, dark = false,
}: Props) {
  const iconColor = Colors.accent;

  const entries: Entry[] = [
    { icon: <BookOpen size={28} color={iconColor} />,   label: 'Quran',     onPress: onPressQuran },
    { icon: <BookMarked size={28} color={iconColor} />, label: 'Hadith',    onPress: onPressHadith },
    { icon: <Users size={28} color={iconColor} />,      label: 'Stories',   onPress: onPressStories },
    { icon: <Star size={28} color={iconColor} />,       label: 'Bookmarks', onPress: onPressBookmarks },
  ];

  return (
    <View style={styles.grid}>
      {entries.map((e) => (
        <TouchableOpacity
          key={e.label}
          style={[styles.tile, dark && styles.tileDark]}
          onPress={e.onPress}
          activeOpacity={0.82}
        >
          {e.icon}
          <Text style={[styles.label, dark && { color: Colors.parchment }]}>
            {e.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection:  'row',
    flexWrap:       'wrap',
    gap:            Spacing.sm,
  },
  tile: {
    width:           '47.5%',
    aspectRatio:     1.4,
    backgroundColor: '#FFFFFF',
    borderRadius:    Radius.lg,
    justifyContent:  'center',
    alignItems:      'center',
    gap:             Spacing.sm,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.05,
    shadowRadius:    4,
    elevation:       1,
    borderWidth:     1,
    borderColor:     Colors.accentMuted,
  },
  tileDark: {
    backgroundColor: Colors.darkSurface2,
    borderColor:     Colors.darkBorder,
    shadowOpacity:   0.3,
  },
  label: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   14,
    color:      Colors.ink,
  },
});
