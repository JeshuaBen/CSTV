import {
  MatchDetailModel,
  OpponentModel,
  PandaMatchDetailDto,
  PandaOpponentEntryDto,
  PandaPlayerDto,
  PandaTournamentRostersDto,
  PlayerModel,
} from '../types/match-details';
import {
  getMatchStatusLabel,
  isNonEmptyString,
  mapApiStatusToMatchStatus,
  toNullableNumber,
  toNullableString,
  toSafeNumber,
} from './helpers';

const UNKNOWN_PLAYER_NAME = 'Unknown Player';
const UNKNOWN_PLAYER_NICKNAME = 'Unknown';
const UNKNOWN_TEAM_NAME = 'TBD';
const UNKNOWN_LEAGUE_NAME = 'Unknown League';

export { getMatchStatusLabel, mapApiStatusToMatchStatus } from './helpers';

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
  imageUrl: toNullableString(player.image_url),
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
    imageUrl: toNullableString(opponent.image_url),
    players: (opponent.players ?? []).map(mapPlayerDtoToModel),
  };
};

const getRosterPlayersByTeamId = (rosters?: PandaTournamentRostersDto | null) => {
  const playersByTeamId = new Map<number, PlayerModel[]>();

  for (const team of rosters?.rosters ?? []) {
    const teamId = toSafeNumber(team.id, -1);

    if (teamId < 0) {
      continue;
    }

    playersByTeamId.set(teamId, (team.players ?? []).map(mapPlayerDtoToModel));
  }

  return playersByTeamId;
};

const mergeOpponentPlayers = (
  opponent: OpponentModel | null,
  playersByTeamId: Map<number, PlayerModel[]>,
) => {
  if (!opponent) {
    return null;
  }

  const rosterPlayers = playersByTeamId.get(opponent.id);

  if (!rosterPlayers?.length) {
    return opponent;
  }

  return {
    ...opponent,
    players: rosterPlayers,
  };
};

export const mapMatchDetailDtoToModel = (
  match: PandaMatchDetailDto,
  rosters?: PandaTournamentRostersDto | null,
): MatchDetailModel => {
  const status = mapApiStatusToMatchStatus(match.status);
  const firstOpponent = mapOpponentDtoToModel(match.opponents?.[0]);
  const secondOpponent = mapOpponentDtoToModel(match.opponents?.[1]);
  const playersByTeamId = getRosterPlayersByTeamId(rosters);

  return {
    id: toSafeNumber(match.id),
    tournamentId: toNullableNumber(match.tournament?.id),
    status,
    statusLabel: getMatchStatusLabel(status),
    leagueName: isNonEmptyString(match.league?.name) ? match.league.name : UNKNOWN_LEAGUE_NAME,
    leagueImageUrl: toNullableString(match.league?.image_url),
    serieName: toNullableString(match.serie?.name),
    beginAt: toNullableString(match.begin_at),
    scheduledAt: toNullableString(match.scheduled_at),
    numberOfGames: toNullableNumber(match.number_of_games),
    opponents: [
      mergeOpponentPlayers(firstOpponent, playersByTeamId),
      mergeOpponentPlayers(secondOpponent, playersByTeamId),
    ],
  };
};
