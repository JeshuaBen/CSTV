import { useQuery } from '@tanstack/react-query';

import { isRequestCanceledError } from '@/services/http/client';

import { fetchMatchDetailById, fetchTournamentRostersById } from '../api/get-matches-details';
import { mapMatchDetailDtoToModel } from '../mappers/match-details-mapper';
import { matchDetailQueryKeys } from '../helpers/match-details-helper';

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

      const matchResponse = await fetchMatchDetailById(id, { signal });
      const tournamentId = matchResponse.tournament?.id;

      if (!tournamentId) {
        return mapMatchDetailDtoToModel(matchResponse);
      }

      try {
        const rostersResponse = await fetchTournamentRostersById(tournamentId, { signal });
        return mapMatchDetailDtoToModel(matchResponse, rostersResponse);
      } catch (error) {
        if (isRequestCanceledError(error)) {
          throw error;
        }

        return mapMatchDetailDtoToModel(matchResponse);
      }
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
