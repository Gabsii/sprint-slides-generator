/* eslint-disable react/prop-types */
import UL, { LI } from '@components/Presentation/UnorderedList';

export default {
  list: props => <UL>{props.children}</UL>,
  listItem: props => <LI>{props.children}</LI>,
};
