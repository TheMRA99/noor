import './global.css';
import React from 'react';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '@/navigation/RootNavigator';
import { useFontsLoaded } from '@/hooks/useFontsLoaded';

// The app UI is LTR. Arabic RTL is applied per-component, not globally.
if (I18nManager.isRTL) {
  I18nManager.forceRTL(false);
}

export default function App() {
  const fontsLoaded = useFontsLoaded();

  if (!fontsLoaded) {
    return null; // Splash screen stays visible until fonts are ready
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
