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
        Header: data => <Header column={data.column} text="Sprint Name" />,
        accessor: 'name',
      },
      {
        Header: data => <Header column={data.column} text="Start Date" />,
        id: 'startDate',
        accessor: originalRow =>
          format(new Date(originalRow.startDate), 'dd-MM-yyyy'),
      },
      {
        Header: data => <Header column={data.column} text="End Date" />,
        id: 'endDate',
        accessor: originalRow =>
          format(new Date(originalRow.endDate), 'dd-MM-yyyy'),
      },
      {
        Header: data => <Header column={data.column} text="Forecast" />,
        accessor: 'forecast',
      },
    ],
    [],
  );
export default useColumns;
