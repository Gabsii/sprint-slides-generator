import styled from 'styled-components';
import PropTypes from 'prop-types';

const H1 = styled.h1`
  margin: 0;

  text-align: ${({ textAlign }) => textAlign};

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 8vw;
`;

const H2 = styled.h2`
  margin: 0;

  text-align: ${({ textAlign }) => textAlign};

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 7vw;
`;

const H3 = styled.h3`
  margin: 0;

  text-align: ${({ textAlign }) => textAlign};

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 6vw;
`;

const H4 = styled.h4`
  margin: 0;

  text-align: ${({ textAlign }) => textAlign};

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 5vw;
`;

const H5 = styled.h5`
  margin: 0;

  text-align: ${({ textAlign }) => textAlign};

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 5vw;
`;

const H6 = styled.h6`
  margin: 0;

  text-align: ${({ textAlign }) => textAlign};

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 4vw;
`;

const Heading = ({ type = 'h1', textAlign = 'center', children }) => {
  switch (type) {
    case 'h1':
      return <H1 textAlign={textAlign}>{children}</H1>;
    case 'h2':
      return <H2 textAlign={textAlign}>{children}</H2>;
    case 'h3':
      return <H3 textAlign={textAlign}>{children}</H3>;
    case 'h4':
      return <H4 textAlign={textAlign}>{children}</H4>;
    case 'h5':
      return <H5 textAlign={textAlign}>{children}</H5>;
    case 'h6':
      return <H6 textAlign={textAlign}>{children}</H6>;
  }
};

export default Heading;

Heading.propTypes = {
  type: PropTypes.string,
  textAlign: PropTypes.oneOf([
    'center',
    'right',
    'left',
    'end',
    'start',
    'justify',
  ]),
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
