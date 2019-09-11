import React, { Component } from 'react';
import { Table, Form } from 'semantic-ui-react';
import RoomRow from './RoomRow';
import moment from 'moment';
import './Table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import { getAllBookings, getAllRooms } from '../service/ClientService';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      rooms: [],
      bookings: []
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateBookings = this.updateBookings.bind(this);
    this.updateRooms = this.updateRooms.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  componentDidMount() {
    this.updateBookings();
    this.updateRooms();
  }

  // gets all rooms from database and and sets them to state as a list.
  updateRooms() {
    getAllRooms(list => {
      this.setState({ rooms: list });
    });
  }

  // gets all bookings from database and and sets them to state as a list.
  updateBookings() {
    getAllBookings(list => {
      this.setState({ bookings: list });
    });
  }

  render() {
    const allRooms = this.state.rooms.map(room => {
      return (
        <RoomRow
          bookings={this.state.bookings.filter(
            l =>
              l.bookingDate ===
              moment(this.state.startDate).format('YYYY-MM-DD')
          )}
          date={this.state.startDate}
          room={room}
          key={room.id}
        />
      );
    });

    return (
      <div>
        {/*<Form style={{ position: 'fixed', left: '200px', bottom: '650px'}} onSubmit={this.handleSubmit}>*/}
        <Form style={{ marginTop: 20 }} onSubmit={this.handleSubmit}>
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
        <Table unstackable color={'blue'} celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{
                  position: 'sticky',
                  left: 0,
                  background: 'white',
                  color: 'black'
                }}
              >
                Huone
              </Table.HeaderCell>
              <Table.HeaderCell>06:00</Table.HeaderCell>
              <Table.HeaderCell>06:30</Table.HeaderCell>
              <Table.HeaderCell>07:00</Table.HeaderCell>
              <Table.HeaderCell>07:30</Table.HeaderCell>
              <Table.HeaderCell>08:00</Table.HeaderCell>
              <Table.HeaderCell>08:30</Table.HeaderCell>
              <Table.HeaderCell>09:00</Table.HeaderCell>
              <Table.HeaderCell>09:30</Table.HeaderCell>
              <Table.HeaderCell>10:00</Table.HeaderCell>
              <Table.HeaderCell>10:30</Table.HeaderCell>
              <Table.HeaderCell>11:00</Table.HeaderCell>
              <Table.HeaderCell>11:30</Table.HeaderCell>
              <Table.HeaderCell>12:00</Table.HeaderCell>
              <Table.HeaderCell>12:30</Table.HeaderCell>
              <Table.HeaderCell>13:00</Table.HeaderCell>
              <Table.HeaderCell>13:30</Table.HeaderCell>
              <Table.HeaderCell>14:00</Table.HeaderCell>
              <Table.HeaderCell>14:30</Table.HeaderCell>
              <Table.HeaderCell>15:00</Table.HeaderCell>
              <Table.HeaderCell>15:30</Table.HeaderCell>
              <Table.HeaderCell>16:00</Table.HeaderCell>
              <Table.HeaderCell>16:30</Table.HeaderCell>
              <Table.HeaderCell>17:00</Table.HeaderCell>
              <Table.HeaderCell>17:30</Table.HeaderCell>
              <Table.HeaderCell>18:00</Table.HeaderCell>
              <Table.HeaderCell>18:30</Table.HeaderCell>
              <Table.HeaderCell>19:00</Table.HeaderCell>
              <Table.HeaderCell>19:30</Table.HeaderCell>
              <Table.HeaderCell>20:00</Table.HeaderCell>
              <Table.HeaderCell>20:30</Table.HeaderCell>
              <Table.HeaderCell>21:00</Table.HeaderCell>
              <Table.HeaderCell>21:30</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{allRooms}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default RoomList;
