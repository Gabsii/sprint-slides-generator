import styled from 'styled-components';
import PropTypes from 'prop-types';

const fontSizes = {
  h1: '8vw',
  h2: '7vw',
  h3: '6vw',
  h4: '5vw',
  h5: '4.5vw',
  h6: '4vw',
};

const BaseHeading = styled.h1`
  margin: 0;
  display: ${({ display }) => display};
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ theme }) => theme.colors.heading || '#000000'};
  opacity: ${({ dark }) => (dark ? 0.15 : 1)};

  font-size: 24px;
  font-size: ${({ fontSize }) => fontSize};
`;

const Heading = ({
  type = 'h1',
  textAlign = 'center',
  display = 'block',
  dark = false,
  children,
}) => {
  let fontSize = fontSizes[type];

  return (
    <BaseHeading
      as={type}
      textAlign={textAlign}
      display={display}
      fontSize={fontSize}
      dark={dark}
    >
      {children}
    </BaseHeading>
  );
};

export default Heading;

Heading.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  textAlign: PropTypes.oneOf([
    'center',
    'right',
    'left',
    'end',
    'start',
    'justify',
  ]),
  display: PropTypes.oneOf([
    'none',
    'inline',
    'block',
    'contents',
    'inline-block',
    'flex',
    'inline-flex',
    'grid',
    'inline-grid',
    'inherit',
    'initial',
    'unset',
  ]),
  dark: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

/** Unit Tests:
 *
 * - has children
 * - has single child
 * - can render
 * - can render as any of h1-h6
 * - can render without a type being passed
 */
