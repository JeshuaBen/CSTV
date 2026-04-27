import { waitFor } from '@testing-library/react-native';
import { AxiosError } from 'axios';

import { renderHookWithProviders } from '@/test/test-utils';

import { fetchMatchDetailById, fetchTournamentRostersById } from '../../api/get-matches-details';
import {
  getLineupRows,
  getTeamImageSource,
  getTeamViewModel,
  getTitle,
  matchDetailQueryKeys,
  parseLeagueSummary,
  useMatchDetail,
} from '../use-matches-details';

jest.mock('../../api/get-matches-details');

const fetchMatchDetailByIdMock = jest.mocked(fetchMatchDetailById);
const fetchTournamentRostersByIdMock = jest.mocked(fetchTournamentRostersById);

const matchResponse = {
  id: 10,
  status: 'running',
  begin_at: '2026-04-27T10:00:00Z',
  tournament: { id: 99, name: 'Tournament' },
  league: { name: 'CBLOL', image_url: 'https://example.com/league.png' },
  serie: { name: 'Split 1' },
  opponents: [
    {
      opponent: {
        id: 1,
        name: 'FURIA',
        image_url: 'https://example.com/furia.png',
        players: [{ id: 1, name: 'Fallback', image_url: null }],
      },
    },
    {
      opponent: {
        id: 2,
        name: 'MIBR',
        image_url: null,
        players: [],
      },
    },
  ],
};

describe('useMatchDetail', () => {
  beforeEach(() => {
    fetchMatchDetailByIdMock.mockResolvedValue(matchResponse);
    fetchTournamentRostersByIdMock.mockResolvedValue({
      rosters: [
        {
          id: 1,
          players: [{ id: 7, name: 'Roster Player', image_url: 'https://example.com/player.png' }],
        },
      ],
    });
  });

  it('uses the expected query keys', () => {
    expect(matchDetailQueryKeys.all).toEqual(['match-detail']);
    expect(matchDetailQueryKeys.detail(10)).toEqual(['match-detail', 10]);
  });

  it('fetches match detail and enriches players with tournament rosters', async () => {
    const { result } = renderHookWithProviders(() => useMatchDetail(10));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetchMatchDetailByIdMock).toHaveBeenCalledWith(10, {
      signal: expect.any(AbortSignal),
    });
    expect(fetchTournamentRostersByIdMock).toHaveBeenCalledWith(99, {
      signal: expect.any(AbortSignal),
    });
    expect(result.current.match?.opponents[0]?.players[0]).toEqual(
      expect.objectContaining({ id: 7, name: 'Roster Player' }),
    );
  });

  it('does not fetch when id is missing', async () => {
    const { result } = renderHookWithProviders(() => useMatchDetail(undefined));

    expect(result.current.match).toBeNull();
    expect(result.current.fetchStatus).toBe('idle');
    expect(fetchMatchDetailByIdMock).not.toHaveBeenCalled();
  });

  it('falls back to match data when roster request fails with a non-canceled error', async () => {
    fetchTournamentRostersByIdMock.mockRejectedValue(new Error('Roster failed'));

    const { result } = renderHookWithProviders(() => useMatchDetail(10));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.match?.opponents[0]?.players[0]).toEqual(
      expect.objectContaining({ name: 'Fallback' }),
    );
  });

  it('keeps canceled roster errors as query errors', async () => {
    const canceledError = new AxiosError('Canceled', AxiosError.ERR_CANCELED);
    fetchTournamentRostersByIdMock.mockRejectedValue(canceledError);

    const { result } = renderHookWithProviders(() => useMatchDetail(10));

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(canceledError);
    expect(result.current.match).toBeNull();
  });
});

describe('match detail helpers', () => {
  it('parses league summaries safely', () => {
    expect(parseLeagueSummary('{"name":"CBLOL","serieName":"Split 1"}')).toEqual({
      name: 'CBLOL',
      serieName: 'Split 1',
    });
    expect(parseLeagueSummary('invalid')).toBeUndefined();
    expect(parseLeagueSummary()).toBeUndefined();
  });

  it('builds titles from league data', () => {
    expect(getTitle({ id: 1, name: 'CBLOL', serieName: 'Split 1', imageUrl: null })).toBe(
      'CBLOL - Split 1',
    );
    expect(getTitle({ id: 1, name: 'CBLOL', serieName: null, imageUrl: null })).toBe('CBLOL');
    expect(getTitle(undefined)).toBe('Detalhes da Partida');
  });

  it('creates five lineup rows with nullable players', () => {
    const rows = getLineupRows([
      {
        id: 1,
        name: 'FURIA',
        imageUrl: null,
        players: [{ id: 1, name: 'Player 1', nickname: 'P1', imageUrl: null }],
      },
      null,
    ]);

    expect(rows).toHaveLength(5);
    expect(rows[0]).toEqual(
      expect.objectContaining({
        id: 'lineup-row-0',
        leftPlayer: expect.objectContaining({ nickname: 'P1' }),
        rightPlayer: null,
      }),
    );
    expect(rows[4].leftPlayer).toBeNull();
  });

  it('builds team image sources and fallback view models', () => {
    expect(getTeamImageSource('https://example.com/team.png')).toEqual({
      uri: 'https://example.com/team.png',
    });
    expect(getTeamImageSource(null)).toBeUndefined();
    expect(getTeamViewModel(null)).toEqual({ name: 'TBD', image: undefined });
  });
});
