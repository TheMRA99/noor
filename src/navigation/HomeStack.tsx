import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen }      from '@/screens/home/HomeScreen';
import { BookmarksScreen } from '@/screens/bookmarks/BookmarksScreen';
import { usePreferencesStore } from '@/store';
import { Colors } from '@/design/tokens';
import { FontFamily } from '@/design/typography';
import { HomeStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  const { darkMode } = usePreferencesStore();
  const dark = darkMode;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: dark ? Colors.darkSurface2 : Colors.parchment,
        },
        headerTintColor:      Colors.accent,
        headerTitleStyle:     { fontFamily: FontFamily.heading, fontSize: 20 },
        headerShadowVisible:  false,
      }}
    >
      <Stack.Screen name="Home"      component={HomeScreen}      options={{ headerShown: false }} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{ title: 'Bookmarks' }} />
    </Stack.Navigator>
  );
}
