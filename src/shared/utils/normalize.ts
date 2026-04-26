import { Dimensions, Platform, PixelRatio } from 'react-native';

import { isMobile } from './validations';

export const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SCREEN_WIDTH = isMobile() ? width : 375;

const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 667;

export const normalize = (size: number, based: 'width' | 'height' = 'width') => {
  const newSize = based === 'height' ? size * hscale : size * wscale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }

  return size;
};
