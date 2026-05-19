import { ImageSourcePropType } from 'react-native';
import { OpponentModel } from '../types/match-details';
import { LeagueSummary } from '../types/match-list';

const LINEUP_SIZE = 5;
const UNKNOWN_TEAM_NAME = 'TBD';

export const matchDetailQueryKeys = {
  all: ['match-detail'] as const,
  detail: (id: string | number) => ['match-detail', id] as const,
};

export const parseLeagueSummary = (league?: string) => {
  if (!league) {
    return undefined;
  }

  try {
    return JSON.parse(league) as LeagueSummary;
  } catch {
    return undefined;
  }
};

export const getTitle = (leagueSummary: LeagueSummary | undefined) => {
  if (leagueSummary?.name && leagueSummary?.serieName) {
    return `${leagueSummary.name} - ${leagueSummary.serieName}`;
  }

  return leagueSummary?.name ?? 'Detalhes da Partida';
};

export const getLineupRows = (
  opponents: [OpponentModel | null, OpponentModel | null] | undefined,
) => {
  const [leftOpponent, rightOpponent] = opponents ?? [null, null];

  return Array.from({ length: LINEUP_SIZE }, (_, index) => ({
    id: `lineup-row-${index}`,
    leftPlayer: leftOpponent?.players[index] ?? null,
    rightPlayer: rightOpponent?.players[index] ?? null,
  }));
};

export const getTeamImageSource = (imageUrl: string | null): ImageSourcePropType | undefined =>
  imageUrl ? { uri: imageUrl } : undefined;

export const getTeamViewModel = (opponent: OpponentModel | null) => ({
  name: opponent?.name ?? UNKNOWN_TEAM_NAME,
  image: getTeamImageSource(opponent?.imageUrl ?? null),
});
