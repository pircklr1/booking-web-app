import React, { Component } from 'react';
import RoomList from '../components/RoomList';
import BookingForm from '../components/BookingForm';
import { Container, Form } from 'semantic-ui-react';
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
        <Container style={{ overflow: 'auto' }}>
          <RoomList />
        </Container>
        <Container style={{ marginTop: 20 }}>
          <BookingForm addBooking={this.newBooking}/>
        </Container>
      </div>
    );
  }
}

export default Calendar;
