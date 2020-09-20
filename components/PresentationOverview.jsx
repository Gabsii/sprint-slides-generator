import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useMemo } from 'react';
import { Pagination, Table, useTheme } from '@zeit-ui/react';
import ProgressiveImage from 'react-progressive-image';

import AvatarLoader from '@components/AvatarLoader';
import AvatarPlaceholder from '@components/AvatarPlaceholder';
import Image from '@components/Presentation/Image';
import TableRow from '@components/TableRow';
import SortedIcon from '@components/SortedIcon';
import { usePresentationColumns } from '@utils/hooks/useColumns';

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

const PresentationOverview = ({ presentations, isValidating, user }) => {
  const { palette } = useTheme();
  const columns = usePresentationColumns();
  const data = useMemo(() => presentations, [presentations]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        sortBy: [{ id: 'endDate', desc: true }],
      },
      pageCount: Math.ceil(data.length / 10),
    },
    useSortBy,
    usePagination,
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow key={i} row={row} disableEditable isPresentation />
            );
          })}
        </tbody>
      </Table>
      {Math.ceil(data.length / 10) > 1 && (
        <Pagination
          count={Math.ceil(data.length / 10)}
          limit={5}
          onChange={(page) => {
            gotoPage(page - 1);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <Pagination.Next>Next</Pagination.Next>
          <Pagination.Previous>Previous</Pagination.Previous>
        </Pagination>
      )}
    </>
  );
};

export default PresentationOverview;

PresentationOverview.propTypes = {
  presentations: PropTypes.array,
  isValidating: PropTypes.bool,
  user: PropTypes.object,
};
