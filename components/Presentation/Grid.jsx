import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text || '#000000'};
  margin: 2rem;

  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr);`};
  gap: 10px;
`;

const Grid = ({ children, columns = 3 }) => (
  <GridWrapper columns={columns}>{children}</GridWrapper>
);

export default Grid;

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  columns: PropTypes.number,
};

/** Unit Tests:
 *
 * - has children
 * - has single child
 * - can render
 * - renders with top/bottom as columns if set
 */
