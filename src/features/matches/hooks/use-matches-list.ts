import { useQuery } from '@tanstack/react-query';

import { fetchRunningMatches, fetchUpcomingMatches } from '../../matches/api/get-matches';
import { mapMatchesDtoToCardModels } from '../mappers/match-list-mapper';
import { MatchCardModel, UseMatchesListParams } from '../types/match-list';

const matchStatusPriority: Record<MatchCardModel['status'], number> = {
  running: 0,
  scheduled: 1,
  finished: 2,
};

const toSortTimestamp = (match: MatchCardModel) => {
  const source = match.beginAt ?? match.scheduledAt;

  if (!source) {
    return Number.MAX_SAFE_INTEGER;
  }

  const parsed = Date.parse(source);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
};

const sortMatches = (matches: MatchCardModel[]) =>
  [...matches].sort((left, right) => {
    const statusDiff = matchStatusPriority[left.status] - matchStatusPriority[right.status];
    if (statusDiff !== 0) {
      return statusDiff;
    }

    return toSortTimestamp(left) - toSortTimestamp(right);
  });

const mergeMatchesById = (matches: MatchCardModel[]) => {
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

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export const useMatchesList = (params?: UseMatchesListParams) => {
  const page = params?.page ?? DEFAULT_PAGE;
  const perPage = params?.perPage ?? DEFAULT_PER_PAGE;

  const query = useQuery({
    queryKey: matchesQueryKeys.list(page, perPage),
    queryFn: async ({ signal }) => {
      const [runningMatches, upcomingMatches] = await Promise.all([
        fetchRunningMatches({ page, perPage, signal }),
        fetchUpcomingMatches({ page, perPage, signal }),
      ]);

      const mergedMatches = [...runningMatches, ...upcomingMatches];
      const mappedMatches = mapMatchesDtoToCardModels(mergedMatches);

      return sortMatches(mergeMatchesById(mappedMatches));
    },
    enabled: params?.enabled,
  });

  return {
    ...query,
    matches: query.data ?? [],
    isRefreshing: query.isRefetching && !query.isPending,
    refresh: query.refetch,
  };
};
