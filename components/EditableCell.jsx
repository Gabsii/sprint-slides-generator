import { Input } from '@zeit-ui/react';
import { Check } from '@zeit-ui/react-icons';
import PropTypes from 'prop-types';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  inputRef,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  const [isFocused, setFocused] = React.useState(false);

  const onChange = e => {
    setValue(
      isNaN(parseFloat(e.target.value)) ? '' : parseFloat(e.target.value),
    );
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    setFocused(false);
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      ref={inputRef}
      width="100px"
      iconClickable={isFocused}
      iconRight={<Check color={isFocused ? 'green' : '#efefef'} />}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={() => setFocused(true)}
    />
  );
};

export default EditableCell;

EditableCell.propTypes = {
  value: PropTypes.number,
  row: PropTypes.object,
  column: PropTypes.object,
  index: PropTypes.number,
  updateMyData: PropTypes.func,
  inputRef: PropTypes.object,
};
