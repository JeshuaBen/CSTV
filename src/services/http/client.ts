import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

import { env } from '../../config/env';

export const isRequestCanceledError = (error: unknown) =>
  isAxiosError(error) && error.code === AxiosError.ERR_CANCELED;

export const withAbortSignal = (
  signal?: AbortSignal,
): Pick<AxiosRequestConfig, 'signal'> | undefined => (signal ? { signal } : undefined);

export const httpClient = axios.create({
  baseURL: 'https://api.pandascore.co',
  timeout: 10_000,
  headers: env.pandaScoreToken && {
    Authorization: `Bearer ${env.pandaScoreToken}`,
  },
});

if (__DEV__) {
  httpClient.interceptors.response.use(
    (response) => {
      console.tron?.display({
        name: 'API Response',
        preview: `${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
        important: false,
      });

      return response;
    },
    (error) => {
      const axiosError = isAxiosError(error) ? error : null;

      console.tron?.display({
        name: 'API Error',
        preview: `${axiosError?.config?.method?.toUpperCase() ?? 'UNKNOWN'} ${
          axiosError?.config?.url ?? ''
        }`,
        value: {
          message: axiosError?.message ?? 'Unexpected request error.',
          status: axiosError?.response?.status ?? null,
        },
        important: true,
      });

      return Promise.reject(error);
    },
  );
}
