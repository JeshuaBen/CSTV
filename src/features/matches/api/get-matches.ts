import { endpoints } from '@/features/matches/api/endpoints';
import { httpClient, withAbortSignal } from '@/services/http/client';

import { PandaMatchDto } from '../types/match-list';

export type GetMatchesParams = {
  page?: number;
  perPage?: number;
  signal?: AbortSignal;
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

const getPaginationParams = (params?: GetMatchesParams) => ({
  page: params?.page ?? DEFAULT_PAGE,
  per_page: params?.perPage ?? DEFAULT_PER_PAGE,
});

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
