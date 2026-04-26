export const textSizeClass = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  title: 'text-title',
  body: 'text-body',
  caption: 'text-caption',
} as const;

export const textWeightClass = {
  400: 'font-roboto-400',
  500: 'font-roboto-500',
  600: 'font-roboto-600',
  700: 'font-roboto-700',
} as const;

export const textColorClass = {
  background: 'text-background',
  primaryWhite: 'text-primaryWhite',
  foreground: 'text-foreground',
  muted: 'text-muted',
  red: 'text-red',
  gray700: 'text-gray700',
  gray600: 'text-gray600',
  gray500: 'text-gray500',
  cardSurface: 'text-cardSurface',
} as const;

export const textAlignClass = {
  auto: 'text-auto',
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
  justify: 'text-justify',
} as const;

export const textTransformClass = {
  none: 'normal-case',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
} as const;
