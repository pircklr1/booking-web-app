import React, {Component} from 'react';
import {Table, Dropdown} from 'semantic-ui-react'
import Room from "./Room";
import moment from 'moment';

const data = [{name: "huone1"},{name: "huone2"}, {name: "huone3"}];
const array = [];

class RoomList extends Component {
    state = {
        now: "",
        rooms :data
    };

    componentDidMount() {
        this.setState({now: moment().format('DD-MM-YYYY')})
        this.datesToArray();
    }

    datesToArray(){
        for(let i=0;i<=30;i++){
            const date = {
                key: moment().add(i, 'd').format('DD-MM-YYYY'),
                text: moment().add(i, 'd').format('DD-MM-YYYY'),
                value: moment().add(i, 'd').format('DD-MM-YYYY')
            }
            array.push(date);

        }
    }

    render() {
        const allRooms = this.state.rooms.map((room) =>
            <Room room={room} key={room.index}/>);
        return (
            <div>

                <div>
                    {this.state.now}
                    <Dropdown
                        placeholder='Select Date'
                        fluid
                        selection
                        options={array}
                    />
                </div>

                <Table unstackable color={'blue'}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Huone</Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>6:00</Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>7:00</Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>8:00</Table.HeaderCell>
                            <Table.HeaderCell>9:00</Table.HeaderCell>
                            <Table.HeaderCell>10:00</Table.HeaderCell>
                            <Table.HeaderCell>11:00</Table.HeaderCell>
                            <Table.HeaderCell>12:00</Table.HeaderCell>
                            <Table.HeaderCell>13:00</Table.HeaderCell>
                            <Table.HeaderCell>14:00</Table.HeaderCell>
                            <Table.HeaderCell>15:00</Table.HeaderCell>
                            <Table.HeaderCell>16:00</Table.HeaderCell>
                            <Table.HeaderCell>17:00</Table.HeaderCell>
                            <Table.HeaderCell>18:00</Table.HeaderCell>
                            <Table.HeaderCell>19:00</Table.HeaderCell>
                            <Table.HeaderCell>20:00</Table.HeaderCell>
                            <Table.HeaderCell>21:00</Table.HeaderCell>
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