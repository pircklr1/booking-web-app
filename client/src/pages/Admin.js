// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBookings from '../components/UserBookings';
import { getAllUsers, getAllBookings } from '../service/ClientService';
import { Button, Table, Container, Header } from 'semantic-ui-react';
import moment from 'moment';
function Admin() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllBookings(setData);
    getAllUsers(setUserData);
    setIsLoading(false);
  }, []);

  const renderTable = () => {
    return data.map(booking => {
      return (
        <Table.Row>
          <Table.Cell>{moment(booking.start).format('DD.MM.YYYY')}</Table.Cell>
          <Table.Cell>
            {moment(booking.start).format('HH:MM')}-
            {moment(booking.end).format('HH:MM')}
          </Table.Cell>
          <Table.Cell>{booking.status}</Table.Cell>
          <Button ui primary basic icon>
            <i class='edit icon' />
          </Button>
          <Button ui negative basic icon>
            <i class='trash icon' />
          </Button>
        </Table.Row>
      );
    });
  };

  const renderUserTable = () => {
    return userData.map(user => {
      return (
        <Table.Row>
          <Table.Cell>
            {user.firstName} {user.lastName}
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Button ui primary basic icon>
            <i class=' edit icon' />
          </Button>
          <Button ui negative basic icon>
            <i class='trash icon' />
          </Button>
        </Table.Row>
      );
    });
  };

  return (
    <div>
      <Container style={{ padding: '5em 0em' }}>
        <Header as='h4' attached='top' block>
          Käyttäjät
        </Header>
        <Table attached celled selectable>
          <Table.Header>
            <Table.HeaderCell>Nimi</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
            <Table.HeaderCell>Varaukset</Table.HeaderCell>
          </Table.Header>
          <Table.Body> {renderUserTable()}</Table.Body>
        </Table>
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
          Menneet ja perutut varaukset
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

export default Admin;
