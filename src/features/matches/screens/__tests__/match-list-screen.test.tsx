import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';

import { useMatchesList } from '../../hooks/use-matches-list';
import { MatchesScreen } from '../match-list-screen';

jest.mock('@/config/env', () => ({
  env: {
    pandaScoreToken: 'test-token',
  },
  hasPandaScoreToken: true,
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
}));

jest.mock('../../hooks/use-matches-list', () => ({
  useMatchesList: jest.fn(),
  formatMatchDate: jest.fn(() => 'Hoje, 10:00'),
}));

jest.mock('../../components/MatchCard/view', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Pressable, Text } = require('react-native');

  return function MatchCardMock({ onPress, teamA, teamB, league, statusLabel, date }: any) {
    return (
      <Pressable onPress={onPress}>
        <Text>{teamA.name}</Text>
        <Text>{teamB.name}</Text>
        <Text>{league.name}</Text>
        <Text>{statusLabel}</Text>
        <Text>{date}</Text>
      </Pressable>
    );
  };
});

const useMatchesListMock = jest.mocked(useMatchesList);
const routerPushMock = jest.mocked(router.push);

describe('MatchesScreen', () => {
  beforeEach(() => {
    useMatchesListMock.mockReturnValue({
      matches: [],
      isPending: false,
      isError: false,
      isRefreshing: false,
      refresh: jest.fn(),
    } as any);
  });

  it('renders the title and loading state', () => {
    useMatchesListMock.mockReturnValue({
      matches: [],
      isPending: true,
      isError: false,
      isRefreshing: false,
      refresh: jest.fn(),
    } as any);

    const { getByText, UNSAFE_getByProps } = render(<MatchesScreen />);

    expect(getByText('Partidas')).toBeTruthy();
    expect(UNSAFE_getByProps({ size: 44 })).toBeTruthy();
  });

  it('renders the error empty state', () => {
    useMatchesListMock.mockReturnValue({
      matches: [],
      isPending: false,
      isError: true,
      isRefreshing: false,
      refresh: jest.fn(),
    } as any);

    const { getByText } = render(<MatchesScreen />);

    expect(getByText('Não foi possível carregar as partidas.')).toBeTruthy();
  });

  it('renders matches, refreshes and navigates to details', () => {
    const refresh = jest.fn();
    useMatchesListMock.mockReturnValue({
      matches: [
        {
          id: 10,
          status: 'running',
          statusLabel: 'In Progress',
          beginAt: '2026-04-27T10:00:00Z',
          scheduledAt: null,
          numberOfGames: 3,
          league: { id: 1, name: 'CBLOL', serieName: 'Split 1', imageUrl: null },
          opponents: [
            { id: 1, name: 'FURIA', imageUrl: null },
            { id: 2, name: 'MIBR', imageUrl: null },
          ],
        },
      ],
      isPending: false,
      isError: false,
      isRefreshing: true,
      refresh,
    } as any);

    const { getByText, getByTestId } = render(<MatchesScreen />);

    expect(getByText('FURIA')).toBeTruthy();
    expect(getByText('MIBR')).toBeTruthy();
    expect(getByText('CBLOL')).toBeTruthy();
    expect(getByTestId('flash-list').props.refreshing).toBe(true);

    fireEvent(getByTestId('flash-list'), 'refresh');
    fireEvent.press(getByText('FURIA'));

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({
      pathname: '/match/[id]',
      params: {
        id: 10,
        league: JSON.stringify({ id: 1, name: 'CBLOL', serieName: 'Split 1', imageUrl: null }),
      },
    });
  });
});
