import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import RoomCell from './RoomCell';
import moment from 'moment';

class RoomRow extends Component {

    userId = localStorage.getItem("userId")

    state = {
        bookingData: this.props.bookings,
        combinedDatas: [
            {available: true, time: moment('6:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('6:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('7:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('7:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('8:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('8:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('9:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('9:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('10:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('10:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('11:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('11:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('12:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('12:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('13:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('13:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('14:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('14:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('15:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('15:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('16:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('16:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('17:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('17:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('18:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('18:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('19:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('19:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('20:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('20:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('21:00:01', 'HH:mm:ss'), room: this.props.room.id, users: false},
            {available: true, time: moment('21:30:01', 'HH:mm:ss'), room: this.props.room.id, users: false}
        ]
    }
    componentWillReceiveProps() {
        this.nollaa()
    }

    nollaa() {
        for (var i = 0; i < this.state.combinedDatas.length; i++) {
            this.state.combinedDatas[i].available = true;
            this.state.combinedDatas[i].users = false;
        }
    }

    compareData() {
        for (var i = 0; i < this.state.combinedDatas.length; i++) {
            for (var j = 0; j < this.props.bookings.length; j++) {
                if (
                    this.state.combinedDatas[i].time.isSameOrAfter(moment(this.props.bookings[j].startTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].time.isBefore(moment(this.props.bookings[j].endTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].room === this.props.bookings[j].roomId
                ) {
                    this.state.combinedDatas[i].available = false;
                }
                if (this.state.combinedDatas[i].time.isSameOrAfter(moment(this.props.bookings[j].startTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].time.isBefore(moment(this.props.bookings[j].endTime, 'HH:mm:ss')) &&
                    this.state.combinedDatas[i].room === this.props.bookings[j].roomId &&
                this.props.bookings[j].userId === this.userId) {
                    this.state.combinedDatas[i].users = true;
                }
            }
        }
    }
    render() {
        if (this.props.bookings.length > 0) {
            this.compareData();
        }
        console.log(this.state.combinedDatas)
        const allCells = this.state.combinedDatas.map((combinedData, index) => (
            <RoomCell cellData={combinedData} key={index}/>
        ));

        console.log('**********************')
        console.log(this.state.combinedDatas)
        return (
            <Table.Row>
                <Table.Cell style={{position: 'sticky', left:0, background: 'white'}}>{this.props.room.name}</Table.Cell>
                {allCells}
            </Table.Row>
        );

    }
}

export default RoomRow;
