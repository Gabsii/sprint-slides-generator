import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextWrapper = styled.div`
  text-align: center;

  color: ${({ theme }) => theme.colors.text || '#000000'};
  font-size: 24px;
  font-size: 2vw;
`;

const Heading = ({ children }) => <TextWrapper>{children}</TextWrapper>;

export default Heading;

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
