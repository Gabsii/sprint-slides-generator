import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Popover, useClickAway } from '@zeit-ui/react';
import useFocus from '@utils/hooks/useFocus';
import { useRef, useState } from 'react';

const TR = styled.tr`
  text-align: center;
`;

const TD = styled.td`
  border-bottom: 1px solid gray;
  padding: 1rem;
  text-align: center;

  &:first-of-type {
    border-left: 1px solid gray;
  }

  &:last-of-type {
    border-right: 1px solid gray;
  }
`;

const popoverContent = (original, setInputFocus, setVisible) => {
  const forecastButton = () => {
    setVisible(false);
    setInputFocus(true);
  };
  return (
    <>
      <Popover.Item title>
        <span>Actions</span>
      </Popover.Item>
      <Popover.Item>
        <Button disabled={original.forecast === 0}>
          Generate Sprint Slides
        </Button>
      </Popover.Item>
      <Popover.Item>
        <Button onClick={() => forecastButton()}>
          {original.forecast === 0 ? 'Set' : 'Change'} Forecast
        </Button>
      </Popover.Item>
    </>
  );
};

const TableRow = ({ row }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [inputRef, setInputFocus] = useFocus();
  useClickAway(ref, () => setVisible(false));

  return (
    <TR {...row.getRowProps()}>
      {row.cells.map((cell, j) => (
        <TD key={j} {...cell.getCellProps()}>
          {cell.column.id === 'forecast'
            ? cell.render('EditableCell', { inputRef })
            : cell.render('Cell')}
        </TD>
      ))}
      <TD>
        <Popover
          content={popoverContent(row.original, setInputFocus, setVisible)}
          visible={visible}
          onVisibleChange={next => {
            setVisible(next);
          }}
        >
          <Button auto type="secondary">
            Actions
          </Button>
        </Popover>
      </TD>
    </TR>
  );
};

export default TableRow;

TableRow.propTypes = {
  row: PropTypes.object,
};
