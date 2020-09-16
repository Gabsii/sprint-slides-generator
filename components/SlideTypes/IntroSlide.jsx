import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Slide from '@components/Presentation/Slide';
import Text from '@components/Presentation/Text';
import Heading from '@components/Presentation/Heading';
import Background from '@components/Presentation/Background';
import SavePresentation from '../SavePresentation';

const IntroSlide = ({
  name,
  team,
  startDate,
  endDate,
  presenterName,
  isActive,
  isSaved,
}) => (
  <Slide isActive={isActive}>
    <Text>{name}</Text>
    <Heading type="h1">Sprint Review</Heading>
    <Heading type="h6">{team}</Heading>
    <Text position="bottom">
      {`${format(new Date(startDate), 'dd.MM.yyyy')} - ${format(
        new Date(endDate),
        'dd.MM.yyyy',
      )}`}
      <br />
      Presented by {presenterName}
    </Text>
    <Background src="/sprint-final-background.png" alt="dayoum a bee" />
    {!isSaved && <SavePresentation />}
  </Slide>
);
export default IntroSlide;

IntroSlide.propTypes = {
  name: PropTypes.string,
  team: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  presenterName: PropTypes.string,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
