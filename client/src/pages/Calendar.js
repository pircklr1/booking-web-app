import React, { Component } from 'react';
import RoomList from '../components/RoomList';
import BookingForm from '../components/BookingForm';
import { Container, Responsive } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends Component {
  render() {
    return (
      <div>
        <Responsive
          minWidth={768}
          style={{
            backgroundColor: 'white',
            paddingTop: '5px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}
        >
          <Container style={{ overflow: 'auto' }}>
            <RoomList />
          </Container>
          <Container style={{ marginTop: 20 }}>
            <BookingForm />
          </Container>
        </Responsive>
        <Responsive
          {...Responsive.onlyMobile}
          style={{
            backgroundColor: 'white',
            paddingTop: '5px',
            paddingBottom: '20px',
            marginLeft: '0px',
            marginRight: '0px'
          }}
        >
          <Container style={{ overflow: 'auto' }}>
            <RoomList />
          </Container>
          <Container style={{ marginTop: 20 }}>
            <BookingForm />
          </Container>
        </Responsive>
      </div>
    );
  }
}

export default Calendar;
