import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'
import Room from "./Room";
import moment from 'moment';

let data = [{name: "huone1"},{name: "huone2"}, {name: "huone3"}];


class RoomList extends Component {
    state = {
        rooms :data
    };
    render() {
        const allRooms = this.state.rooms.map((room) =>
            <Room room={room} key={room.index}/>);
        return (
            <div>
                <Table unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Huone</Table.HeaderCell>
                            <Table.HeaderCell>6:00</Table.HeaderCell>
                            <Table.HeaderCell>7:00</Table.HeaderCell>
                            <Table.HeaderCell>8:00</Table.HeaderCell>
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