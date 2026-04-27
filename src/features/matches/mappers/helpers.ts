import { MatchStatus } from '../types/match-list';

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const toSafeNumber = (value: unknown, fallback = 0) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

export const toNullableNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

export const toNullableString = (value: unknown) => (isNonEmptyString(value) ? value : null);

export const mapApiStatusToMatchStatus = (apiStatus: string | null | undefined): MatchStatus => {
  if (!apiStatus) {
    return 'scheduled';
  }

  const status = apiStatus.toLowerCase();

  if (['running', 'live'].includes(status)) {
    return 'running';
  }

  if (['finished', 'canceled', 'cancelled', 'postponed'].includes(status)) {
    return 'finished';
  }

  return 'scheduled';
};

export const getMatchStatusLabel = (status: MatchStatus) => {
  if (status === 'running') {
    return 'In Progress';
  }

  if (status === 'finished') {
    return 'Ended';
  }

  return 'Scheduled';
};
