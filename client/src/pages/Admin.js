// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect } from 'react';
import {
  getAllUsers,
  getAllBookings,
  getAllRooms
} from '../service/ClientService';
import {
  Button,
  Table,
  Container,
  Header,
  Icon,
  Grid
} from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from '../components/admin/DeleteButton';
function Admin() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllBookings(setData);
    getAllUsers(setUserData);
    getAllRooms(setRoomData);
    setIsLoading(false);
  }, []);

  const renderBookingTable = () => {
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

  const renderUserTable = () => {
    return userData.map(user => {
      return (
        <Table.Row>
          <Table.Cell>
            {user.firstName} {user.lastName}
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>

          {/* <Table.Cell textAlign='center'>
            <Icon color='green' name='checkmark' size='large' />
          </Table.Cell> */}
          {/* <Button ui primary basic icon>
            <i className=' edit icon' />
          </Button> */}
          <Table.Cell collapsing textAlign='center'>
            <DeleteButton id={user.id} type={'user'} />
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  const renderRoomTable = () => {
    return roomData.map(room => {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell>{room.name}</Table.Cell>
          {/* <Table.Cell>{room.role}</Table.Cell>
          <Table.Cell>0</Table.Cell>
          <Button ui primary basic icon>
            <i className=' edit icon' />
          </Button> */}
          <Table.Cell collapsing textAlign='center'>
            <DeleteButton id={room.id} type={'room'} />
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <div>
      <Container style={{ padding: '5em 0em' }}>
        <Grid
          textAlign='center'
          style={{ height: '70vh' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' attached='top' block>
              Käyttäjät
            </Header>
            <Table attached celled selectable textAlign='center'>
              <Table.Header>
                <Table.HeaderCell>Nimi</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                {/*   <Table.HeaderCell>Admin</Table.HeaderCell> */}
                <Table.HeaderCell>Poista</Table.HeaderCell>
              </Table.Header>
              <Table.Body> {renderUserTable()}</Table.Body>
            </Table>

            {/*     <Message
          attached='top'
          content='Tulevat varaukset'
          icon='attention'
          warning
        /> */}
            <Header as='h2' attached='top' block collapsing>
              Varaukset
            </Header>
            <Table attached celled selectable textAlign='center'>
              <Table.Header>
                <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                <Table.HeaderCell>Peruuta</Table.HeaderCell>
              </Table.Header>
              <Table.Body> {renderBookingTable()}</Table.Body>
            </Table>

            {/*     <Message
          attached='top'
          content='Tulevat varaukset'
          icon='attention'
          warning
        /> */}
            {/*         <Header as='h4' attached='top' block collapsing>
              Menneet ja perutut varaukset
            </Header>
            <Table attached celled selectable textAlign='center'>
              <Table.Header>
                <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                <Table.HeaderCell>Peruuta</Table.HeaderCell>
              </Table.Header>
              <Table.Body> {renderBookingTable()}</Table.Body>
            </Table> */}

            <Header as='h2' attached='top' block>
              Huoneet
            </Header>
            <Table attached celled selectable>
              <Table.Header>
                <Table.HeaderCell textAlign='center'>Nimi</Table.HeaderCell>
                {/*   <Table.HeaderCell>Varausten lkm</Table.HeaderCell> */}
                <Table.HeaderCell>Poista</Table.HeaderCell>
              </Table.Header>
              <Table.Body> {renderRoomTable()}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default Admin;
