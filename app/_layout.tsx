import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';

import '@/config/reactotron';
import { queryClient } from '@/shared/lib/react-query/query-client';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0f172a' },
        }}
      />
    </QueryClientProvider>
  );
}
