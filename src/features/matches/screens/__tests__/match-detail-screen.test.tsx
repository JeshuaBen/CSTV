import { fireEvent, render } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { useMatchDetail } from '../../hooks/use-matches-details';
import MatchDetailScreen from '../match-detail-screen';

jest.mock('@/config/env', () => ({
  hasPandaScoreToken: true,
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('../../hooks/use-matches-list', () => ({
  formatMatchDate: jest.fn(() => 'Hoje, 10:00'),
}));

jest.mock('../../hooks/use-matches-details', () => {
  const actual = jest.requireActual('../../hooks/use-matches-details');

  return {
    ...actual,
    useMatchDetail: jest.fn(),
  };
});

const useMatchDetailMock = jest.mocked(useMatchDetail);
const useLocalSearchParamsMock = jest.mocked(useLocalSearchParams);
const routerBackMock = jest.mocked(router.back);

describe('MatchDetailScreen', () => {
  beforeEach(() => {
    useLocalSearchParamsMock.mockReturnValue({
      id: '10',
      league: JSON.stringify({ id: 1, name: 'CBLOL', serieName: 'Split 1', imageUrl: null }),
    });
    useMatchDetailMock.mockReturnValue({
      isPending: false,
      isError: false,
      match: {
        id: 10,
        tournamentId: 99,
        status: 'running',
        statusLabel: 'In Progress',
        leagueName: 'CBLOL',
        leagueImageUrl: null,
        serieName: 'Split 1',
        beginAt: '2026-04-27T10:00:00Z',
        scheduledAt: null,
        numberOfGames: 3,
        opponents: [
          {
            id: 1,
            name: 'FURIA',
            imageUrl: null,
            players: [{ id: 1, name: 'Player One', nickname: 'p1', imageUrl: null }],
          },
          {
            id: 2,
            name: 'MIBR',
            imageUrl: null,
            players: [{ id: 2, name: 'Player Two', nickname: 'p2', imageUrl: null }],
          },
        ],
      },
    } as any);
  });

  it('renders the loading state', () => {
    useMatchDetailMock.mockReturnValue({
      isPending: true,
      isError: false,
      match: null,
    } as any);

    const { getByText, UNSAFE_getByProps } = render(<MatchDetailScreen />);

    expect(getByText('CBLOL - Split 1')).toBeTruthy();
    expect(UNSAFE_getByProps({ size: 44 })).toBeTruthy();
  });

  it('renders the error state', () => {
    useMatchDetailMock.mockReturnValue({
      isPending: false,
      isError: true,
      match: null,
    } as any);

    const { getByText } = render(<MatchDetailScreen />);

    expect(getByText('Não foi possível carregar os detalhes da partida.')).toBeTruthy();
  });

  it('renders match details and lineup rows', () => {
    const { getByText } = render(<MatchDetailScreen />);

    expect(getByText('CBLOL - Split 1')).toBeTruthy();
    expect(getByText('FURIA')).toBeTruthy();
    expect(getByText('MIBR')).toBeTruthy();
    expect(getByText('Hoje, 10:00')).toBeTruthy();
    expect(getByText('p1')).toBeTruthy();
    expect(getByText('Player One')).toBeTruthy();
    expect(getByText('p2')).toBeTruthy();
    expect(getByText('Player Two')).toBeTruthy();
  });

  it('navigates back when the back button is pressed', () => {
    const { UNSAFE_getAllByType } = render(<MatchDetailScreen />);

    fireEvent.press(UNSAFE_getAllByType(TouchableOpacity)[0]);

    expect(routerBackMock).toHaveBeenCalledTimes(1);
  });
});
