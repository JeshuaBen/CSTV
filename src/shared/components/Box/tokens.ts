export const directionClass = {
  row: 'flex-row',
  column: 'flex-col',
} as const;

export const alignClass = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

export const justifyClass = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export const bgColorClass = {
  background: 'bg-background',
  primaryWhite: 'bg-primaryWhite',
  foreground: 'bg-foreground',
  muted: 'bg-muted',
  red: 'bg-red',
  gray700: 'bg-gray700',
  gray600: 'bg-gray600',
  gray500: 'bg-gray500',
  cardSurface: 'bg-cardSurface',
  transparent: 'bg-transparent',
} as const;

export const bRadiusClass = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
  doubleXL: 'rounded-tr-2xl rounded-bl-2xl',
} as const;
