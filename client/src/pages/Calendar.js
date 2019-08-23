import React, { Component } from 'react';
import RoomList from '../components/RoomList';
import BookingForm from '../components/BookingForm';

import { Container, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import { createBooking } from '../service/ClientService';

var toinenarvo = 1;
console.log(toinenarvo);
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }
  newBooking = newbooking => {
    const obj = {
      ...newbooking
    };
    createBooking(obj, () => {
      // this.getListAndUpdate();
    });
  };

  render() {
    return (
      <div>
        <Container>
          {' '}
          <Form style={{ marginTop: 20 }}>
            <Form.Group>
              <Form.Input>
                <DatePicker
                  dateFormat='dd/MM/yyyy'
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                  locale={fi}
                />
              </Form.Input>
            </Form.Group>
          </Form>
        </Container>
        <Container style={{ overflow: 'auto' }}>
          <RoomList />
        </Container>
        <Container style={{ marginTop: 20 }}>
          <BookingForm />
        </Container>
        <Container style={{ marginTop: 20 }}>
          <BookingForm addBooking={this.newBooking} />
        </Container>
      </div>
    );
  }
}

export default Calendar;
