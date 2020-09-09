import PropTypes from 'prop-types';
import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import Text from '@components/Presentation/Text';

const CompletedStorypoints = ({
  completed,
  forecast,
  completedTickets,
  isActive,
}) => (
  <Slide isActive={isActive}>
    <span>
      <Heading type="h2" display="inline-block">
        {completed}
      </Heading>
      <Heading type="h2" display="inline-block" dark={true}>
        {`/ ${forecast}`}
      </Heading>
    </span>
    <Text>Completed Storypoints vs. Commitment</Text>
    <Heading type="h3" display="inline-block" dark={true}>
      {`${completedTickets} ${
        completedTickets.length === 1 ? 'Ticket' : 'Tickets'
      } completed`}
    </Heading>
  </Slide>
);

export default CompletedStorypoints;

CompletedStorypoints.propTypes = {
  completed: PropTypes.number,
  forecast: PropTypes.number,
  completedTickets: PropTypes.number,
  isActive: PropTypes.bool,
};
