import PropTypes from 'prop-types';

import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import {
  Overflowable,
  OverflowableItem,
} from '@components/Presentation/Overflowable';
import Text from '@components/Presentation/Text';
import UnorderedList from '@components/Presentation/UnorderedList';

// TODO: fix CSS column overflow issue with too many stories
const Overview = ({ stories, isActive }) => {
  console.log(Object.entries(stories));
  return (
    <Slide isActive={isActive}>
      <Heading type="h6" textAlign="left">
        Overview
        {/* //TODO reduce to story count */}
      </Heading>
      <Overflowable>
        {Object.entries(stories).map(groupedStories => (
          <OverflowableItem key={groupedStories[0]}>
            <Text textAlign="left">{groupedStories[0]}</Text>
            <UnorderedList
              style={{ display: 'flex', flexFlow: 'column wrap' }}
              listStyle="none"
            >
              {groupedStories[1].map(story => (
                <p style={{ margin: 0 }} key={`Overview-${story.key}`}>
                  {story.fields.summary}
                </p>
              ))}
            </UnorderedList>
          </OverflowableItem>
        ))}
      </Overflowable>
    </Slide>
  );
};

export default Overview;

Overview.propTypes = {
  stories: PropTypes.object,
  isActive: PropTypes.bool,
};
