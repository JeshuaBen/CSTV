import { act, waitFor } from '@testing-library/react-native';

import { renderHookWithProviders } from '@/test/test-utils';

import { fetchRunningMatches, fetchUpcomingMatches } from '../../api/get-matches';
import { formatMatchDate, matchesQueryKeys, useMatchesList } from '../use-matches-list';

jest.mock('../../api/get-matches');

const fetchRunningMatchesMock = jest.mocked(fetchRunningMatches);
const fetchUpcomingMatchesMock = jest.mocked(fetchUpcomingMatches);

describe('useMatchesList', () => {
  beforeEach(() => {
    fetchRunningMatchesMock.mockResolvedValue([]);
    fetchUpcomingMatchesMock.mockResolvedValue([]);
  });

  it('uses the expected query keys', () => {
    expect(matchesQueryKeys.all).toEqual(['matches']);
    expect(matchesQueryKeys.list(2, 10)).toEqual(['matches', 'list', 2, 10]);
  });

  it('fetches, merges duplicated ids and sorts matches by status and date', async () => {
    fetchRunningMatchesMock.mockResolvedValue([
      {
        id: 2,
        status: 'running',
        begin_at: '2026-04-27T12:00:00Z',
        league: { id: 1, name: 'League A', image_url: null },
        serie: { name: 'Serie A' },
        opponents: [],
      },
    ]);
    fetchUpcomingMatchesMock.mockResolvedValue([
      {
        id: 3,
        status: 'not_started',
        scheduled_at: '2026-04-28T12:00:00Z',
        league: { id: 1, name: 'League A', image_url: null },
        serie: { name: 'Serie A' },
        opponents: [],
      },
      {
        id: 1,
        status: 'not_started',
        scheduled_at: '2026-04-29T12:00:00Z',
        league: { id: 2, name: 'League B', image_url: null },
        opponents: [],
      },
    ]);

    const { result } = renderHookWithProviders(() => useMatchesList({ page: 2, perPage: 10 }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchRunningMatchesMock).toHaveBeenCalledWith({
      page: 2,
      perPage: 10,
      signal: expect.any(AbortSignal),
    });
    expect(fetchUpcomingMatchesMock).toHaveBeenCalledWith({
      page: 2,
      perPage: 10,
      signal: expect.any(AbortSignal),
    });
    expect(result.current.matches.map((match) => match.id)).toEqual([2, 3, 1]);
    expect(result.current.matches[0]).toEqual(
      expect.objectContaining({
        id: 2,
        status: 'running',
      }),
    );
    expect(result.current.matches[2]).toEqual(
      expect.objectContaining({
        id: 1,
        league: expect.objectContaining({ name: 'League B' }),
      }),
    );
  });

  it('exposes refresh as the query refetch function', async () => {
    const { result } = renderHookWithProviders(() => useMatchesList());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await act(async () => {
      await result.current.refresh();
    });

    expect(fetchRunningMatchesMock).toHaveBeenCalledTimes(2);
    expect(fetchUpcomingMatchesMock).toHaveBeenCalledTimes(2);
    expect(result.current.isRefreshing).toBe(false);
  });
});

describe('formatMatchDate', () => {
  const systemDate = new Date('2026-04-27T12:00:00-03:00');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(systemDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns an undefined label when there is no valid date', () => {
    expect(formatMatchDate({ beginAt: null, scheduledAt: null })).toBe('Data indefinida');
    expect(formatMatchDate({ beginAt: 'invalid', scheduledAt: null })).toBe('Data indefinida');
  });

  it('formats today using the short label', () => {
    expect(formatMatchDate({ beginAt: '2026-04-27T10:30:00-03:00', scheduledAt: null })).toBe(
      'Hoje, 10:30',
    );
  });

  it('formats a full date when the match is not today', () => {
    expect(formatMatchDate({ beginAt: null, scheduledAt: '2026-04-28T10:30:00-03:00' })).toContain(
      '28/04/2026',
    );
  });
});
