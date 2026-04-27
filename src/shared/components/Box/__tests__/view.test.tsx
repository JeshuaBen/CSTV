import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import Box from '../view';

describe('Box', () => {
  it('renders children and maps layout props to classes and size style', () => {
    const { getByTestId, getByText } = render(
      <Box
        testID="box"
        direction="row"
        align="center"
        justify="between"
        bgColor="cardSurface"
        bRadius="lg"
        width={120}
        height={64}
        className="gap-2"
      >
        <Text>Content</Text>
      </Box>,
    );

    const box = getByTestId('box');

    expect(getByText('Content')).toBeTruthy();
    expect(box.props.className).toContain('flex-row');
    expect(box.props.className).toContain('items-center');
    expect(box.props.className).toContain('justify-between');
    expect(box.props.className).toContain('bg-cardSurface');
    expect(box.props.className).toContain('rounded-lg');
    expect(box.props.className).toContain('gap-2');
    expect(box.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: 120, height: 64 })]),
    );
  });

  it('maps full width and height to classes', () => {
    const { getByTestId } = render(
      <Box testID="box" width="full" height="full">
        <Text>Content</Text>
      </Box>,
    );

    expect(getByTestId('box').props.className).toContain('w-full');
    expect(getByTestId('box').props.className).toContain('h-full');
  });

  it('forwards native view props and keeps custom styles', () => {
    const customStyle = { marginTop: 12, opacity: 0.8 };
    const { getByTestId } = render(
      <Box
        testID="box"
        accessibilityLabel="Card container"
        accessible
        bRadius="doubleXL"
        style={customStyle}
      />,
    );

    const box = getByTestId('box');

    expect(box.props.accessibilityLabel).toBe('Card container');
    expect(box.props.accessible).toBe(true);
    expect(box.props.className).toContain('rounded-tr-2xl rounded-bl-2xl');
    expect(box.props.style).toEqual(expect.arrayContaining([customStyle]));
  });

  it('does not add size styles when dimensions use class tokens', () => {
    const { getByTestId } = render(<Box testID="box" width="full" height="full" />);

    expect(getByTestId('box').props.style[1]).toEqual({});
  });
});
