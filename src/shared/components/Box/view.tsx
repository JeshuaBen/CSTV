import { View, ViewStyle } from 'react-native';

import { BoxProps } from './Models';
import { alignClass, bgColorClass, bRadiusClass, directionClass, justifyClass } from './tokens';

const Box = ({
  children,
  className,
  direction,
  align,
  justify,
  bgColor,
  bRadius,
  width,
  height,
  style,
  ...props
}: BoxProps) => {
  const boxClassName = [
    direction && directionClass[direction],
    align && alignClass[align],
    justify && justifyClass[justify],
    bgColor && bgColorClass[bgColor],
    bRadius && bRadiusClass[bRadius],
    width === 'full' && 'w-full',
    height === 'full' && 'h-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sizeStyle: ViewStyle = {
    ...(typeof width === 'number' ? { width } : {}),
    ...(typeof height === 'number' ? { height } : {}),
  };

  return (
    <View className={boxClassName} style={[style, sizeStyle]} {...props}>
      {children}
    </View>
  );
};

export default Box;
