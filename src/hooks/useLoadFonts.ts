import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

export function useLoadFonts() {
  const [fontsLoaded, fontError] = useFonts({
    'CormorantGaramond-SemiBold': require('../assets/fonts/CormorantGaramond-SemiBold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Variable.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Variable.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-Variable.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Variable.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontError, fontsLoaded]);

  return fontsLoaded || Boolean(fontError);
}
