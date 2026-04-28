import { render } from '@testing-library/react-native';

import Text from '../view';

describe('Text', () => {
  it('renders children with composed classes and native props', () => {
    const { getByText } = render(
      <Text
        size="lg"
        weight={700}
        color="primaryWhite"
        align="center"
        transform="uppercase"
        italic
        underline
        strike
        numberOfLines={1}
        className="custom-class"
      >
        Hello
      </Text>,
    );

    const text = getByText('Hello');

    expect(text.props.className).toContain('text-lg');
    expect(text.props.className).toContain('font-roboto-700');
    expect(text.props.className).toContain('text-primaryWhite');
    expect(text.props.className).toContain('text-center');
    expect(text.props.className).toContain('uppercase');
    expect(text.props.className).toContain('italic');
    expect(text.props.className).toContain('underline');
    expect(text.props.className).toContain('line-through');
    expect(text.props.className).toContain('custom-class');
    expect(text.props.numberOfLines).toBe(1);
    expect(text.props.maxFontSizeMultiplier).toBe(1.2);
  });

  it('uses default typography classes when optional props are omitted', () => {
    const { getByText } = render(<Text>Default text</Text>);

    const text = getByText('Default text');

    expect(text.props.className).toContain('text-body');
    expect(text.props.className).toContain('font-roboto-400');
    expect(text.props.className).toContain('text-foreground');
  });

  it('forwards style and keeps the component font scale limit', () => {
    const style = { letterSpacing: 1, opacity: 0.7 };
    const { getByText } = render(
      <Text style={style} maxFontSizeMultiplier={3}>
        Styled text
      </Text>,
    );

    const text = getByText('Styled text');

    expect(text.props.style).toEqual(style);
    expect(text.props.maxFontSizeMultiplier).toBe(1.2);
  });

  it('maps alternate alignments and transforms', () => {
    const { getByText } = render(
      <Text align="right" transform="capitalize" weight={500} color="red" size="caption">
        warning message
      </Text>,
    );

    const text = getByText('warning message');

    expect(text.props.className).toContain('text-right');
    expect(text.props.className).toContain('capitalize');
    expect(text.props.className).toContain('font-roboto-500');
    expect(text.props.className).toContain('text-red');
    expect(text.props.className).toContain('text-caption');
  });
});
