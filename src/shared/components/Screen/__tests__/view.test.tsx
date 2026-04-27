import { renderWithProviders } from '@/test/test-utils';
import { Text } from 'react-native';

import Screen from '../view';

jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    SafeAreaProvider: ({ children }: { children: unknown }) => <View>{children}</View>,
    SafeAreaView: ({ children, edges, ...props }: { children: unknown; edges?: string[] }) => (
      <View {...props} testID={edges ? `safe-area-${edges.join('-')}` : undefined}>
        {children}
      </View>
    ),
  };
});

describe('Screen', () => {
  it('renders children inside the base screen container', () => {
    const { getByText, UNSAFE_getByProps } = renderWithProviders(
      <Screen className="px-4">
        <Text>Screen content</Text>
      </Screen>,
    );

    expect(getByText('Screen content')).toBeTruthy();
    expect(UNSAFE_getByProps({ className: 'flex-1 bg-background px-4' })).toBeTruthy();
  });

  it('uses only base classes when no className is provided', () => {
    const { getByText, UNSAFE_getByProps } = renderWithProviders(
      <Screen>
        <Text>Plain screen</Text>
      </Screen>,
    );

    expect(getByText('Plain screen')).toBeTruthy();
    expect(UNSAFE_getByProps({ className: 'flex-1 bg-background' })).toBeTruthy();
  });

  it('applies safe area to the top and bottom edges', () => {
    const { getByTestId } = renderWithProviders(
      <Screen>
        <Text>Safe content</Text>
      </Screen>,
    );

    expect(getByTestId('safe-area-top-bottom')).toBeTruthy();
  });
});
