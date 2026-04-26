import { Text as RNText } from 'react-native';

import { TextProps } from './Models';
import {
  textAlignClass,
  textColorClass,
  textSizeClass,
  textTransformClass,
  textWeightClass,
} from './tokens';

const Text = ({
  children,
  className,
  size = 'body',
  weight = 400,
  color = 'foreground',
  align,
  transform,
  italic,
  underline,
  strike,
  style,
  ...props
}: TextProps) => {
  const textClassName = [
    textSizeClass[size],
    textWeightClass[weight],
    textColorClass[color],
    align && textAlignClass[align],
    transform && textTransformClass[transform],
    italic && 'italic',
    underline && 'underline',
    strike && 'line-through',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <RNText className={textClassName} style={style} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
