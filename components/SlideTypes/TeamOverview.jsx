import PropTypes from 'prop-types';

import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import Card from '@components/Card';
import SavePresentation from '../SavePresentation';

const TeamOverview = ({ assignees, isActive, isSaved }) => (
  <Slide isActive={isActive}>
    <Heading type="h6" textAlign="left">
      Team
    </Heading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
      {assignees.map(assignee => (
        <Card
          key={`Team-${assignee.name}`}
          alt={assignee.name}
          name={assignee.displayName}
          src={`/api/users/${assignee.name}?size=xxlarge`}
        />
      ))}
    </div>
    {!isSaved && <SavePresentation />}
  </Slide>
);

export default TeamOverview;

TeamOverview.propTypes = {
  assignees: PropTypes.array,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
