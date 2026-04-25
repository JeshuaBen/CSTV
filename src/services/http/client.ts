import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { env } from '../../config/env';

export type HttpErrorCode =
  | 'bad_request'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'timeout'
  | 'network'
  | 'canceled'
  | 'server'
  | 'unknown';

export type HttpClientError = {
  code: HttpErrorCode;
  message: string;
  status: number | null;
  url: string | null;
  method: string | null;
  details: unknown;
  isRetryable: boolean;
};

const AXIOS_TIMEOUT_ERROR_CODES = new Set(['ECONNABORTED', 'ETIMEDOUT']);

const STATUS_TO_ERROR_CODE: Record<number, HttpErrorCode> = {
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
};

const normalizeStatusCode = (status: number): HttpErrorCode => {
  if (STATUS_TO_ERROR_CODE[status]) {
    return STATUS_TO_ERROR_CODE[status];
  }

  if (status >= 500) {
    return 'server';
  }

  return 'unknown';
};

export const isHttpClientError = (error: unknown): error is HttpClientError => {
  if (!error || typeof error !== 'object') {
    return false;
  }

  return 'code' in error && 'message' in error && 'status' in error;
};

export const isRequestCanceledError = (error: unknown) =>
  isHttpClientError(error) && error.code === 'canceled';

export const normalizeHttpError = (error: unknown): HttpClientError => {
  if (isHttpClientError(error)) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return {
      code: 'unknown',
      message: 'Unexpected error while processing request.',
      status: null,
      url: null,
      method: null,
      details: error,
      isRetryable: false,
    };
  }

  const axiosError = error as AxiosError;
  const status = axiosError.response?.status ?? null;
  const method = axiosError.config?.method?.toUpperCase() ?? null;
  const url = axiosError.config?.url ?? null;
  const responseData = axiosError.response?.data;
  const isCanceled = axiosError.code === AxiosError.ERR_CANCELED;
  const isTimeout = Boolean(axiosError.code && AXIOS_TIMEOUT_ERROR_CODES.has(axiosError.code));
  const isNetwork = Boolean(!axiosError.response && axiosError.request && !isTimeout && !isCanceled);

  let code: HttpErrorCode = 'unknown';

  if (isCanceled) {
    code = 'canceled';
  } else if (isTimeout) {
    code = 'timeout';
  } else if (isNetwork) {
    code = 'network';
  } else if (typeof status === 'number') {
    code = normalizeStatusCode(status);
  }

  const messageFromApi =
    responseData && typeof responseData === 'object' && 'message' in responseData
      ? String(responseData.message)
      : null;

  return {
    code,
    message:
      messageFromApi ??
      axiosError.message ??
      'Request failed. Please try again in a few moments.',
    status,
    url,
    method,
    details: responseData ?? null,
    isRetryable: code === 'timeout' || code === 'network' || code === 'server',
  };
};

export const withAbortSignal = (
  signal?: AbortSignal,
): Pick<AxiosRequestConfig, 'signal'> | undefined =>
  signal ? { signal } : undefined;

export const httpClient = axios.create({
  baseURL: 'https://api.pandascore.co',
  timeout: 10_000,
});

httpClient.interceptors.request.use((config) => {
  if (!env.pandaScoreToken) {
    return config;
  }

  config.headers = config.headers ?? {};

  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${env.pandaScoreToken}`;
  }

  return config;
});

if (__DEV__) {
  httpClient.interceptors.response.use(
    (response) => {
      console.tron?.display({
        name: 'API Response',
        preview: `${response.config.method?.toUpperCase()} ${response.config.url}`,
        value: {
          status: response.status,
          data: response.data,
        },
        important: false,
      });
      return response;
    },
    (error) => {
      const normalizedError = normalizeHttpError(error);

      console.tron?.display({
        name: 'API Error',
        preview: `${normalizedError.method ?? 'UNKNOWN'} ${normalizedError.url ?? ''}`,
        value: {
          message: normalizedError.message,
          status: normalizedError.status,
          code: normalizedError.code,
          retryable: normalizedError.isRetryable,
          data: normalizedError.details,
        },
        important: true,
      });
      return Promise.reject(normalizedError);
    },
  );
} else {
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(normalizeHttpError(error)),
  );
}
