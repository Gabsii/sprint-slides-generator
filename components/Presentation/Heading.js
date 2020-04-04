import styled from 'styled-components';
import PropTypes from 'prop-types';

const H1 = styled.h1`
  text-align: center;

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 8vw;
`;

const H2 = styled.h2`
  text-align: center;

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 7vw;
`;

const H3 = styled.h3`
  text-align: center;

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 6vw;
`;

const H4 = styled.h4`
  text-align: center;

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 5vw;
`;

const H5 = styled.h5`
  text-align: center;

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 5vw;
`;

const H6 = styled.h6`
  text-align: center;

  color: ${({ theme }) => theme.colors.heading || '#000000'};
  font-size: 16px;
  font-size: 4.5vw;
`;

const Heading = ({ type, children }) => {
  switch (type) {
    case 'h1':
      return <H1>{children}</H1>;
    case 'h2':
      return <H2>{children}</H2>;
    case 'h3':
      return <H3>{children}</H3>;
    case 'h4':
      return <H4>{children}</H4>;
    case 'h5':
      return <H5>{children}</H5>;
    case 'h6':
      return <H6>{children}</H6>;
    default:
      return <H1>{children}</H1>;
  }
};

export default Heading;

Heading.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
