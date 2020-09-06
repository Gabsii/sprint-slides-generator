import PropTypes from 'prop-types';
import styled from 'styled-components';

import Slide from '@components/Presentation/Slide';
import Grid from '@components/Presentation/Grid';
import Story from '@components/Story';

const StoryHeading = styled.h1`
  position: relative;
  top: 50px;

  font-size: 48px;
  text-align: center;
  color: white;
`;

const StoriesSlide = ({ heading, isActive, stories }) => (
  <Slide isActive={isActive}>
    <StoryHeading type="h4">{heading}</StoryHeading>
    <Grid columns={stories.length === 2 ? 2 : 1} width="90%">
      {stories.map((story, index) => (
        <Story
          key={`Story-${heading}-${index}`}
          assignee={story.fields.assignee}
          story={story}
          hasBorder={index % 2 === 1}
        />
      ))}
    </Grid>
  </Slide>
);
export default StoriesSlide;

StoriesSlide.propTypes = {
  heading: PropTypes.string,
  isActive: PropTypes.bool,
  stories: PropTypes.array,
};
