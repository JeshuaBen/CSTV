import { render } from '@testing-library/react-native';
import { Image } from 'react-native';

import PlayerCard from '../view';

describe('PlayerCard', () => {
  const player = {
    id: 1,
    nickname: 'KSCERATO',
    name: 'Kaike Cerato',
    imageUrl: 'https://example.com/player.png',
  };

  it('renders player nickname, name and image', () => {
    const { getByText, UNSAFE_getByType } = render(<PlayerCard player={player} />);

    expect(getByText('KSCERATO')).toBeTruthy();
    expect(getByText('Kaike Cerato')).toBeTruthy();
    expect(UNSAFE_getByType(Image).props.source).toEqual({
      uri: 'https://example.com/player.png',
    });
  });

  it('uses fallback copy and avatar surface when player is missing', () => {
    const { getByText, UNSAFE_getByProps, UNSAFE_queryByType } = render(
      <PlayerCard player={null} />,
    );

    expect(getByText('Nickname')).toBeTruthy();
    expect(getByText('Nome Jogador')).toBeTruthy();
    expect(UNSAFE_getByProps({ bRadius: 'lg', bgColor: 'gray500' })).toBeTruthy();
    expect(UNSAFE_queryByType(Image)).toBeNull();
  });

  it('aligns left-side card content to the right', () => {
    const { getByText, UNSAFE_getByProps } = render(<PlayerCard player={player} side="left" />);

    expect(
      UNSAFE_getByProps({
        direction: 'row',
        bgColor: 'cardSurface',
        align: 'end',
        justify: 'end',
      }).props.className,
    ).toContain('rounded-tr-[12px] rounded-br-[12px] w-[50%]');
    expect(getByText('KSCERATO').props.className).toContain('text-right');
    expect(getByText('Kaike Cerato').props.className).toContain('text-right');
  });

  it('aligns right-side card content to the left', () => {
    const { getByText, UNSAFE_getByProps } = render(<PlayerCard player={player} side="right" />);

    expect(
      UNSAFE_getByProps({
        direction: 'row',
        bgColor: 'cardSurface',
        align: 'start',
        justify: 'start',
      }).props.className,
    ).toContain('rounded-tl-[12px] rounded-bl-[12px] w-[50%]');
    expect(getByText('KSCERATO').props.className).toContain('text-left');
    expect(getByText('Kaike Cerato').props.className).toContain('text-left');
  });

  it('limits player labels to a single line', () => {
    const { getByText } = render(<PlayerCard player={player} />);

    expect(getByText('KSCERATO').props.numberOfLines).toBe(1);
    expect(getByText('Kaike Cerato').props.numberOfLines).toBe(1);
  });
});
