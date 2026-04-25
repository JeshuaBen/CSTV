import {
  MatchDetailModel,
  MatchStatus,
  OpponentModel,
  PandaMatchDetailDto,
  PandaOpponentEntryDto,
  PandaPlayerDto,
  PlayerModel,
} from '../types/match-details';

const UNKNOWN_PLAYER_NAME = 'Unknown Player';
const UNKNOWN_PLAYER_NICKNAME = 'Unknown';
const UNKNOWN_TEAM_NAME = 'TBD';
const UNKNOWN_LEAGUE_NAME = 'Unknown League';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const toSafeNumber = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

export const mapApiStatusToMatchStatus = (apiStatus: string | null | undefined): MatchStatus => {
  if (!apiStatus) {
    return 'scheduled';
  }

  const status = apiStatus.toLowerCase();

  if (['running', 'live'].includes(status)) {
    return 'running';
  }

  if (['finished', 'canceled', 'cancelled', 'postponed'].includes(status)) {
    return 'finished';
  }

  return 'scheduled';
};

export const getMatchStatusLabel = (status: MatchStatus) => {
  if (status === 'running') {
    return 'In Progress';
  }

  if (status === 'finished') {
    return 'Ended';
  }

  return 'Scheduled';
};

const getPlayerName = (player: PandaPlayerDto) => {
  if (isNonEmptyString(player.name)) {
    return player.name;
  }

  const firstName = isNonEmptyString(player.first_name) ? player.first_name : '';
  const lastName = isNonEmptyString(player.last_name) ? player.last_name : '';
  const fullName = `${firstName} ${lastName}`.trim();

  return fullName || UNKNOWN_PLAYER_NAME;
};

const mapPlayerDtoToModel = (player: PandaPlayerDto): PlayerModel => ({
  id: toSafeNumber(player.id),
  name: getPlayerName(player),
  nickname: isNonEmptyString(player.name) ? player.name : UNKNOWN_PLAYER_NICKNAME,
  imageUrl: isNonEmptyString(player.image_url) ? player.image_url : null,
});

const mapOpponentDtoToModel = (
  opponentEntry: PandaOpponentEntryDto | null | undefined,
): OpponentModel | null => {
  const opponent = opponentEntry?.opponent;

  if (!opponent) {
    return null;
  }

  return {
    id: toSafeNumber(opponent.id),
    name: isNonEmptyString(opponent.name) ? opponent.name : UNKNOWN_TEAM_NAME,
    imageUrl: isNonEmptyString(opponent.image_url) ? opponent.image_url : null,
    players: (opponent.players ?? []).map(mapPlayerDtoToModel),
  };
};

export const mapMatchDetailDtoToModel = (match: PandaMatchDetailDto): MatchDetailModel => {
  const status = mapApiStatusToMatchStatus(match.status);
  const firstOpponent = mapOpponentDtoToModel(match.opponents?.[0]);
  const secondOpponent = mapOpponentDtoToModel(match.opponents?.[1]);

  return {
    id: toSafeNumber(match.id),
    status,
    statusLabel: getMatchStatusLabel(status),
    leagueName: isNonEmptyString(match.league?.name) ? match.league.name : UNKNOWN_LEAGUE_NAME,
    leagueImageUrl: isNonEmptyString(match.league?.image_url) ? match.league.image_url : null,
    serieName: isNonEmptyString(match.serie?.name) ? match.serie.name : null,
    beginAt: isNonEmptyString(match.begin_at) ? match.begin_at : null,
    scheduledAt: isNonEmptyString(match.scheduled_at) ? match.scheduled_at : null,
    numberOfGames:
      typeof match.number_of_games === 'number' && Number.isFinite(match.number_of_games)
        ? match.number_of_games
        : null,
    opponents: [firstOpponent, secondOpponent],
  };
};
