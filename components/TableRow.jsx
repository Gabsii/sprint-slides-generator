import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Popover, useClickAway, useTheme } from '@zeit-ui/react';
import useFocus from '@utils/hooks/useFocus';
import { useRef, useState } from 'react';
import slugify from 'slugify';
import Link from 'next/link';

const TR = styled.tr`
  text-align: center;
`;

const TD = styled.td`
  padding: 0.66rem;
  text-align: center;
  font-size: 14px;
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
          {original.forecast === 0 ? (
            'Generate Sprint Slides'
          ) : (
            <Link
              href="/sprint/[slug]"
              as={`/sprint/${slugify(original.name, {
                lower: true,
                locale: 'de',
                remove: /[*+~.()'"!:@]/g,
              })}`}
            >
              <a>Generate Sprint Slides</a>
            </Link>
          )}
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
  const { palette } = useTheme();

  return (
    <TR {...row.getRowProps()}>
      {row.cells.map((cell, j) => (
        <TD
          {...cell.getCellProps()}
          key={j}
          style={{ borderBottom: `1px solid ${palette.accents_2}` }}
        >
          {cell.column.id === 'forecast'
            ? cell.render('EditableCell', { inputRef })
            : cell.render('Cell')}
        </TD>
      ))}
      <TD style={{ borderBottom: `1px solid ${palette.accents_2}` }}>
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
