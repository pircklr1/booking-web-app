import React, { Component } from 'react';
import RoomList from '../components/RoomList';
import BookingForm from '../components/BookingForm';
import {Container, Form, Responsive} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import { createBooking} from '../service/ClientService';


class Calendar extends Component {

  newBooking = newbooking => {
    const obj = {
      ...newbooking
    };
    createBooking(obj, () => {
    });
  };

  render() {
    return (
      <div>
        <Responsive minWidth={768} style={{'background-color': 'white',
          'padding-top': '5px', 'padding-bottom': '20px', 'padding-left': '20px',
          'padding-right': '20px'}}>
        <Container style={{ overflow: 'auto' }}>
          <RoomList />
        </Container>
        <Container style={{ marginTop: 20 }}>
          <BookingForm addBooking={this.newBooking}/>
        </Container>
        </Responsive>
        <Responsive {...Responsive.onlyMobile} style={{'background-color': 'white',
          'padding-top': '5px', 'padding-bottom': '10px', 'margin-left': '0px', 'margin-right': '0px'}}>
          <Container style={{ overflow: 'auto' }}>
            <RoomList />
          </Container>
          <Container style={{ marginTop: 20 }}>
            <BookingForm addBooking={this.newBooking}/>
          </Container>
        </Responsive>
      </div>
    );
  }
}

export default Calendar;
