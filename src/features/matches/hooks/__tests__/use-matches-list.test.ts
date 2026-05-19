import { act, waitFor } from '@testing-library/react-native';

import { renderHookWithProviders } from '@/test/test-utils';

import { fetchRunningMatches, fetchUpcomingMatches } from '../../api/get-matches';
import { PandaMatchDto } from '../../types/match-list';
import { formatMatchDate, matchesQueryKeys, useMatchesList } from '../use-matches-list';

jest.mock('../../api/get-matches');

const fetchRunningMatchesMock = jest.mocked(fetchRunningMatches);
const fetchUpcomingMatchesMock = jest.mocked(fetchUpcomingMatches);

const createMatchDto = (overrides: PandaMatchDto): PandaMatchDto => ({
  id: 1,
  status: 'not_started',
  scheduled_at: '2026-04-28T12:00:00Z',
  begin_at: null,
  league: { id: 1, name: 'League A', image_url: null },
  serie: { name: 'Serie A' },
  opponents: [],
  ...overrides,
});

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
      createMatchDto({
        id: 2,
        status: 'running',
        begin_at: '2026-04-27T12:00:00Z',
        league: { id: 1, name: 'League A', image_url: null },
        serie: { name: 'Serie A' },
      }),
    ]);
    fetchUpcomingMatchesMock.mockResolvedValue([
      createMatchDto({
        id: 3,
        status: 'not_started',
        scheduled_at: '2026-04-28T12:00:00Z',
        league: { id: 1, name: 'League A', image_url: null },
        serie: { name: 'Serie A' },
      }),
      createMatchDto({
        id: 1,
        status: 'not_started',
        scheduled_at: '2026-04-29T12:00:00Z',
        league: { id: 2, name: 'League B', image_url: null },
      }),
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
    expect(result.current.hasNextPage).toBe(false);
  });

  it('loads the next page and keeps accumulated matches deduplicated and sorted', async () => {
    fetchRunningMatchesMock.mockImplementation(async (params) => {
      if (params?.page === 1) {
        return [
          createMatchDto({
            id: 5,
            status: 'running',
            begin_at: '2026-04-29T12:00:00Z',
          }),
          createMatchDto({
            id: 2,
            status: 'running',
            begin_at: '2026-04-27T12:00:00Z',
          }),
          createMatchDto({
            id: 6,
            status: 'running',
            begin_at: '2026-04-30T12:00:00Z',
          }),
        ];
      }

      return [];
    });
    fetchUpcomingMatchesMock.mockImplementation(async (params) => {
      if (params?.page === 2) {
        return [
          createMatchDto({
            id: 3,
            status: 'not_started',
            scheduled_at: '2026-04-28T12:00:00Z',
          }),
          createMatchDto({
            id: 5,
            status: 'running',
            begin_at: '2026-04-29T12:00:00Z',
          }),
        ];
      }

      return [];
    });

    const { result } = renderHookWithProviders(() => useMatchesList({ perPage: 3 }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(true);

    await act(async () => {
      await result.current.loadMore();
    });

    await waitFor(() =>
      expect(result.current.matches.map((match) => match.id)).toEqual([2, 5, 6, 3]),
    );

    expect(fetchRunningMatchesMock).toHaveBeenCalledWith({
      page: 2,
      perPage: 3,
      signal: expect.any(AbortSignal),
    });
    expect(fetchUpcomingMatchesMock).toHaveBeenCalledWith({
      page: 2,
      perPage: 3,
      signal: expect.any(AbortSignal),
    });
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.isFetchingNextPage).toBe(false);
  });

  it('does not expose a next page when both endpoints return fewer items than perPage', async () => {
    fetchRunningMatchesMock.mockResolvedValue([
      createMatchDto({ id: 1 }),
      createMatchDto({ id: 2 }),
    ]);
    fetchUpcomingMatchesMock.mockResolvedValue([createMatchDto({ id: 3 })]);

    const { result } = renderHookWithProviders(() => useMatchesList({ perPage: 3 }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(false);
  });

  it('does not load more when the query is disabled', () => {
    const { result } = renderHookWithProviders(() => useMatchesList({ enabled: false }));

    act(() => {
      result.current.loadMore();
    });

    expect(fetchRunningMatchesMock).not.toHaveBeenCalled();
    expect(fetchUpcomingMatchesMock).not.toHaveBeenCalled();
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
