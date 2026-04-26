import { LeagueSummary, MatchStatus } from '../../types/match-list';

export type MatchCardProps = {
  date?: string;
  teamA?: {
    name: string;
    imageUrl: string | null;
  };
  teamB?: {
    name: string;
    imageUrl: string | null;
  };
  league?: LeagueSummary;
  matchStatus?: MatchStatus;
  statusLabel?: string;
};
