import { ImageSourcePropType } from 'react-native';

import { Avatar, Box, Text } from '@/shared/components';

import { PlayerCardProps } from './types';

const UNKNOWN_PLAYER_NICKNAME = 'Nickname';
const UNKNOWN_PLAYER_NAME = 'Nome Jogador';

const getPlayerImageSource = (imageUrl: string | null): ImageSourcePropType | undefined =>
  imageUrl ? { uri: imageUrl } : undefined;

const PlayerCard = ({ player, side = 'left' }: PlayerCardProps) => {
  const image = getPlayerImageSource(player?.imageUrl ?? null);

  return (
    <Box
      direction="row"
      bgColor="cardSurface"
      align={side === 'left' ? 'end' : 'start'}
      justify={side === 'left' ? 'end' : 'start'}
      className={`px-2 ${side === 'left' ? 'rounded-tr-[12px]' : 'rounded-tl-[12px]'} ${side === 'left' ? 'rounded-br-[12px]' : 'rounded-bl-[12px]'} w-[50%]`}
    >
      <Box direction="row" align="end" className="gap-4">
        {side === 'right' && (
          <Box className="relative top-[-6]">
            <Avatar shape="square" size={48} source={image} />
          </Box>
        )}
        <Box>
          <Text
            size="description"
            weight={700}
            color="primaryWhite"
            align={side === 'left' ? 'right' : 'left'}
            numberOfLines={1}
          >
            {player?.nickname ?? UNKNOWN_PLAYER_NICKNAME}
          </Text>
          <Text
            size="xs"
            weight={400}
            color="gray600"
            align={side === 'left' ? 'right' : 'left'}
            numberOfLines={1}
          >
            {player?.name ?? UNKNOWN_PLAYER_NAME}
          </Text>
        </Box>
        {side === 'left' && (
          <Box className="relative top-[-6]">
            <Avatar shape="square" size={48} source={image} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PlayerCard;
