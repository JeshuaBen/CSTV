import type { ReactNode } from 'react';
import { createElement } from 'react';
import { Text as RNText, View } from 'react-native';



type ScreenProps = {
  children: ReactNode;
  className?: string;
};

type TextProps = {
  children: ReactNode;
  className?: string;
};

export function Screen({ children, className }: ScreenProps) {
  return createElement(
    View,
    { className: `flex-1 bg-background px-6 ${className ?? ''}`.trim() },
    children,
  );
}

export function Text({ children, className }: TextProps) {
  return createElement(RNText, { className }, children);
}
