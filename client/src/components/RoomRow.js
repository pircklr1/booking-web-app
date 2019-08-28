import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import RoomCell from './RoomCell';
import moment from 'moment';


class RoomRow extends Component {

    userId = localStorage.getItem("userId")

    state = {
        bookingData: this.props.bookings,
        combinedDatas: [
            {available: true, time: moment('6:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('6:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('7:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('7:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('8:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('8:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('9:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('9:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('10:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('10:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('11:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('11:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('12:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('12:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('13:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('13:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('14:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('14:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('15:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('15:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('16:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('16:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('17:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('17:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('18:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('18:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('19:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('19:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('20:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('20:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('21:00:00', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('21:30:00', 'HH:mm:ss'), room: this.props.room.id, users: false}
        ]
    }

    compareData() {
        for (var i = 0; i < this.state.combinedDatas.length; i++) {
            for (var j = 0; j < this.state.bookingData.length; j++) {
                if (
                    this.state.combinedDatas[i].time.isSameOrAfter(moment(this.state.bookingData[j].startTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].time.isBefore(moment(this.state.bookingData[j].endTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].room === this.state.bookingData[j].roomId
                ) {
                    this.state.combinedDatas[i].available = false;
                }
                if (this.state.combinedDatas[i].time.isSameOrAfter(moment(this.state.bookingData[j].startTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].time.isBefore(moment(this.state.bookingData[j].endTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].room === this.state.bookingData[j].roomId &&
                this.state.bookingData[j].userId === this.userId) {
                    this.state.combinedDatas[i].users = true;
                }
            }
        }
    }
    render() {
        if (this.state.bookingData.length > 0) {
            this.compareData();
        }

        const allCells = this.state.combinedDatas.map(combinedData => (
            <RoomCell cellData={combinedData} key={combinedData.index}/>
        ));
        return (
            <Table.Row>
                <Table.Cell style={{position: 'sticky', left:0, background: 'white'}}>{this.props.room.name}</Table.Cell>
                {allCells}
            </Table.Row>

        );

    }
}

export default RoomRow;
