import styled from 'styled-components';
import PropTypes from 'prop-types';

const ULWrapper = styled.ul`
  color: ${({ theme }) => theme.colors.text || '#000000'};
  list-style: ${({ listStyle }) => listStyle || 'inherit'};
  font-size: 24px;
  font-size: 2vw;
`;

const UnorderedList = ({ children }) => {
  if (children.length > 1) {
    return (
      <ULWrapper>
        {children.map((child, index) => (
          <li key={`li-child-${index}`}>{child}</li>
        ))}
      </ULWrapper>
    );
  } else {
    return (
      <ULWrapper>
        <li>{children}</li>
      </ULWrapper>
    );
  }
};

export default UnorderedList;

UnorderedList.propTypes = {
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
