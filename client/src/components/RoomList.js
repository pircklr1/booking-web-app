import React, {Component} from 'react';
import {Table, Dropdown, Input, Form, Container, Button} from 'semantic-ui-react'
import RoomRow from "./RoomRow";
import moment from 'moment';
import "./Table.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import {getAllBookings, getAllRooms} from "../service/ClientService";


class RoomList extends Component {
    constructor(props) {
      super(props);
      this.state = {
          selectedDate:"",
        startDate: new Date(),
          rooms: [],
          bookings: []
      };
      this.handleDateChange = this.handleDateChange.bind(this);
      this.updateBookings = this.updateBookings.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleDateChange(date) {
        // const selectedDate = moment(date).format('YYYY-MM-DD')
        this.setState({
            // startDate: date,
            startDate: date,
            // selectedDate: selectedDate
        });
        this.updateBookings();
    }
    handleSubmit(e) {
        e.preventDefault();
        const selectedDate = moment(this.state.startDate).format('YYYY-MM-DD')
        console.log(selectedDate);
        this.updateBookings();
        this.render();
    }

    componentDidMount() {
        this.updateBookings()
        this.updateRooms()
    }

    updateRooms() {

        getAllRooms(list => {
            this.setState({rooms:list})
        })
    }

    updateBookings() {
        const date = moment(this.state.startDate).format('YYYY-MM-DD')
        console.log(date)
        getAllBookings(list => {
            const filteredList = list.filter(l => l.bookingDate === date)
            // this.setState({bookings:list})
            this.setState({bookings:filteredList})
        })
    }

    render() {
        const allRooms = this.state.rooms.map((room) =>
            <RoomRow bookings={this.state.bookings} date={this.state.selectedDate} room={room} key={room.index}/>);

        return (
            <div>
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
                        <Button primary type='submit'>Päivitä</Button>
                    </Form>
                <Table unstackable color={'blue'} celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{position: 'sticky', left:0, background: 'white', color: 'black'}}>Huone</Table.HeaderCell>
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
                    <Table.Body>
                        {allRooms}
                    </Table.Body>
                </Table>

            </div>
        );
    }

}

export default RoomList;
