import { MatchCardModel } from '../types/match-list';

export const matchStatusPriority: Record<MatchCardModel['status'], number> = {
  running: 0,
  scheduled: 1,
  finished: 2,
};

export const toSortTimestamp = (match: MatchCardModel) => {
  const source = match.beginAt ?? match.scheduledAt;

  if (!source) {
    return Number.MAX_SAFE_INTEGER;
  }

  const parsed = Date.parse(source);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
};

export const sortMatches = (matches: MatchCardModel[]) =>
  [...matches].sort((left, right) => {
    const statusDiff = matchStatusPriority[left.status] - matchStatusPriority[right.status];
    if (statusDiff !== 0) {
      return statusDiff;
    }

    return toSortTimestamp(left) - toSortTimestamp(right);
  });

export const mergeMatchesById = (matches: MatchCardModel[]) => {
  const uniqueMatches = new Map<number, MatchCardModel>();

  for (const match of matches) {
    uniqueMatches.set(match.id, match);
  }

  return Array.from(uniqueMatches.values());
};

export const matchesQueryKeys = {
  all: ['matches'] as const,
  list: (page: number, perPage: number) => ['matches', 'list', page, perPage] as const,
};

export const formatMatchDate = (match: Pick<MatchCardModel, 'beginAt' | 'scheduledAt'>) => {
  const source = match.beginAt ?? match.scheduledAt;

  if (!source) {
    return 'Data indefinida';
  }

  const date = new Date(source);

  if (Number.isNaN(date.getTime())) {
    return 'Data indefinida';
  }

  const today = new Date();
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isToday) {
    const time = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);

    return `Hoje, ${time}`;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
