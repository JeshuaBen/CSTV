import { AxiosError } from 'axios';

import { isRequestCanceledError, withAbortSignal } from '../client';

describe('http client helpers', () => {
  it('returns undefined when there is no abort signal', () => {
    expect(withAbortSignal()).toBeUndefined();
  });

  it('wraps an abort signal for axios requests', () => {
    const controller = new AbortController();

    expect(withAbortSignal(controller.signal)).toEqual({
      signal: controller.signal,
    });
  });

  it('identifies canceled axios requests', () => {
    const canceledError = new AxiosError('Canceled', AxiosError.ERR_CANCELED);

    expect(isRequestCanceledError(canceledError)).toBe(true);
    expect(isRequestCanceledError(new Error('Regular error'))).toBe(false);
  });
});
