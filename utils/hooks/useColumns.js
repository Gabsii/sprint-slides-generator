/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { format } from 'date-fns';
import { Text } from '@zeit-ui/react';
import PropTypes from 'prop-types';

const Header = ({ column, text }) => (
  <Text span i={column.isSorted}>
    {text}
  </Text>
);

Header.propTypes = {
  column: PropTypes.object,
  text: PropTypes.string,
};

const useColumns = () =>
  useMemo(
    () => [
      {
        Header: ({ column }) => <Header column={column} text="Sprint Name" />,
        accessor: 'name',
      },
      {
        Header: ({ column }) => <Header column={column} text="Start Date" />,
        id: 'startDate',
        accessor: originalRow =>
          format(new Date(originalRow.startDate), 'dd-MM-yyyy'),
      },
      {
        Header: ({ column }) => <Header column={column} text="End Date" />,
        id: 'endDate',
        accessor: originalRow =>
          format(new Date(originalRow.endDate), 'dd-MM-yyyy'),
      },
      {
        Header: ({ column }) => <Header column={column} text="Forecast" />,
        accessor: 'forecast',
      },
    ],
    [],
  );
export default useColumns;
