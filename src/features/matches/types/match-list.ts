export type MatchStatus = 'running' | 'scheduled' | 'finished';

export type TeamSummary = {
  id: number;
  name: string;
  imageUrl: string | null;
};

export type LeagueSummary = {
  id: number;
  name: string;
  imageUrl: string | null;
  serieName: string | null;
};

export type UseMatchesListParams = {
  page?: number;
  perPage?: number;
  enabled?: boolean;
};

export type MatchCardModel = {
  id: number;
  status: MatchStatus;
  statusLabel: string;
  league: LeagueSummary;
  opponents: [TeamSummary | null, TeamSummary | null];
  beginAt: string | null;
  scheduledAt: string | null;
  numberOfGames: number | null;
};

type Nullable<T> = T | null | undefined;

export type PandaLeagueDto = {
  id?: Nullable<number>;
  name?: Nullable<string>;
  image_url?: Nullable<string>;
};

export type PandaSerieDto = {
  name?: Nullable<string>;
};

export type PandaTeamDto = {
  id?: Nullable<number>;
  name?: Nullable<string>;
  image_url?: Nullable<string>;
};

export type PandaOpponentEntryDto = {
  opponent?: Nullable<PandaTeamDto>;
};

export type PandaMatchDto = {
  id?: Nullable<number>;
  status?: Nullable<string>;
  begin_at?: Nullable<string>;
  scheduled_at?: Nullable<string>;
  number_of_games?: Nullable<number>;
  league?: Nullable<PandaLeagueDto>;
  serie?: Nullable<PandaSerieDto>;
  opponents?: Nullable<PandaOpponentEntryDto[]>;
};
