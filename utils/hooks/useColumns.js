/* eslint-disable prettier/prettier */
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { format } from 'date-fns';
import { Dot, Link, Text } from '@zeit-ui/react';

const Header = ({ column, text }) => (
  <Text span i={column.isSorted}>
    {text}
  </Text>
);

Header.propTypes = {
  column: PropTypes.object,
  text: PropTypes.string,
};

export const usePresentationColumns = () => {
  const completionRate = (originalRow) =>
    Math.ceil((originalRow.achievement / originalRow.forecast) * 100);

  return useMemo(
    () => [
      {
        Header: (data) => <Header column={data.column} text="Sprint Name" />,
        id: 'name',
        accessor: (originalRow) => (
          <NextLink href={`/sprint/${originalRow.slug}`} passHref>
            <Link block>{originalRow.name}</Link>
          </NextLink>
        ),
      },
      {
        Header: (data) => <Header column={data.column} text="End Date" />,
        id: 'endDate',
        accessor: (originalRow) =>
          format(new Date(originalRow.endDate), 'dd-MM-yyyy'),
      },
      {
        Header: (data) => <Header column={data.column} text="Forecast" />,
        accessor: 'forecast',
      },
      {
        Header: (data) => <Header column={data.column} text="Achievement" />,
        accessor: 'achievement',
      },
      {
        Header: (data) => (
          <Header column={data.column} text="Completion Rate" />
        ),
        id: 'completionRate',
        sortType: (rowA, rowB) =>
          completionRate(rowA.original) > completionRate(rowB.original)
            ? -1
            : completionRate(rowA.original) < completionRate(rowB.original)
              ? 1
              : 0,
        accessor: (originalRow) => {
          const completion = completionRate(originalRow);

          const type =
            completion < 75
              ? 'error'
              : completion < 100
                ? 'warning'
                : 'success';
          return (
            <>
              {completion}%
              <Dot style={{ marginLeft: '1rem' }} type={type} />
            </>
          );
        },
      },
    ],
    [],
  );
};

const useSprintColumns = () =>
  useMemo(
    () => [
      {
        Header: (data) => <Header column={data.column} text="Sprint Name" />,
        accessor: 'name',
      },
      {
        Header: (data) => <Header column={data.column} text="Start Date" />,
        id: 'startDate',
        accessor: (originalRow) =>
          format(new Date(originalRow.startDate), 'dd-MM-yyyy'),
      },
      {
        Header: (data) => <Header column={data.column} text="End Date" />,
        id: 'endDate',
        accessor: (originalRow) =>
          format(new Date(originalRow.endDate), 'dd-MM-yyyy'),
      },
      {
        Header: (data) => <Header column={data.column} text="Forecast" />,
        accessor: 'forecast',
      },
    ],
    [],
  );
export default useSprintColumns;
