import { useCallback, useMemo } from 'react';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { fetchRunningMatches, fetchUpcomingMatches } from '../../matches/api/get-matches';
import { mapMatchesDtoToCardModels } from '../mappers/match-list-mapper';
import { MatchesListPage, UseMatchesListParams } from '../types/match-list';
import { matchesQueryKeys, mergeMatchesById, sortMatches } from '../helpers/match-list-helper';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export { formatMatchDate, matchesQueryKeys } from '../helpers/match-list-helper';

export const useMatchesList = (params?: UseMatchesListParams) => {
  const page = params?.page ?? DEFAULT_PAGE;
  const perPage = params?.perPage ?? DEFAULT_PER_PAGE;
  const isEnabled = params?.enabled ?? true;

  const query = useInfiniteQuery<
    MatchesListPage,
    Error,
    InfiniteData<MatchesListPage, number>,
    ReturnType<typeof matchesQueryKeys.list>,
    number
  >({
    queryKey: matchesQueryKeys.list(page, perPage),
    initialPageParam: page,
    queryFn: async ({ pageParam, signal }) => {
      const [runningMatches, upcomingMatches] = await Promise.all([
        fetchRunningMatches({ page: pageParam, perPage, signal }),
        fetchUpcomingMatches({ page: pageParam, perPage, signal }),
      ]);

      const mergedMatches = [...runningMatches, ...upcomingMatches];
      const mappedMatches = mapMatchesDtoToCardModels(mergedMatches);

      return {
        page: pageParam,
        matches: mappedMatches,
        hasNextPage: runningMatches.length >= perPage || upcomingMatches.length >= perPage,
      };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) {
        return undefined;
      }

      return lastPage.page + 1;
    },
    enabled: params?.enabled,
  });

  const matches = useMemo(() => {
    const pageMatches = query.data?.pages.flatMap((queryPage) => queryPage.matches) ?? [];

    return sortMatches(mergeMatchesById(pageMatches));
  }, [query.data]);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = query;

  const loadMore = useCallback(() => {
    if (!isEnabled || !hasNextPage || isFetchingNextPage || isPending) {
      return;
    }

    return fetchNextPage();
  }, [fetchNextPage, hasNextPage, isEnabled, isFetchingNextPage, isPending]);

  return {
    ...query,
    matches,
    loadMore,
    isRefreshing: query.isRefetching && !query.isPending && !query.isFetchingNextPage,
    refresh: query.refetch,
  };
};
