import { ImageSourcePropType } from 'react-native';

import { MatchStatus } from '../../types/match-list';
import { MatchCardProps } from './types';

const UNKNOWN_TEAM_NAME = 'TBD';
const UNKNOWN_LEAGUE_NAME = 'Unknown League';

const statusClassName: Record<MatchStatus, string> = {
  running: 'bg-red',
  scheduled: 'bg-primaryWhite/20',
  finished: 'bg-gray600',
};

const getTeamImageSource = (imageUrl: string | null): ImageSourcePropType | undefined =>
  imageUrl ? { uri: imageUrl } : undefined;

export const useMatchCard = ({
  date = 'Data indefinida',
  teamA,
  teamB,
  league,
  matchStatus = 'scheduled',
  statusLabel = 'Scheduled',
}: MatchCardProps) => {
  const leagueName = league?.serieName
    ? `${league.name} - ${league.serieName}`
    : (league?.name ?? UNKNOWN_LEAGUE_NAME);

  return {
    date,
    statusLabel,
    statusClassName: statusClassName[matchStatus],
    teamA: {
      name: teamA?.name ?? UNKNOWN_TEAM_NAME,
      image: getTeamImageSource(teamA?.imageUrl ?? null),
    },
    teamB: {
      name: teamB?.name ?? UNKNOWN_TEAM_NAME,
      image: getTeamImageSource(teamB?.imageUrl ?? null),
    },
    league: {
      name: leagueName,
      image: getTeamImageSource(league?.imageUrl ?? null),
    },
  };
};

export type * from './types';
