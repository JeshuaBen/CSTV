import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import { hasPandaScoreToken } from '@/config/env';
import { Box, Screen, Text } from '@/shared/components/';
import { colors } from '@/shared/theme';

import MatchCard from '../components/MatchCard/view';
import { formatMatchDate, useMatchesList } from '../hooks/use-matches-list';
import { MatchCardModel } from '../types/match-list';

const UNKNOWN_TEAM_NAME = 'TBD';

const renderMatchCard = ({ item }: { item: MatchCardModel }) => {
  const [teamA, teamB] = item.opponents;

  return (
    <MatchCard
      onPress={() =>
        router.push({
          pathname: '/match/[id]',
          params: {
            id: item.id,
            league: JSON.stringify(item.league),
          },
        })
      }
      date={formatMatchDate(item)}
      teamA={{
        name: teamA?.name ?? UNKNOWN_TEAM_NAME,
        imageUrl: teamA?.imageUrl ?? null,
      }}
      teamB={{
        name: teamB?.name ?? UNKNOWN_TEAM_NAME,
        imageUrl: teamB?.imageUrl ?? null,
      }}
      league={item.league}
      matchStatus={item.status}
      statusLabel={item.statusLabel}
    />
  );
};

export function MatchesScreen() {
  const { matches, isPending, isError, isRefreshing, refresh } = useMatchesList({
    enabled: hasPandaScoreToken,
  });
  const isLoadingMatches = hasPandaScoreToken && isPending;

  return (
    <Screen className="px-6 py-6">
      <Box className="flex-1">
        <Text weight={500} color="primaryWhite" size="title">
          Partidas
        </Text>

        {isLoadingMatches && (
          <Box align="center" justify="center" className="flex-1">
            <ActivityIndicator size={44} color={colors.primaryWhite} />
          </Box>
        )}

        <FlashList
          data={matches}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderMatchCard}
          refreshing={isRefreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
          className="mt-6"
          ListEmptyComponent={
            <Text color="primaryWhite" align="center">
              {isError && 'Não foi possível carregar as partidas.'}
            </Text>
          }
        />
      </Box>
    </Screen>
  );
}
