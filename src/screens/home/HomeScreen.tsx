import React from 'react';
import {
  ScrollView, View, Text, StyleSheet, StatusBar, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Moon, Sun } from 'lucide-react-native';
import { DailyVerseCard }      from '@/components/home/DailyVerseCard';
import { ContinueReadingCard } from '@/components/home/ContinueReadingCard';
import { QuickEntryGrid }      from '@/components/home/QuickEntryGrid';
import { usePreferencesStore } from '@/store';
import { Colors, Spacing } from '@/design/tokens';
import { FontFamily } from '@/design/typography';
import { HomeStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const rootNav    = useNavigation<any>();
  const { darkMode, toggleDarkMode } = usePreferencesStore();
  const dark = darkMode;

  const bg = dark ? Colors.darkSurface : Colors.parchment;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top']}>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={bg}
      />
      <ScrollView
        style={{ backgroundColor: bg }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, dark && { color: Colors.parchment }]}>
              السلام عليكم
            </Text>
            <Text style={[styles.appName, dark && { color: Colors.parchment }]}>
              Noor
            </Text>
          </View>
          <TouchableOpacity onPress={toggleDarkMode} hitSlop={12}>
            {dark
              ? <Sun  size={22} color={Colors.accent} />
              : <Moon size={22} color={Colors.base}   />
            }
          </TouchableOpacity>
        </View>

        <DailyVerseCard dark={dark} />

        <ContinueReadingCard
          dark={dark}
          onPress={(chapterId, ayah) =>
            rootNav.navigate('QuranTab', {
              screen: 'Reader',
              params: { chapterId, chapterNameSimple: '', chapterNameArabic: '', initialAyah: ayah },
            })
          }
        />

        <Text style={[styles.sectionTitle, dark && { color: Colors.parchment }]}>
          Explore
        </Text>

        <QuickEntryGrid
          dark={dark}
          onPressQuran     ={() => rootNav.navigate('QuranTab')}
          onPressHadith    ={() => rootNav.navigate('HadithTab')}
          onPressStories   ={() => rootNav.navigate('StoriesTab')}
          onPressBookmarks ={() => navigation.navigate('Bookmarks')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1 },
  content: { padding: Spacing.md, gap: Spacing.md, paddingBottom: Spacing.xxxl },
  header: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    paddingVertical: Spacing.sm,
  },
  greeting: {
    fontFamily: FontFamily.amiri,
    fontSize:   16,
    color:      Colors.base,
  },
  appName: {
    fontFamily: FontFamily.heading,
    fontSize:   28,
    color:      Colors.ink,
    lineHeight: 34,
  },
  sectionTitle: {
    fontFamily: FontFamily.bodyMed,
    fontSize:   11,
    color:      Colors.inkMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop:  Spacing.sm,
  },
});
