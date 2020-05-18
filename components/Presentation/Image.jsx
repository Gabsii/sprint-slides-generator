import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledImg = styled.img`
  background-size: cover;
  object-fit: cover;
  border-radius: ${({ rounded }) => (rounded ? '50%' : '0')};
`;

const Image = ({ alt, src, rounded = false }) => (
  <StyledImg src={src} alt={alt} rounded={rounded} />
);

export default Image;

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  rounded: PropTypes.bool,
};

/** Unit Tests:
 *
 * - is active slide
 * - has children
 * - has single child
 * - has alt attribute
 * - can render
 * - has src
 * - can be set rounded
 */
