import PropTypes from 'prop-types';

import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import {
  Overflowable,
  OverflowableItem,
} from '@components/Presentation/Overflowable';
import UnorderedList from '@components/Presentation/UnorderedList';
import SavePresentation from '../SavePresentation';

const Bugs = ({ bugs, isActive, isSaved }) => (
  <Slide isActive={isActive}>
    <Heading type="h6" textAlign="left">
      {bugs.length + 1} Bugs
    </Heading>
    <Overflowable>
      <UnorderedList listStyle="square">
        {bugs.map(bug => (
          <p key={`Bug-${bug.key}`}>{`${bug.key}: ${bug.fields.summary}`}</p>
        ))}
      </UnorderedList>
    </Overflowable>
    {!isSaved && <SavePresentation />}
  </Slide>
);

export default Bugs;

Bugs.propTypes = {
  bugs: PropTypes.array,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};
