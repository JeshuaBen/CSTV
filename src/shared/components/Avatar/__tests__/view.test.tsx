import { Image } from 'react-native';
import { render } from '@testing-library/react-native';

import Avatar from '../view';

describe('Avatar', () => {
  it('renders label and image when source exists', () => {
    const source = { uri: 'https://example.com/team.png' };
    const { getByText, UNSAFE_getByType } = render(
      <Avatar label="FURIA" source={source} size={48} shape="square" />,
    );

    expect(getByText('FURIA')).toBeTruthy();
    expect(UNSAFE_getByType(Image).props.source).toEqual(source);
  });

  it('renders fallback surface when source is missing', () => {
    const { queryByText, UNSAFE_getByProps, UNSAFE_queryByType } = render(
      <Avatar size={32} shape="circle" />,
    );

    expect(queryByText('FURIA')).toBeNull();
    expect(UNSAFE_getByProps({ bgColor: 'gray500' })).toBeTruthy();
    expect(UNSAFE_queryByType(Image)).toBeNull();
  });

  it('uses a square image surface when shape is square', () => {
    const source = { uri: 'https://example.com/square.png' };
    const { UNSAFE_getByProps, UNSAFE_getByType } = render(
      <Avatar source={source} size={40} shape="square" />,
    );

    expect(UNSAFE_getByProps({ bRadius: 'lg', bgColor: 'transparent' })).toBeTruthy();
    expect(UNSAFE_getByType(Image).props.source).toEqual(source);
  });

  it('renders the label with the expected text treatment', () => {
    const { getByText } = render(<Avatar label="NAVI" />);

    const label = getByText('NAVI');

    expect(label.props.className).toContain('text-xs');
    expect(label.props.className).toContain('font-roboto-400');
    expect(label.props.className).toContain('text-primaryWhite');
  });
});
