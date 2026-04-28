import {
  LeagueSummary,
  MatchCardModel,
  PandaMatchDto,
  PandaOpponentEntryDto,
  TeamSummary,
} from '../types/match-list';
import {
  getMatchStatusLabel,
  isNonEmptyString,
  mapApiStatusToMatchStatus,
  toNullableNumber,
  toNullableString,
  toSafeNumber,
} from './helpers';

const UNKNOWN_TEAM_NAME = 'TBD';
const UNKNOWN_LEAGUE_NAME = 'Unknown League';

const getTeamSummary = (entry: PandaOpponentEntryDto | null | undefined): TeamSummary | null => {
  const team = entry?.opponent;

  if (!team) {
    return null;
  }

  return {
    id: toSafeNumber(team.id),
    name: isNonEmptyString(team.name) ? team.name : UNKNOWN_TEAM_NAME,
    imageUrl: isNonEmptyString(team.image_url) ? team.image_url : null,
  };
};

export { getMatchStatusLabel, mapApiStatusToMatchStatus } from './helpers';

const getLeagueSummary = (match: PandaMatchDto): LeagueSummary => ({
  id: toSafeNumber(match.league?.id),
  name: isNonEmptyString(match.league?.name) ? match.league.name : UNKNOWN_LEAGUE_NAME,
  imageUrl: toNullableString(match.league?.image_url),
  serieName: toNullableString(match.serie?.name),
});

export const mapMatchDtoToCardModel = (match: PandaMatchDto): MatchCardModel => {
  const status = mapApiStatusToMatchStatus(match.status);
  const firstOpponent = getTeamSummary(match.opponents?.[0]);
  const secondOpponent = getTeamSummary(match.opponents?.[1]);

  return {
    id: toSafeNumber(match.id),
    status,
    statusLabel: getMatchStatusLabel(status),
    league: getLeagueSummary(match),
    opponents: [firstOpponent, secondOpponent],
    beginAt: toNullableString(match.begin_at),
    scheduledAt: toNullableString(match.scheduled_at),
    numberOfGames: toNullableNumber(match.number_of_games),
  };
};

export const mapMatchesDtoToCardModels = (matches: PandaMatchDto[]): MatchCardModel[] =>
  matches.map(mapMatchDtoToCardModel);
