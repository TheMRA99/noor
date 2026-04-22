import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export function useFontsLoaded(): boolean {
  const [loaded, error] = useFonts({
    KFGQPCUthmanicScriptHAFS: require('../../assets/fonts/KFGQPCUthmanicScriptHAFS.ttf'),
    Amiri_400Regular:          require('../../assets/fonts/Amiri-Regular.ttf'),
    CormorantGaramond_600SemiBold: require('../../assets/fonts/CormorantGaramond-SemiBold.ttf'),
    Inter_400Regular:          require('../../assets/fonts/Inter-Regular.ttf'),
    Inter_500Medium:           require('../../assets/fonts/Inter-Medium.ttf'),
    Inter_600SemiBold:         require('../../assets/fonts/Inter-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return loaded;
}
