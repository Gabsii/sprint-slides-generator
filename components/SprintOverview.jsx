import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const TR = styled.tr`
  text-align: center;
`;

const TH = styled.th`
  background-color: lightgray;
  padding: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 0.9rem;

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

const SprintOverview = () => (
  <Table>
    <thead>
      <TR>
        <TH>Sprint #</TH>
        <TH>Team</TH>
        <TH>Finished/Forecast</TH>
        <TH>Performance</TH>
        <TH></TH>
      </TR>
    </thead>
    <tbody>
      <TR>
        <TD>Sprint 32</TD>
        <TD>Team Z</TD>
        <TD>30/32</TD>
        <TD>~</TD>
        <TD>Edit</TD>
      </TR>
      <TR>
        <TD>Sprint 29</TD>
        <TD>Team X</TD>
        <TD>14/18</TD>
        <TD>-</TD>
        <TD>Edit</TD>
      </TR>
      <TR>
        <TD>Sprint 12</TD>
        <TD>Team W</TD>
        <TD>40/32</TD>
        <TD>+</TD>
        <TD>Edit</TD>
      </TR>
    </tbody>
  </Table>
);

export default SprintOverview;
