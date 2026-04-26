import { Image } from 'react-native';
import Box from '../Box/view';
import { AvatarProps } from './Models';
import { normalize } from '@/shared/utils/normalize';
import Text from '../Text/view';

const Avatar = ({ source, label, size = 60, shape = 'circle' }: AvatarProps) => {
  const normalizedSize = normalize(size);
  const borderRadius = shape === 'circle' ? normalizedSize / 2 : 8;

  return (
    <Box align="center" className={`gap-[10px]`}>
      <Box
        width={normalizedSize}
        height={normalizedSize}
        bRadius={shape === 'circle' ? 'full' : 'lg'}
        bgColor={source ? 'transparent' : 'gray500'}
        style={{
          borderRadius,
          overflow: 'hidden',
        }}
      >
        {source && (
          <Image
            source={source}
            style={{
              width: normalizedSize,
              height: normalizedSize,
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
