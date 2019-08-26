// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserBookings from '../components/UserBookings';
import { getAllBookings } from '../service/ClientService';
import { getUserBookings } from '../service/ClientService';
import { Button, Table, Container, Header } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';

function User() {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("USER page, currentuser's id");
    console.log(currentUser.id);
    setIsLoading(true);
    //getAllBookings(setData);
    getUserBookings(currentUser.id, setData);
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
        <Header>Hei, {currentUser.name}!</Header>
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
