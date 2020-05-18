import styled from 'styled-components';
import PropTypes from 'prop-types';

const LinkWrapper = styled.a`
  text-align: center;

  color: ${({ theme }) => theme.colors.link || '#000000'};
  font-size: 24px;
  font-size: 2vmin;
`;

const Link = ({ children, href }) => (
  <LinkWrapper href={href} target="_blank">
    {children}
  </LinkWrapper>
);

export default Link;

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  href: PropTypes.string,
};

/** Unit Tests:
 *
 * - has children
 * - has single child
 * - can render
 * - has href
 */
