import PropTypes from 'prop-types';
import { useState, cloneElement, useEffect } from 'react';
import useKeyPress from '@utils/hooks/useKeyPress';
import { useRouter } from 'next/router';

const Presentation = ({ children }) => {
  const router = useRouter();
  const slides = children.flat().filter(child => child);

  const presetSlideNo = parseInt(router.query.slide)
    ? router.query.slide < slides.flat().length - 1
      ? parseInt(router.query.slide)
      : slides.flat().length - 1
    : 0;

  const [activeSlide, setActiveSlide] = useState(presetSlideNo);

  const arrowRight = useKeyPress('ArrowRight');
  const arrowLeft = useKeyPress('ArrowLeft');
  const space = useKeyPress('Space');
  const enter = useKeyPress('Enter');
  const backspace = useKeyPress('Backspace');

  const rightPressed = arrowRight || space || enter;
  const leftPressed = arrowLeft || backspace;

  useEffect(() => {
    if (rightPressed && activeSlide < slides.flat().length - 1) {
      setActiveSlide(activeSlide + 1);
    } else if (leftPressed && activeSlide !== 0) {
      setActiveSlide(activeSlide - 1);
    }
    if (activeSlide !== 0) {
      router.push(
        `?slide=${activeSlide}`,
        `${router.query.slug}?slide=${activeSlide}`,
        { shallow: true },
      );
    }
  }, [rightPressed, leftPressed]);

  const teenager = slides.map((child, index) =>
    cloneElement(child, {
      id: `slide-${index}`,
      key: `slide-${index}`,
      isActive: activeSlide === index,
    }),
  );

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
 */
