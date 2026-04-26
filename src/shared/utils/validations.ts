import { Platform } from 'react-native';

export const isMobile = () => {
  return Platform.OS === 'ios' || Platform.OS === 'android';
};
