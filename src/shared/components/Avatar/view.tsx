import { Image } from 'react-native';
import Box from '../Box/view';
import { AvatarProps } from './Models';
import Text from '../Text/view';
import useAvatar from './index';

const Avatar = ({ source, label, size = 60, shape = 'circle' }: AvatarProps) => {
  const { renderBorderRadius, normalizedSize } = useAvatar({ size });

  return (
    <Box align="center" className={`gap-[10px]`}>
      <Box
        width={normalizedSize}
        height={normalizedSize}
        bRadius={renderBorderRadius(shape, source)}
        bgColor={source ? 'transparent' : 'gray500'}
        className="overflow-hidden"
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
