import { endpoints } from '@/services/http/endpoints';
import { httpClient, withAbortSignal } from '@/services/http/client';

import { PandaMatchDetailDto } from '../types/match-details';

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
