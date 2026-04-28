import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

type ProvidersProps = PropsWithChildren<{
  queryClient?: QueryClient;
}>;

export const TestProviders = ({
  children,
  queryClient = createTestQueryClient(),
}: ProvidersProps) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { x: 0, y: 0, width: 390, height: 844 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    }}
  >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </SafeAreaProvider>
);

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions & { queryClient?: QueryClient },
) => {
  const queryClient = options?.queryClient ?? createTestQueryClient();

  return render(ui, {
    ...options,
    wrapper: ({ children }) => <TestProviders queryClient={queryClient}>{children}</TestProviders>,
  });
};

export const renderHookWithProviders = <Result, Props>(
  callback: (props: Props) => Result,
  options?: RenderHookOptions<Props> & { queryClient?: QueryClient },
) => {
  const queryClient = options?.queryClient ?? createTestQueryClient();

  return renderHook(callback, {
    ...options,
    wrapper: ({ children }) => <TestProviders queryClient={queryClient}>{children}</TestProviders>,
  });
};
