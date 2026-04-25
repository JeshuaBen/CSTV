export type MatchStatus = 'running' | 'scheduled' | 'finished';

export type PlayerModel = {
  id: number;
  name: string;
  nickname: string;
  imageUrl: string | null;
};

export type OpponentModel = {
  id: number;
  name: string;
  imageUrl: string | null;
  players: PlayerModel[];
};

export type MatchDetailModel = {
  id: number;
  status: MatchStatus;
  statusLabel: string;
  leagueName: string;
  leagueImageUrl: string | null;
  serieName: string | null;
  beginAt: string | null;
  scheduledAt: string | null;
  numberOfGames: number | null;
  opponents: [OpponentModel | null, OpponentModel | null];
};

type Nullable<T> = T | null | undefined;

export type PandaPlayerDto = {
  id?: Nullable<number>;
  name?: Nullable<string>;
  first_name?: Nullable<string>;
  last_name?: Nullable<string>;
  image_url?: Nullable<string>;
};

export type PandaTeamDto = {
  id?: Nullable<number>;
  name?: Nullable<string>;
  image_url?: Nullable<string>;
  players?: Nullable<PandaPlayerDto[]>;
};

export type PandaOpponentEntryDto = {
  opponent?: Nullable<PandaTeamDto>;
};

export type PandaMatchDetailDto = {
  id?: Nullable<number>;
  status?: Nullable<string>;
  begin_at?: Nullable<string>;
  scheduled_at?: Nullable<string>;
  number_of_games?: Nullable<number>;
  league?: Nullable<{
    name?: Nullable<string>;
    image_url?: Nullable<string>;
  }>;
  serie?: Nullable<{
    name?: Nullable<string>;
  }>;
  opponents?: Nullable<PandaOpponentEntryDto[]>;
};
