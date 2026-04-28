import { useCallback, useEffect, useState } from 'react';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native';

import '../global.css';

import '@/config/reactotron';
import { queryClient } from '@/shared/lib/react-query/query-client';
import { colors } from '@/shared/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const MINIMUM_SPLASH_DURATION_MS = 1500;

export default function RootLayout() {
  const [minimumSplashTimeDone, setMinimumSplashTimeDone] = useState(false);
  const [rootLayoutReady, setRootLayoutReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Roboto_700Bold,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumSplashTimeDone(true);
    }, MINIMUM_SPLASH_DURATION_MS);

    return () => clearTimeout(timeout);
  }, []);

  const handleRootLayout = useCallback(() => {
    setRootLayoutReady(true);
  }, []);

  useEffect(() => {
    if (fontsLoaded && minimumSplashTimeDone && rootLayoutReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, minimumSplashTimeDone, rootLayoutReady]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} onLayout={handleRootLayout}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.background }}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
              statusBarStyle: 'light',
            }}
          />
        </QueryClientProvider>
      </SafeAreaProvider>
    </View>
  );
}
