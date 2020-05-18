import styled from 'styled-components';
import PropTypes from 'prop-types';

const ULWrapper = styled.ul`
  color: ${({ theme }) => theme.colors.text || '#000000'};
  list-style: ${({ listStyle }) => listStyle || 'inherit'};
  font-size: 24px;
  font-size: 2.33vmax;
`;

const LI = styled.li`
  font-size: 16px;
  font-size: 1.66vmax;
`;

const UnorderedList = ({ children, listStyle }) => {
  if (children.length > 1) {
    return (
      <ULWrapper listStyle={listStyle}>
        {children.map((child, index) => (
          // TODO check if li tag exists
          <LI key={`li-child-${index}`}>{child}</LI>
        ))}
      </ULWrapper>
    );
  } else {
    return (
      <ULWrapper listStyle={listStyle}>
        <LI>{children}</LI>
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
  listStyle: PropTypes.string,
};

/** Unit Tests:
 *
 * - has children
 * - has single child
 * - can render
 * - children are wrapped in li
 * - can change list-style
 */
