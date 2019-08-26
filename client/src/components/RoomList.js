
import React, {Component} from 'react';
import {Table, Dropdown, Input, Form, Container} from 'semantic-ui-react'
import RoomRow from "./RoomRow";
import moment from 'moment';
import "./Table.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';

//const data = [{name: "huone1"},{name: "huone2"}, {name: "huone3"}, {name:"huone4"}];
const data = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 }
];
// const array = [];

class RoomList extends Component {


    constructor(props) {
      super(props);
      this.state = {
          now:"",
        startDate: new Date(),
          rooms: data
      };
      this.handleDateChange = this.handleDateChange.bind(this);
    }
    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }


  // componentDidMount() {
  //     this.setState({now: moment().format('DD-MM-YYYY')})
  //     this.datesToArray();
  // }

  // datesToArray(){
  //     for(let i=0;i<=30;i++){
  //         const date = {
  //             key: moment().add(i, 'd').format('DD-MM-YYYY'),
  //             text: moment().add(i, 'd').format('DD-MM-YYYY'),
  //             value: moment().add(i, 'd').format('DD-MM-YYYY')
  //         }
  //         array.push(date);
  //
  //     }
  // }


    render() {
        const allRooms = this.state.rooms.map((room) =>
            <RoomRow date={this.state.now} room={room} key={room.index}/>);
        return (
            <div>
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
                <Table unstackable color={'blue'} celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Huone</Table.HeaderCell>
                            <Table.HeaderCell>6:00</Table.HeaderCell>
                            <Table.HeaderCell>6:30</Table.HeaderCell>
                            <Table.HeaderCell>7:00</Table.HeaderCell>
                            <Table.HeaderCell>7:30</Table.HeaderCell>
                            <Table.HeaderCell>8:00</Table.HeaderCell>
                            <Table.HeaderCell>8:30</Table.HeaderCell>
                            <Table.HeaderCell>9:00</Table.HeaderCell>
                            <Table.HeaderCell>9:30</Table.HeaderCell>
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
