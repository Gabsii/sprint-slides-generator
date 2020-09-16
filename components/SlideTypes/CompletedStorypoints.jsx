import PropTypes from 'prop-types';
import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import Text from '@components/Presentation/Text';
import SavePresentation from '@components/SavePresentation';

const CompletedStorypoints = ({
  completed,
  forecast,
  completedTickets,
  ticketsInReview,
  pointsInReview,
  isActive,
  isSaved,
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
    <Heading type="h4" display="inline-block" dark={true}>
      {`${completedTickets} ${
        completedTickets.length === 1 ? 'Ticket' : 'Tickets'
      } completed`}
    </Heading>
    {ticketsInReview.length > 0 ? (
      <Heading type="h4" display="inline-block" dark={true}>
        {`${ticketsInReview} ${
          ticketsInReview.length === 1 ? 'Ticket' : 'Tickets'
        } in Review --> ${pointsInReview} Points in Review`}
      </Heading>
    ) : (
      <></>
    )}
    {!isSaved && <SavePresentation />}
  </Slide>
);

export default CompletedStorypoints;

CompletedStorypoints.propTypes = {
  completed: PropTypes.number,
  forecast: PropTypes.number,
  completedTickets: PropTypes.number,
  ticketsInReview: PropTypes.number,
  pointsInReview: PropTypes.number,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
