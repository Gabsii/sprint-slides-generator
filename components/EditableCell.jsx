import { Input, Text, Tooltip, useTheme } from '@zeit-ui/react';
import { Check } from '@zeit-ui/react-icons';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  inputRef,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const [isFocused, setFocused] = useState(false);
  const [status, setStatus] = useState('default');

  const { palette } = useTheme();

  const onChange = (e) => {
    if (isNaN(e.target.value)) {
      setStatus('error');
      return;
    }
    setValue(e.target.value);
    setStatus('default');
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    setFocused(false);
    value > 0 &&
      parseFloat(value) !== initialValue &&
      updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <>
      <Input
        ref={inputRef}
        width="100px"
        status={status}
        pattern="[+-]?([0-9]*[.])?[0-9]+"
        iconClickable={isFocused}
        iconRight={
          <Check color={isFocused ? palette.success : palette.accents_1} />
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={() => setFocused(true)}
      />
      {status === 'error' && (
        <Tooltip text="For example 40.75, 30.0 or 25">
          <Text small type={status}>
            Expected decimal number <br />
          </Text>
        </Tooltip>
      )}
    </>
  );
};

export default EditableCell;

EditableCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  row: PropTypes.object,
  column: PropTypes.object,
  index: PropTypes.number,
  updateMyData: PropTypes.func,
  inputRef: PropTypes.object,
};
