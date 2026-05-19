import { endpoints } from '@/features/matches/api/endpoints';
import { httpClient, withAbortSignal } from '@/services/http/client';

import { getPaginationParams } from '../helpers/api-helper';
import { GetMatchesParams, PandaMatchDto } from '../types/match-list';

export type { GetMatchesParams } from '../types/match-list';

export const fetchRunningMatches = async (params?: GetMatchesParams): Promise<PandaMatchDto[]> => {
  const response = await httpClient.get<PandaMatchDto[]>(endpoints.runningMatches, {
    ...withAbortSignal(params?.signal),
    params: getPaginationParams(params),
  });

  return response.data;
};

export const fetchUpcomingMatches = async (params?: GetMatchesParams): Promise<PandaMatchDto[]> => {
  const response = await httpClient.get<PandaMatchDto[]>(endpoints.upcomingMatches, {
    ...withAbortSignal(params?.signal),
    params: getPaginationParams(params),
  });

  return response.data;
};
