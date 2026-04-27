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
