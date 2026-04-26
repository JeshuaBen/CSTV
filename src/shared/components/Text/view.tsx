import { Text as RNText } from 'react-native';

import { TextProps } from './Models';

const Text = ({ children, className }: TextProps) => {
  return <RNText className={className}>{children}</RNText>;
};

export default Text;
