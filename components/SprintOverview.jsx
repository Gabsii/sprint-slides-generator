import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { useMemo, useState } from 'react';
import { Table, useToasts } from '@zeit-ui/react';
import EditableCell from '@components/EditableCell';
import TableRow from '@components/TableRow';
import SortedIcon from '@components/SortedIcon';
import useColumns from '@utils/hooks/useColumns';

const TR = styled.tr`
  text-align: center;
`;

const TH = styled.th`
  background-color: lightgray;
  padding: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 0.8rem;

  border-bottom: 1px solid gray;
  border-top: 1px solid gray;

  &:first-of-type {
    border-top-left-radius: 0.5rem;
    border-left: 1px solid gray;
  }

  &:last-of-type {
    border-top-right-radius: 0.5rem;
    border-right: 1px solid gray;
  }
`;

const addForecast = (sprint, setToast) => {
  fetch(`/api/sprints/${sprint.id}`, {
    method: 'PUT',
    body: JSON.stringify({ sprint }),
  })
    .then(() =>
      setToast({
        text: 'Successfully updated the Forecast!',
        type: 'success',
      }),
    )
    .catch(() =>
      setToast({
        text:
          'Oh Oh! Something went wrong updating the Forecast. Contact the support!',
        type: 'error',
      }),
    );
};

const generateSprint = () => {
  // send data to api POST sprints/{id}
  // create sprint and send data back
  // reroute to sprint with ?editing=true set in URL
};

const SprintOverview = ({ sprints }) => {
  const [activeSprints, setActiveSprints] = useState(sprints);
  const [, setToast] = useToasts();

  const columns = useColumns();

  const data = useMemo(() => activeSprints, [activeSprints]);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setActiveSprints(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          const newRow = {
            ...old[rowIndex],
            [columnId]: value,
          };
          addForecast(newRow, setToast);
          return newRow;
        }
        return row;
      }),
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        EditableCell,
      },
      initialState: { sortBy: [{ id: 'endDate', desc: false }] },
      updateMyData,
    },
    useSortBy,
  );
  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <TR key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => (
              <TH
                key={j}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <SortedIcon column={column} />
              </TH>
            ))}
            <TH></TH>
          </TR>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return <TableRow key={i} row={row}></TableRow>;
        })}
      </tbody>
    </Table>
  );
};

export default SprintOverview;

SprintOverview.propTypes = {
  sprints: PropTypes.array,
};
