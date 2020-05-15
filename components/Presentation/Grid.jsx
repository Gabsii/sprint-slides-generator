import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text || '#000000'};
  width: ${({ width }) => (width ? width : 'auto')};
  margin: 2rem;

  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr);`};
  gap: 10px;
`;

const Grid = ({ children, columns = 3, width }) => (
  <GridWrapper columns={columns} width={width}>
    {children}
  </GridWrapper>
);

export default Grid;

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  columns: PropTypes.number,
  width: PropTypes.string,
};

/** Unit Tests:
 *
 * - has children
 * - has single child
 * - can render
 * - renders with top/bottom as columns if set
 */
