import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './BottomTabNavigator';
import { usePreferencesStore } from '@/store';
import { LightTheme, NoorDarkTheme } from '@/design/theme';

export function RootNavigator() {
  const { darkMode } = usePreferencesStore();

  return (
    <NavigationContainer theme={darkMode ? NoorDarkTheme : LightTheme}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
