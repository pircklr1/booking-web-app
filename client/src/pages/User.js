// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getUserBookings } from '../service/ClientService';
import { Button, Table, Container, Header, Grid } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from '../components/admin/DeleteButton';

import { AuthContext } from '../context/auth';

function User() {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserBookings(currentUser.id, setData);
    setIsLoading(false);
  }, []);

  const renderUserBookingTable = () => {
    return data.map(booking => {
      return (
        <Table.Row>
          <Table.Cell collapsing textAlign='center'>
            {moment(booking.bookingDate).format('DD.MM.YYYY')}
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            {booking.startTime.substring(0, 5)}-
            {booking.endTime.substring(0, 5)}
          </Table.Cell>

          {/*  <Button ui primary basic icon>
            <i className='edit icon' />
          </Button> */}
          <Table.Cell collapsing textAlign='center'>
            <DeleteButton id={booking.id} type='booking' />
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <div>
      <Container style={{ padding: '5em 0em' }}>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header textAlign='left'>Hei, {currentUser.name}!</Header>
            <Header as='h2' attached='top' block collapsing>
              Omat varaukset
            </Header>
            <Table attached celled selectable textAlign='center'>
              <Table.Header>
                <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                <Table.HeaderCell>Peruuta</Table.HeaderCell>
              </Table.Header>
              <Table.Body> {renderUserBookingTable()}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default User;
