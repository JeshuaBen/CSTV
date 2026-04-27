import { notifyManager } from '@tanstack/react-query';
import { act, cleanup } from '@testing-library/react-native';

notifyManager.setNotifyFunction((callback) => {
  act(callback);
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock('@shopify/flash-list', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');

  return {
    FlashList: ({ data = [], renderItem, keyExtractor, ListEmptyComponent, ...props }: any) => {
      if (!data.length && ListEmptyComponent) {
        return React.createElement(
          View,
          { ...props, testID: props.testID ?? 'flash-list' },
          ListEmptyComponent,
        );
      }

      return React.createElement(
        View,
        { ...props, testID: props.testID ?? 'flash-list' },
        data.map((item: unknown, index: number) =>
          React.createElement(
            View,
            { key: keyExtractor ? keyExtractor(item, index) : index },
            renderItem({ item, index }),
          ),
        ),
      );
    },
  };
});

jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require('react-native');

  return {
    Feather: ({ name }: { name: string }) => React.createElement(Text, null, name),
  };
});
