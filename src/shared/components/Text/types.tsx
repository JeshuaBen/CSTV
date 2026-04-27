import { ReactNode } from 'react';
import { StyleProp, TextProps as RNTextProps, TextStyle } from 'react-native';

export type TextSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'title'
  | 'body'
  | 'caption'
  | 'description';
export type TextWeight = 400 | 500 | 600 | 700;
export type TextColor =
  | 'background'
  | 'primaryWhite'
  | 'foreground'
  | 'muted'
  | 'red'
  | 'gray700'
  | 'gray600'
  | 'gray500'
  | 'cardSurface';
export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export type TextProps = Omit<RNTextProps, 'children' | 'style'> & {
  children: ReactNode;
  className?: string;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  transform?: TextTransform;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  style?: StyleProp<TextStyle>;
};
