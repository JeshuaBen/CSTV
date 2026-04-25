import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';

import '../global.css';

import '@/config/reactotron';
import { queryClient } from '@/shared/lib/react-query/query-client';
import { colors } from '@/shared/theme';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </QueryClientProvider>
  );
}
