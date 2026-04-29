import { normalize } from '@/shared/utils/normalize';
import { ImageSourcePropType } from 'react-native';
import { useAvatarProps } from './Models';

const useAvatar = ({ size = 60 }: useAvatarProps) => {
  const renderBorderRadius = (
    shape: 'circle' | 'square',
    source: ImageSourcePropType | undefined,
  ) => {
    if (shape === 'circle') {
      if (source) {
        return 'none';
      }
      return 'full';
    }

    return 'lg';
  };

  const normalizedSize = normalize(size);

  return { renderBorderRadius, normalizedSize };
};

export default useAvatar;
