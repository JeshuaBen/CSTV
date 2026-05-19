import { GetMatchesParams, PaginatedMatchesResponse, PandaMatchDto } from '../types/match-list';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 20;

export const getPaginationParams = (params?: GetMatchesParams) => ({
  page: params?.page ?? DEFAULT_PAGE,
  per_page: params?.perPage ?? DEFAULT_PER_PAGE,
});

const getHeaderValue = (headers: unknown, name: string) => {
  if (!headers || typeof headers !== 'object') {
    return undefined;
  }

  const headerGetter = headers as { get?: (headerName: string) => unknown };
  const valueFromGetter =
    typeof headerGetter.get === 'function' ? headerGetter.get.call(headers, name) : undefined;
  const valueFromEntries = Object.entries(headers as Record<string, unknown>).find(
    ([headerName]) => headerName.toLowerCase() === name.toLowerCase(),
  )?.[1];
  const value = valueFromGetter ?? valueFromEntries;

  if (Array.isArray(value)) {
    return value[0] ? String(value[0]) : undefined;
  }

  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
};

const parsePositiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const parseNonNegativeInteger = (value: string | undefined) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};

const getHasNextPageFromLinkHeader = (linkHeader: string | undefined) => {
  if (!linkHeader) {
    return undefined;
  }

  return linkHeader.split(',').some((link) => /rel="?next"?/.test(link));
};

export const getPaginatedResponse = (
  items: PandaMatchDto[],
  headers: unknown,
  requestedPage: number,
  requestedPerPage: number,
): PaginatedMatchesResponse => {
  const page = parsePositiveInteger(getHeaderValue(headers, 'x-page'), requestedPage);
  const perPage = parsePositiveInteger(getHeaderValue(headers, 'x-per-page'), requestedPerPage);
  const total = parseNonNegativeInteger(getHeaderValue(headers, 'x-total'));
  const hasNextPageFromLinkHeader = getHasNextPageFromLinkHeader(getHeaderValue(headers, 'link'));
  const hasNextPage =
    hasNextPageFromLinkHeader ??
    (total !== null ? page * perPage < total : items.length >= perPage);

  return {
    items,
    page,
    perPage,
    total,
    hasNextPage,
  };
};
