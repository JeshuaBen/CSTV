import { ImageSourcePropType } from 'react-native';

const useAvatar = () => {
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

  return { renderBorderRadius };
};

export default useAvatar;
