import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { useMemo, useState } from 'react';
import { Table, useToasts, useTheme } from '@zeit-ui/react';
import ProgressiveImage from 'react-progressive-image';

import AvatarLoader from '@components/AvatarLoader';
import AvatarPlaceholder from '@components/AvatarPlaceholder';
import EditableCell from '@components/EditableCell';
import Image from '@components/Presentation/Image';
import TableRow from '@components/TableRow';
import SortedIcon from '@components/SortedIcon';
import useColumns from '@utils/hooks/useColumns';

const TR = styled.tr`
  text-align: center;
`;

const TH = styled.th`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 0.8rem;

  padding: 1rem;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;

  cursor: pointer;

  &:first-of-type {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-left: 1px solid gray;
  }

  &:last-of-type {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-right: 1px solid gray;
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 100;
`;

const addForecast = (sprint, setToast) => {
  fetch(`/api/sprints/${sprint.id}`, {
    method: 'PATCH',
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

const SprintOverview = ({ sprints, isValidating, user }) => {
  const [activeSprints, setActiveSprints] = useState(sprints);
  const [, setToast] = useToasts();
  const { palette } = useTheme();
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
    <>
      {isValidating ? (
        <Overlay>
          <ProgressiveImage
            src={`/api/users/${user.name}?size=xxlarge`}
            placeholder=""
          >
            {(src, loading) =>
              loading ? (
                <AvatarLoader>
                  <AvatarPlaceholder />
                </AvatarLoader>
              ) : (
                <AvatarLoader>
                  <Image src={src} alt={user.name} rounded={true} />
                </AvatarLoader>
              )
            }
          </ProgressiveImage>
        </Overlay>
      ) : null}
      <Table {...getTableProps()} style={{ position: 'relative' }}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <TR key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <TH
                  key={j}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    backgroundColor: palette.accents_1,
                    color: palette.accents_5,
                  }}
                >
                  {column.render('Header')}
                  <SortedIcon column={column} />
                </TH>
              ))}
              <TH
                style={{
                  backgroundColor: palette.accents_1,
                  color: palette.accents_5,
                }}
              />
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
  isValidating: PropTypes.bool,
  user: PropTypes.object,
};
