import { FlashList } from '@shopify/flash-list';

import { hasPandaScoreToken } from '@/config/env';
import { Box, Screen, Text } from '@/shared/components/';

import MatchCard from '../components/MatchCard/view';
import { useMatchesList } from '../hooks/use-matches-list';
import { MatchCardModel } from '../types/match-list';

const UNKNOWN_TEAM_NAME = 'TBD';

const formatMatchDate = (match: MatchCardModel) => {
  const source = match.beginAt ?? match.scheduledAt;

  if (!source) {
    return 'Data indefinida';
  }

  const date = new Date(source);

  if (Number.isNaN(date.getTime())) {
    return 'Data indefinida';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const renderMatchCard = ({ item }: { item: MatchCardModel }) => {
  const [teamA, teamB] = item.opponents;

  return (
    <MatchCard
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

        <FlashList
          data={matches}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderMatchCard}
          refreshing={isRefreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
          className="mt-6"
          ListEmptyComponent={
            <Box align="center" className="mt-10">
              <Text color="primaryWhite" align="center">
                {isLoadingMatches
                  ? 'Carregando partidas...'
                  : isError
                    ? 'Não foi possível carregar as partidas.'
                    : 'Nenhuma partida encontrada.'}
              </Text>
            </Box>
          }
        />
      </Box>
    </Screen>
  );
}
