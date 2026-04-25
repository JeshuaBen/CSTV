import { useQuery } from '@tanstack/react-query';

import { fetchMatchDetailById } from '../api/get-matches-details';
import { mapMatchDetailDtoToModel } from '../mappers/match-details-mapper';

export const matchDetailQueryKeys = {
  all: ['match-detail'] as const,
  detail: (id: string | number) => ['match-detail', id] as const,
};

export type UseMatchDetailParams = {
  enabled?: boolean;
};

export const useMatchDetail = (id: string | number | undefined, params?: UseMatchDetailParams) => {
  const isEnabled = Boolean(id) && (params?.enabled ?? true);

  const query = useQuery({
    queryKey: matchDetailQueryKeys.detail(id ?? 'unknown'),
    queryFn: async ({ signal }) => {
      if (!id) {
        return null;
      }

      const response = await fetchMatchDetailById(id, { signal });
      return mapMatchDetailDtoToModel(response);
    },
    enabled: isEnabled,
  });

  return {
    ...query,
    match: query.data ?? null,
    isRefreshing: query.isRefetching && !query.isPending,
    refresh: query.refetch,
  };
};
