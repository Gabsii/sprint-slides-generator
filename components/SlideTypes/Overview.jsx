import PropTypes from 'prop-types';

import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import {
  Overflowable,
  OverflowableItem,
} from '@components/Presentation/Overflowable';
import Text from '@components/Presentation/Text';
import SavePresentation from '../SavePresentation';
import UnorderedList from '@components/Presentation/UnorderedList';

// TODO: fix CSS column overflow issue with too many stories
const Overview = ({ stories, isActive, isSaved }) => (
  <Slide isActive={isActive}>
    <Heading type="h6" textAlign="left">
      Overview
      {/* //TODO reduce to story count */}
    </Heading>
    <Overflowable>
      {Object.entries(stories)
        .sort(([, first], [, second]) => {
          if (first.length < second.length) {
            return 1;
          } else if (first.length > second.length) {
            return -1;
          }
          return 0;
        })
        .map(([projectName, stories]) => (
          <OverflowableItem key={projectName}>
            <Text textAlign="left">{projectName}</Text>
            <UnorderedList
              style={{ display: 'flex', flexFlow: 'column wrap' }}
              listStyle="square"
            >
              {stories.map(story => (
                <p style={{ margin: 0 }} key={`Overview-${story.key}`}>
                  {story.fields.summary}
                </p>
              ))}
            </UnorderedList>
          </OverflowableItem>
        ))}
    </Overflowable>
    {!isSaved && <SavePresentation />}
  </Slide>
);

export default Overview;

Overview.propTypes = {
  stories: PropTypes.object,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
