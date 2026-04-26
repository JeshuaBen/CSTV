import { View } from 'react-native';

import { BoxProps } from './Models';

const Box = ({ children, className }: BoxProps) => {
  return <View className={className}>{children}</View>;
};

export default Box;
