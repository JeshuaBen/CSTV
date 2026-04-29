import { Image } from 'react-native';
import Box from '../Box/view';
import { AvatarProps } from './Models';
import { normalize } from '@/shared/utils/normalize';
import Text from '../Text/view';
import useAvatar from './index';

const Avatar = ({ source, label, size = 60, shape = 'circle' }: AvatarProps) => {
  const { renderBorderRadius } = useAvatar();

  const normalizedSize = normalize(size);

  return (
    <Box align="center" className={`gap-[10px]`}>
      <Box
        width={normalizedSize}
        height={normalizedSize}
        bRadius={renderBorderRadius(shape, source)}
        bgColor={source ? 'transparent' : 'gray500'}
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
