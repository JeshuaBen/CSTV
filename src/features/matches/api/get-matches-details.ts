import { endpoints } from '@/features/matches/api/endpoints';
import { httpClient, withAbortSignal } from '@/services/http/client';

import { PandaMatchDetailDto, PandaTournamentRostersDto } from '../types/match-details';

export type GetMatchDetailParams = {
  signal?: AbortSignal;
};

export const fetchMatchDetailById = async (
  id: string | number,
  params?: GetMatchDetailParams,
): Promise<PandaMatchDetailDto> => {
  const response = await httpClient.get<PandaMatchDetailDto>(
    endpoints.matchById(id),
    withAbortSignal(params?.signal),
  );

  return response.data;
};

export const fetchTournamentRostersById = async (
  id: string | number,
  params?: GetMatchDetailParams,
): Promise<PandaTournamentRostersDto> => {
  const response = await httpClient.get<PandaTournamentRostersDto>(
    endpoints.tournamentRosters(id),
    withAbortSignal(params?.signal),
  );

  return response.data;
};
