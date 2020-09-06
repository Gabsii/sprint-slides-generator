import PropTypes from 'prop-types';
import { useState, createElement, cloneElement, useEffect } from 'react';
import useKeyPress from '@utils/hooks/useKeyPress';

const Presentation = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const arrowRight = useKeyPress('ArrowRight');
  const arrowLeft = useKeyPress('ArrowLeft');
  const space = useKeyPress('Space');
  const enter = useKeyPress('Enter');
  const backspace = useKeyPress('Backspace');

  const rightPressed = arrowRight || space || enter;
  const leftPressed = arrowLeft || backspace;

  useEffect(() => {
    if (rightPressed && activeSlide < children.flat().length - 1) {
      setActiveSlide(activeSlide + 1);
    } else if (leftPressed && activeSlide !== 0) {
      setActiveSlide(activeSlide - 1);
    }
  }, [rightPressed, leftPressed]);

  const teenager = children.flat().map((child, index) =>
    cloneElement(child, {
      id: `slide-${index}`,
      key: `slide-${index}`,
      isActive: activeSlide === index,
    }),
  );

  // TODO maybe include router updates

  return teenager.filter(teen => teen.props.isActive);
};

export default Presentation;

Presentation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

/** Unit Tests:
 *
 * - has active slide
 * - can increase/decrease active slide
 * - children have key set
 * - children have isActive set
 * - buttons are disabled
 * - can click button
 * - can navigate button via arrow keys
 */
