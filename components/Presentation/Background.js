import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  background-size: cover;
  object-fit: cover;
  filter: brightness(0.5);
`;

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  background-size: cover;
  object-fit: cover;
  filter: brightness(0.5);
`;

const Background = ({ alt, src, type = 'image', autoplay = true }) =>
  type === 'image' ? (
    <StyledImg src={src} alt={alt} />
  ) : (
    <StyledVideo src={src} autoplay={autoplay} />
  );

export default Background;

Background.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
  autoplay: PropTypes.bool,
};

/** Unit Tests:
 *
 * - is active slide
 * - has children
 * - has single child
 * - can render
 * - has Background as child
 */
