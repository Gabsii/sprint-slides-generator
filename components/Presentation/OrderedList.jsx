import styled from 'styled-components';
import PropTypes from 'prop-types';

const OLWrapper = styled.ol`
  color: ${({ theme }) => theme.colors.text || '#000000'};
  list-style: ${({ listStyle }) => listStyle || 'decimal'};
  font-size: 24px;
  font-size: 2vmin;
`;

const OrderedList = ({ children }) => {
  if (children.length > 1) {
    return (
      <OLWrapper>
        {children.map((child, index) => (
          <li key={`li-child-${index}`}>{child}</li>
        ))}
      </OLWrapper>
    );
  } else {
    return (
      <OLWrapper>
        <li>{children}</li>
      </OLWrapper>
    );
  }
};

export default OrderedList;

OrderedList.propTypes = {
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
 * - children are wrapped in li
 * - can change list-style
 */
