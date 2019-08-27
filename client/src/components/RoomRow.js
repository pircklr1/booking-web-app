import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import RoomCell from './RoomCell';
import {getAllBookings} from '../service/ClientService'
import moment from 'moment';

var combinedData = [{}];

class RoomRow extends Component {

    state = {
        bookingData: this.props.bookings,
        combinedDatas: [
            {available: true, time: '6:00', room: this.props.room.id},
            {available: true, time: '6:30', room: this.props.room.id},
            {available: true, time: '7:00', room: this.props.room.id},
            {available: true, time: '7:30', room: this.props.room.id},
            {available: true, time: '8:00', room: this.props.room.id},
            {available: true, time: '8:30', room: this.props.room.id},
            {available: true, time: '9:00', room: this.props.room.id},
            {available: true, time: '9:30', room: this.props.room.id},
            {available: true, time: '10:00', room: this.props.room.id},
            {available: true, time: '10:30', room: this.props.room.id},
            {available: true, time: '11:00', room: this.props.room.id},
            {available: true, time: '11:30', room: this.props.room.id},
            {available: true, time: '12:00', room: this.props.room.id},
            {available: true, time: '12:30', room: this.props.room.id},
            {available: true, time: '13:00', room: this.props.room.id},
            {available: true, time: '13:30', room: this.props.room.id},
            {available: true, time: '14:00', room: this.props.room.id},
            {available: true, time: '14:30', room: this.props.room.id},
            {available: true, time: '15:00', room: this.props.room.id},
            {available: true, time: '15:30', room: this.props.room.id},
            {available: true, time: '16:00', room: this.props.room.id},
            {available: true, time: '16:30', room: this.props.room.id},
            {available: true, time: '17:00', room: this.props.room.id},
            {available: true, time: '17:30', room: this.props.room.id},
            {available: true, time: '18:00', room: this.props.room.id},
            {available: true, time: '18:30', room: this.props.room.id},
            {available: true, time: '19:00', room: this.props.room.id},
            {available: true, time: '19:30', room: this.props.room.id},
            {available: true, time: '20:00', room: this.props.room.id},
            {available: true, time: '20:30', room: this.props.room.id},
            {available: true, time: '21:00', room: this.props.room.id},
            {available: true, time: '21:30', room: this.props.room.id}
        ]
    }


    compareData() {
        for (var i = 0; i < this.state.combinedDatas.length; i++) {
            for (var j = 0; j < this.state.bookingData.length; j++) {
                if (
                    this.state.combinedDatas[i].time === this.state.bookingData[j].startTime.substring(0, 5) &&
                    this.state.combinedDatas[i].room === this.state.bookingData[j].roomId
                ) {
                    this.state.combinedDatas[i].available = false;
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

    }
}

export default RoomRow;
