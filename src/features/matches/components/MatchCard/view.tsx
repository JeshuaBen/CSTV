import { Avatar, Box, Text } from '@/shared/components';
import Teams from '@/shared/components/Teams/view';

import { TouchableOpacity } from 'react-native';
import { MatchCardProps } from './types';
import { useMatchCard } from './index';

const MatchCard = (props: MatchCardProps) => {
  const { date, statusLabel, statusClassName, teamA, teamB, league } = useMatchCard(props);

  return (
    <TouchableOpacity className="rounded-2xl bg-cardSurface mb-6">
      <Box align="end">
        <Box bRadius="doubleXL" className={`px-2 py-2 ${statusClassName}`}>
          <Text weight={700} size="xxs" color="primaryWhite">
            {statusLabel === 'In Progress' ? 'AGORA' : date}
          </Text>
        </Box>
      </Box>

      <Box className="border-b-[1px] border-primaryWhite/20 py-[18px]">
        <Teams team1={teamA} team2={teamB} />
      </Box>

      <Box direction="row" align="center" className="gap-2 py-2 px-4">
        <Avatar shape="circle" size={16} source={league.image} />
        <Text size="xxs" color="primaryWhite">
          {league.name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default MatchCard;
