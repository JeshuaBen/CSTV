import { Image } from 'react-native';
import Box from '../Box/view';
import { AvatarProps } from './Models';
import { normalize } from '@/shared/utils/normalize';
import Text from '../Text/view';

const Avatar = ({ source, label, size = 60, shape = 'circle' }: AvatarProps) => {
  return (
    <Box align="center" className={`gap-[10px]`}>
      <Box
        width={normalize(size)}
        height={normalize(size)}
        bRadius={shape === 'circle' ? 'full' : 'lg'}
        bgColor={source ? 'transparent' : 'gray500'}
      >
        {source && (
          <Image
            source={source}
            style={{
              width: normalize(size),
              height: normalize(size),
            }}
          />
        )}
      </Box>
      {label && (
        <Box>
          <Text color="primaryWhite" weight={400} size="xs">
            {label}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Avatar;
