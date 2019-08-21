// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBookings from '../components/UserBookings';
import { getAllBookings } from '../service/ClientService';
import { Table, Container, Header } from 'semantic-ui-react';
function User() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllBookings(setData);
    setIsLoading(false);
  }, []);

  const renderTable = () => {
    return data.map(booking => {
      return (
        <Table.Row>
          <Table.Cell>{booking.start}</Table.Cell>
          <Table.Cell>{booking.end}</Table.Cell>
          <Table.Cell>{booking.status}</Table.Cell>
          <button class='ui button'>Muokkaa</button>
          <button class='ui button'>Poista</button>
        </Table.Row>
      );
    });
  };

  return (
    <div>
      <Container style={{ padding: '5em 0em' }}>
        {/*     <Message
          attached='top'
          content='Tulevat varaukset'
          icon='attention'
          warning
        /> */}
        <Header as='h4' attached='top' block>
          Tulevat varaukset
        </Header>
        <Table attached celled selectable>
          <Table.Header>
            <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
            <Table.HeaderCell>Kellonaika</Table.HeaderCell>
            <Table.HeaderCell>Tila</Table.HeaderCell>
          </Table.Header>
          <Table.Body> {renderTable()}</Table.Body>
        </Table>

        {/*     <Message
          attached='top'
          content='Tulevat varaukset'
          icon='attention'
          warning
        /> */}
        <Header as='h4' attached='top' block>
          Menenet ja perutut varaukset
        </Header>
        <Table attached celled selectable>
          <Table.Header>
            <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
            <Table.HeaderCell>Kellonaika</Table.HeaderCell>
            <Table.HeaderCell>Tila</Table.HeaderCell>
          </Table.Header>
          <Table.Body> {renderTable()}</Table.Body>
        </Table>
      </Container>
    </div>
  );
}

export default User;
