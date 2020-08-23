import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainOuter = styled.main`
  width: 100%;

  /* background-color: ${({ theme }) => theme.colors.background}; */
`;

const MainInner = styled.div`
  width: 100%;
  max-width: 1024px;

  margin: 0 auto;
  padding: 1rem 2rem;
`;

const Main = ({ children }) => (
  <>
    <MainOuter>
      <MainInner>{children}</MainInner>
    </MainOuter>
  </>
);

export default Main;

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
