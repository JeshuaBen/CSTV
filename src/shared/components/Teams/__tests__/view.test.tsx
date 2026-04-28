import { render } from '@testing-library/react-native';
import { Image } from 'react-native';

import Teams from '../view';

describe('Teams', () => {
  it('renders both teams and the versus label', () => {
    const { getByText } = render(
      <Teams
        team1={{ name: 'FURIA', image: { uri: 'https://example.com/furia.png' } }}
        team2={{ name: 'MIBR', image: { uri: 'https://example.com/mibr.png' } }}
      />,
    );

    expect(getByText('FURIA')).toBeTruthy();
    expect(getByText('MIBR')).toBeTruthy();
    expect(getByText('vs')).toBeTruthy();
  });

  it('renders one avatar image for each team image', () => {
    const team1Image = { uri: 'https://example.com/furia.png' };
    const team2Image = { uri: 'https://example.com/mibr.png' };
    const { UNSAFE_getAllByType } = render(
      <Teams
        team1={{ name: 'FURIA', image: team1Image }}
        team2={{ name: 'MIBR', image: team2Image }}
      />,
    );

    expect(UNSAFE_getAllByType(Image).map((image) => image.props.source)).toEqual([
      team1Image,
      team2Image,
    ]);
  });

  it('renders fallback avatar surfaces when team images are missing', () => {
    const { UNSAFE_getAllByProps } = render(
      <Teams team1={{ name: 'Liquid' }} team2={{ name: 'Vitality' }} />,
    );

    expect(UNSAFE_getAllByProps({ bgColor: 'gray500' })).toHaveLength(2);
  });

  it('centers teams in a horizontal row', () => {
    const { UNSAFE_getByProps } = render(
      <Teams team1={{ name: 'Heroic' }} team2={{ name: 'Astralis' }} />,
    );

    expect(
      UNSAFE_getByProps({
        direction: 'row',
        align: 'center',
        justify: 'center',
        className: 'gap-4',
      }),
    ).toBeTruthy();
  });
});
