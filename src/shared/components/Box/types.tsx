import { ReactNode } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';

export type BoxDirection = 'row' | 'column';
export type BoxAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type BoxJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type BoxBgColor =
  | 'background'
  | 'primaryWhite'
  | 'foreground'
  | 'muted'
  | 'red'
  | 'gray700'
  | 'gray600'
  | 'gray500'
  | 'cardSurface'
  | 'transparent';
export type BoxRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'doubleXL';
export type BoxSize = number | 'full';

export type BoxProps = Omit<ViewProps, 'children' | 'style'> & {
  children?: ReactNode;
  className?: string;
  direction?: BoxDirection;
  align?: BoxAlign;
  justify?: BoxJustify;
  bgColor?: BoxBgColor;
  bRadius?: BoxRadius;
  width?: BoxSize;
  height?: BoxSize;
  style?: StyleProp<ViewStyle>;
};
