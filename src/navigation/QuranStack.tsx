import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SurahListScreen } from '@/screens/quran/SurahListScreen';
import { ReaderScreen }    from '@/screens/quran/ReaderScreen';
import { usePreferencesStore } from '@/store';
import { Colors } from '@/design/tokens';
import { FontFamily } from '@/design/typography';
import { QuranStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<QuranStackParamList>();

export function QuranStack() {
  const { darkMode } = usePreferencesStore();
  const dark = darkMode;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: dark ? Colors.darkSurface2 : Colors.parchment,
        },
        headerTintColor:     Colors.accent,
        headerTitleStyle:    { fontFamily: FontFamily.heading, fontSize: 20 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="SurahList"
        component={SurahListScreen}
        options={{ title: 'القرآن الكريم', headerShown: false }}
      />
      <Stack.Screen
        name="Reader"
        component={ReaderScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
