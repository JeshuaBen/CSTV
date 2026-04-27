import {
  LeagueSummary,
  MatchCardModel,
  MatchStatus,
  PandaMatchDto,
  PandaOpponentEntryDto,
  TeamSummary,
} from '../types/match-list';

const UNKNOWN_TEAM_NAME = 'TBD';
const UNKNOWN_LEAGUE_NAME = 'Unknown League';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const toSafeNumber = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

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

const getLeagueSummary = (match: PandaMatchDto): LeagueSummary => ({
  id: toSafeNumber(match.league?.id),
  name: isNonEmptyString(match.league?.name) ? match.league.name : UNKNOWN_LEAGUE_NAME,
  imageUrl: isNonEmptyString(match.league?.image_url) ? match.league.image_url : null,
  serieName: isNonEmptyString(match.serie?.name) ? match.serie.name : null,
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
    beginAt: isNonEmptyString(match.begin_at) ? match.begin_at : null,
    scheduledAt: isNonEmptyString(match.scheduled_at) ? match.scheduled_at : null,
    numberOfGames:
      typeof match.number_of_games === 'number' && Number.isFinite(match.number_of_games)
        ? match.number_of_games
        : null,
  };
};

export const mapMatchesDtoToCardModels = (matches: PandaMatchDto[]): MatchCardModel[] =>
  matches.map(mapMatchDtoToCardModel);
