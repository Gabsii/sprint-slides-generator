import PropTypes from 'prop-types';

import Slide from '@components/Presentation/Slide';
import Card from '@components/Card';
import SavePresentation from '../SavePresentation';
import styled from 'styled-components';

const StoryHeading = styled.h1`
  position: absolute;
  top: 50px;

  font-size: 48px;
  font-size: 4vmax;
  text-align: center;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const TeamOverview = ({ assignees, isActive, isSaved }) => (
  <Slide isActive={isActive}>
    <StoryHeading
      type="h6"
      textAlign="left"
      style={{ position: 'absolute', top: '50px' }}
    >
      Team
    </StoryHeading>
    <Grid>
      {assignees.map(assignee => (
        <Card
          key={`Team-${assignee.name}`}
          alt={assignee.name}
          name={assignee.displayName}
          src={`/api/users/${assignee.name}?size=xxlarge`}
        />
      ))}
    </Grid>
    {!isSaved && <SavePresentation />}
  </Slide>
);

export default TeamOverview;

TeamOverview.propTypes = {
  assignees: PropTypes.array,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
