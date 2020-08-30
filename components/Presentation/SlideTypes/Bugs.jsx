import PropTypes from 'prop-types';

import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import {
  Overflowable,
  OverflowableItem,
} from '@components/Presentation/Overflowable';
import UnorderedList from '@components/Presentation/UnorderedList';

const Bugs = ({ bugs, isActive }) => (
  <Slide isActive={isActive}>
    <Heading type="h6" textAlign="left">
      Bugs
    </Heading>
    <Overflowable>
      <OverflowableItem>
        <UnorderedList listStyle="square">
          {bugs.map(bug => (
            <p key={`Bug-${bug.key}`}>{`${bug.key}: ${bug.fields.summary}`}</p>
          ))}
        </UnorderedList>
      </OverflowableItem>
    </Overflowable>
  </Slide>
);

export default Bugs;

Bugs.propTypes = {
  bugs: PropTypes.object,
  isActive: PropTypes.bool,
};
