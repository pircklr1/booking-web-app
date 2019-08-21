import React, { useState, useEffect } from 'react';
import { Table, TableRow } from 'semantic-ui-react';
import RoomRow from './RoomRow';
function CalendarTable() {
  const [data, setData] = useState([]);
  const [solu, setSolu] = useState([0, 1, 2, 3, 4]);
  const [huone, setHuone] = useState(['A', 'B', 'C']);

  useEffect(() => {
    setData([{ room: 1, time: 1 }, { room: 1, time: 4 }]);
  }, []);

  const renderRoomRows = () => {
    return huone.map(huoneNro => {
      return (
        <TableRow>
          <RoomRow huoneNro />
        </TableRow>
      );
    });
  };

  return (
    <div>
      <h1>Kalenteri</h1>
      <Table unstackable color={'blue'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Huone</Table.HeaderCell>
            <Table.HeaderCell>1</Table.HeaderCell>
            <Table.HeaderCell>2</Table.HeaderCell>
            <Table.HeaderCell>3</Table.HeaderCell>
            <Table.HeaderCell>4</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>x</Table.Cell>
            <Table.Cell>x</Table.Cell>
            <Table.Cell>x</Table.Cell>
            <Table.Cell>x</Table.Cell>
            <Table.Cell>x</Table.Cell>
          </Table.Row>
          {renderRoomRows()}
        </Table.Body>
      </Table>
    </div>
  );
}

export default CalendarTable;
