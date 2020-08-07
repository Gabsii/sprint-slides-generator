import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { useMemo, useState } from 'react';
import { format, isMatch } from 'date-fns';
import { Table } from '@zeit-ui/react';
import EditableCell from './EditableCell';
import TableRow from './TableRow';
import { ChevronDown, ChevronUp, ChevronUpDown } from '@zeit-ui/react-icons';

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

const addForecast = (original, activeSprints, setActiveSprints) => {
  console.log({ original, activeSprints });
  // fetch PUT to sprints/{id}
  // append original as data
  // create database entry in api route
  // maybe pop up a notification

  // setActiveSprints(activeSprints);
};

const generateSprint = () => {
  // send data to api POST sprints/{id}
  // create sprint and send data back
  // reroute to sprint with ?editing=true set in URL
};

const SprintOverview = ({ sprints }) => {
  const [activeSprints, setActiveSprints] = useState(sprints);

  const defaultColumn = {
    EditableCell,
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Sprint Name',
        accessor: 'name',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
      },
      {
        Header: 'Forecast',
        accessor: 'forecast',
      },
    ],
    [],
  );

  const data = useMemo(
    () =>
      activeSprints.map(sprint => {
        sprint.startDate = !isMatch(sprint.startDate, 'dd/MM/yyyy')
          ? format(new Date(sprint.startDate), 'dd/MM/yyyy')
          : sprint.startDate;
        sprint.endDate = !isMatch(sprint.endDate, 'dd/MM/yyyy')
          ? format(new Date(sprint.endDate), 'dd/MM/yyyy')
          : sprint.endDate;
        sprint.forecast = sprint.forecast || 0;
        return sprint;
      }),
    [activeSprints],
  );

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setActiveSprints(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
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
      defaultColumn,
      initialState: { sortBy: [{ id: 'endDate', desc: false }] },
      updateMyData,
    },
    useSortBy,
  );
  return (
    <>
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
    </>
  );
};

export default SprintOverview;

SprintOverview.propTypes = {
  sprints: PropTypes.array,
};
