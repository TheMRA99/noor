import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users } from 'lucide-react-native';
import { usePreferencesStore } from '@/store';
import { Colors, Spacing } from '@/design/tokens';
import { FontFamily } from '@/design/typography';

export function StoriesPlaceholderScreen() {
  const { darkMode } = usePreferencesStore();
  const bg   = darkMode ? Colors.darkSurface : Colors.parchment;
  const text = darkMode ? Colors.parchment   : Colors.ink;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <View style={styles.center}>
        <Users size={48} color={Colors.accent} />
        <Text style={[styles.title, { color: text }]}>Stories</Text>
        <Text style={[styles.sub, { color: Colors.inkMuted }]}>
          Coming in Phase 4 — Prophets, Seerah & Companions
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md, padding: Spacing.xl },
  title:  { fontFamily: FontFamily.heading, fontSize: 28, color: Colors.ink },
  sub:    { fontFamily: FontFamily.body, fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
