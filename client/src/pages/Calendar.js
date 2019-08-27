import React, { Component } from 'react';
import RoomList from '../components/RoomList';
import BookingForm from '../components/BookingForm';
import {Container, Form, Responsive} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
// import { createBooking } from '../service/ClientService';


class Calendar extends Component {

  // newBooking = newbooking => {
  //   const obj = {
  //     ...newbooking
  //   };
  //   createBooking(obj, () => {
  //   });
  // };

  render() {
    return (
      <div>
        <Responsive minWidth={768} style={{backgroundColor: 'white',
            paddingTop: '5px', paddingBottom: '20px', paddingLeft: '20px',
            paddingRight: '20px'}}>
        <Container style={{ overflow: 'auto' }}>
          <RoomList />
        </Container>
        <Container style={{ marginTop: 20 }}>
          {/*<BookingForm addBooking={createBooking}/>*/}
            <BookingForm/>
        </Container>
        </Responsive>
        <Responsive {...Responsive.onlyMobile} style={{backgroundColor: 'white',
          paddingTop: '5px', paddingBottom: '20px', marginLeft: '0px', marginRight: '0px'}}>
          <Container style={{ overflow: 'auto' }}>
            <RoomList />
          </Container>
          <Container style={{ marginTop: 20 }}>
            {/*<BookingForm addBooking={createBooking}/>*/}
              <BookingForm/>
          </Container>
        </Responsive>
      </div>
    );
  }
}

export default Calendar;
