import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styled from 'styled-components';

const CustomSlider = styled(Slider)`
  width: 100%;
  height: 150px;

  margin: 1rem 0 3rem;

  .slick-list,
  .slick-track {
    height: 100%;
  }

  .slick-slide {
    padding: 10px;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      height: 100%;
      width: 100%;

      background-color: green;
    }
  }

  .slick-next::before,
  .slick-prev::before {
    color: black;
  }
`;

const FavouritesSlider = ({ favourites }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    easing: 'ease',
    swipe: true,
  };
  return (
    <CustomSlider {...settings}>
      {favourites.map(fav => (
        <div key={fav.id}>{fav.name}</div>
      ))}
    </CustomSlider>
  );
};
export default FavouritesSlider;

FavouritesSlider.propTypes = {
  favourites: PropTypes.array.isRequired,
};

/** Unit Tests:
 *
 * - does not render children
 * - can render
 */
