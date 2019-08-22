import React, { Component } from 'react';
import RoomList from '../components/RoomList';
import BookingForm from '../components/BookingForm';
import {Container, Form} from 'semantic-ui-react';
import DatePickers from "../components/DatePicker";

class Calendar extends Component {
  render() {
    return (
      <div>
          <Container>  <Form style={{marginTop: 20}}>
              <Form.Group>
                  <Form.Input>
                      <DatePickers/>
                  </Form.Input>
              </Form.Group>
          </Form></Container>
        <Container style={{ overflow: 'auto' }}>
          <RoomList/>
        </Container>
          <Container style={{marginTop: 20}}>
        <BookingForm/>
          </Container>
      </div>
    );
  }
}

export default Calendar;
