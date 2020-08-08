import { useMemo } from 'react';
import { format } from 'date-fns';

const useColumns = () =>
  useMemo(
    () => [
      {
        Header: 'Sprint Name',
        accessor: 'name',
      },
      {
        Header: 'Start Date',
        id: 'startDate',
        accessor: originalRow =>
          format(new Date(originalRow.startDate), 'dd-MM-yyyy'),
      },
      {
        Header: 'End Date',
        id: 'endDate',
        accessor: originalRow =>
          format(new Date(originalRow.endDate), 'dd-MM-yyyy'),
      },
      {
        Header: 'Forecast',
        accessor: 'forecast',
      },
    ],
    [],
  );

export default useColumns;
