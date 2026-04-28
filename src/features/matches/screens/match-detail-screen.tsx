import { router, useLocalSearchParams } from 'expo-router';

import { hasPandaScoreToken } from '@/config/env';
import { Screen, Text, Box, Teams } from '@/shared/components';
import { colors } from '@/shared/theme';
import { Feather } from '@expo/vector-icons';

import PlayerCard from '../components/PlayerCard';
import { formatMatchDate } from '../hooks/use-matches-list';
import {
  getLineupRows,
  getTeamViewModel,
  getTitle,
  parseLeagueSummary,
  useMatchDetail,
} from '../hooks/use-matches-details';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

const MatchDetailScreen = () => {
  const { id, league } = useLocalSearchParams<{ id: string; league?: string }>();
  const leagueSummary = parseLeagueSummary(league);
  const { isError, isPending, match } = useMatchDetail(id, {
    enabled: hasPandaScoreToken,
  });
  const [opponent1, opponent2] = match?.opponents ?? [null, null];
  const team1 = getTeamViewModel(opponent1);
  const team2 = getTeamViewModel(opponent2);
  const title = getTitle(leagueSummary);
  const date = match ? formatMatchDate(match) : 'Data indefinida';
  const lineupRows = getLineupRows(match?.opponents);

  return (
    <Screen className="py-6">
      <Box className="flex-1">
        <Box direction="row" align="center" className="px-6">
          <TouchableOpacity onPress={() => router.back()} className="w-[10%]">
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text
            weight={500}
            color="primaryWhite"
            size="lg"
            className="flex-1"
            align="center"
            numberOfLines={1}
          >
            {title}
          </Text>
        </Box>

        {isPending && (
          <Box align="center" justify="center" className="flex-1">
            <ActivityIndicator size={44} color={colors.primaryWhite} />
          </Box>
        )}

        {!isPending && !isError && (
          <>
            <Box className="mt-6">
              <Teams team1={team1} team2={team2} />
            </Box>

            <Box className="mt-5" align="center">
              <Text weight={500} color="primaryWhite" size="sm">
                {date}
              </Text>
            </Box>
          </>
        )}

        {isError && (
          <Box align="center" justify="center" className="flex-1">
            <Text color="primaryWhite" align="center" className="mt-8">
              Não foi possível carregar os detalhes da partida.
            </Text>
          </Box>
        )}

        {!isPending && !isError && (
          <Box className="mt-6 gap-[16px]">
            {lineupRows.map((row, index) => (
              <Box key={row.id} direction="row" align="center" className="gap-[12px]">
                <PlayerCard side="left" player={row.leftPlayer} />
                <PlayerCard side="right" player={row.rightPlayer} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Screen>
  );
};

export default MatchDetailScreen;
