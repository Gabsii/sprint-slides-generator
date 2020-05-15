import styled from 'styled-components';
import PropTypes from 'prop-types';

const BoxWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text || '#000000'};
  border: ${({ border }) => (border ? border : '')};
  height: 100%;
  margin: 2rem;
`;

const TitleBox = styled.div`
  position: relative;
  width: min-content;
  top: -15px;
  left: 20px;
  padding: 5px 15px;
  background: ${({ theme }) => theme.colors.background || '#000000'};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = ({ children, border, title }) => (
  <BoxWrapper border={border}>
    <TitleBox>{title}</TitleBox>
    <ContentWrapper>{children}</ContentWrapper>
  </BoxWrapper>
);

export default Box;

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  border: PropTypes.string,
  title: PropTypes.string,
};

/** Unit Tests:
 *
 * - has children
 * - has single child
 * - can render
 * - renders with top/bottom as columns if set
 */
