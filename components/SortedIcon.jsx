import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp, ChevronUpDown } from '@zeit-ui/react-icons';

const SortedIcon = ({ column }) => (
  <span>
    {column.isSorted ? (
      column.isSortedDesc ? (
        <ChevronDown size={12} />
      ) : (
        <ChevronUp size={12} />
      )
    ) : (
      <ChevronUpDown size={12} />
    )}
  </span>
);

export default SortedIcon;

SortedIcon.propTypes = {
  column: PropTypes.object,
};
