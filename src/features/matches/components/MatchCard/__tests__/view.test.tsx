import { fireEvent, render } from '@testing-library/react-native';
import { Image, TouchableOpacity } from 'react-native';

import MatchCard from '../view';

describe('MatchCard', () => {
  const defaultProps = {
    date: 'Hoje, 10:00',
    teamA: {
      name: 'FURIA',
      imageUrl: 'https://example.com/furia.png',
    },
    teamB: {
      name: 'MIBR',
      imageUrl: 'https://example.com/mibr.png',
    },
    league: {
      id: 1,
      name: 'CBLOL',
      serieName: 'Split 1',
      imageUrl: 'https://example.com/cblol.png',
    },
  };

  it('renders match teams, league serie and scheduled date', () => {
    const { getByText } = render(<MatchCard {...defaultProps} />);

    expect(getByText('FURIA')).toBeTruthy();
    expect(getByText('MIBR')).toBeTruthy();
    expect(getByText('vs')).toBeTruthy();
    expect(getByText('CBLOL - Split 1')).toBeTruthy();
    expect(getByText('Hoje, 10:00')).toBeTruthy();
  });

  it('calls onPress when the card is pressed', () => {
    const onPress = jest.fn();
    const { UNSAFE_getByType } = render(<MatchCard {...defaultProps} onPress={onPress} />);

    fireEvent.press(UNSAFE_getByType(TouchableOpacity));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders running matches with the live label and red status badge', () => {
    const { getByText, UNSAFE_getByProps } = render(
      <MatchCard {...defaultProps} matchStatus="running" statusLabel="In Progress" />,
    );

    expect(getByText('AGORA')).toBeTruthy();
    expect(UNSAFE_getByProps({ className: 'px-2 py-2 bg-red' })).toBeTruthy();
  });

  it('uses fallback team and league labels when data is missing', () => {
    const { getAllByText, getByText } = render(<MatchCard />);

    expect(getAllByText('TBD')).toHaveLength(2);
    expect(getByText('Unknown League')).toBeTruthy();
    expect(getByText('Data indefinida')).toBeTruthy();
  });

  it('maps team and league image urls to image sources', () => {
    const { UNSAFE_getAllByType } = render(<MatchCard {...defaultProps} />);

    expect(UNSAFE_getAllByType(Image).map((image) => image.props.source)).toEqual([
      { uri: 'https://example.com/furia.png' },
      { uri: 'https://example.com/mibr.png' },
      { uri: 'https://example.com/cblol.png' },
    ]);
  });
});
