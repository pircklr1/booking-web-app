// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect, useContext } from 'react';
import {getUserBookings, getRoomData, adminDeleteBooking} from '../service/ClientService';
import { Button, Table, Container, Header, Grid, Icon, Modal, Confirm } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';

function User() {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUserBookings(currentUser.id, setData);
    getRoomData(setRooms);
    setIsLoading(false);
  }, []);

  const roomName = (roomId) => {
    return rooms.map(room=> {
      if(room.id === roomId){
        return room.name;
      }
    })
  };

  const deleteBooking = (bookingId) => {
    adminDeleteBooking(bookingId)
        .then(function(response){
          getUserBookings(currentUser.id, setData);
          setOpen(false);
    })
  };

  const show = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const setRoomId = (id) => {
    setRoom(id);
  };

//future bookings
  const renderUserBookingTable = () => {
    return data.sort((a,b)=>a.bookingDate > b.bookingDate).map(booking => {
      let now = moment();
      if(moment(booking.bookingDate).isSameOrAfter(moment(now).format('YYYY-MM-DD'))){
      return (
        <Table.Row key={booking.id}>
          <Table.Cell collapsing textAlign='center'>
            {moment(booking.bookingDate).format('DD.MM.YYYY')}
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            {booking.startTime.substring(0, 5)}-
            {booking.endTime.substring(0, 5)}
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            {roomName(booking.roomId)}
          </Table.Cell>
          <Table.Cell collapsing textAlign='center'>
            {/*<Button negative basic icon onClick={() =>deleteBooking(booking.id)}>*/}
            {/*  <i className='trash icon' />*/}
            {/*</Button>*/}
            <Button negative basic icon onClick={(event)=>{show() ; setRoomId(booking.id)}}>
              <i className='trash icon' />
            </Button>
                <Confirm
                    open={open}
                    onCancel={handleCancel}
                    cancelButton='Takaisin'
                    confirmButton="Peru varaus"
                    onConfirm={() =>deleteBooking(room)}
                    content='Haluatko varmasti perua varauksen?'
                />
          </Table.Cell>
        </Table.Row>
      );}
    });
  };

  //past bookings
  const renderUserPastBookingTable = () => {
    return data.map(booking => {
      let now = moment();
      if(moment(booking.bookingDate).isBefore(moment(now).format('YYYY-MM-DD'))){
          // && moment(booking.endTime).isBefore(moment(now).format('HH:mm:ss'))){
      return (
          <Table.Row key={booking.id}>
            <Table.Cell collapsing textAlign='center'>
              {moment(booking.bookingDate).format('DD.MM.YYYY')}
            </Table.Cell>
            <Table.Cell collapsing textAlign='center'>
              {booking.startTime.substring(0, 5)}-
              {booking.endTime.substring(0, 5)}
            </Table.Cell>
            <Table.Cell collapsing textAlign='center'>
              {roomName(booking.roomId)}
            </Table.Cell>
            <Table.Cell collapsing textAlign='center'>
              <Icon name='times'/>
            </Table.Cell>
          </Table.Row>
      );}
    });
  };

  return (
    <div>
      <Container style={{ padding: '5em 0em' , overflow: 'auto'}}>
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header textAlign='left'>Hei, {currentUser.name}!</Header>
            <Header as='h2' attached='top' block >
              Tulevat varaukset
            </Header>
            <Table unstackable color={'blue'} celled>
            {/*<Table attached celled selectable textAlign='center'>*/}
              <Table.Header>
                <Table.Row>
                <Table.HeaderCell >Varauspäivä</Table.HeaderCell>
                <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                <Table.HeaderCell>Huone</Table.HeaderCell>
                <Table.HeaderCell>Peruuta</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{renderUserBookingTable()}</Table.Body>
            </Table>
            <Header as='h2' attached='top' block>
              Menneet varaukset
            </Header>
            <Table unstackable color={'blue'} celled>
              <Table.Header>
                <Table.Row>
                <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                <Table.HeaderCell>Huone</Table.HeaderCell>
                <Table.HeaderCell>Peruuta</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{renderUserPastBookingTable()}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default User;
