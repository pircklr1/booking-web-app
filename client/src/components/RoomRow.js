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
            {available: true, time: moment('6:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('6:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('7:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('7:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('8:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('8:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('9:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('9:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('10:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('10:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('11:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('11:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('12:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('12:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('13:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('13:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('14:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('14:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('15:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('15:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('16:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('16:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('17:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('17:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('18:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('18:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('19:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('19:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('20:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('20:30:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('21:00:00', 'HH:mm:ss'), room: this.props.room.id},
            {available: true, time: moment('21:30:00', 'HH:mm:ss'), room: this.props.room.id}
        ]
    }

    // compareData() {
    //     for (var i = 0; i < this.state.combinedDatas.length; i++) {
    //         for (var j = 0; j < this.state.bookingData.length; j++) {
    //             if (
    //                 this.state.combinedDatas[i].time.isSameOrAfter(moment(this.state.bookingData[j].startTime, 'HH:mm:ss')) &&
    //                 this.state.combinedDatas[i].time.isBefore(moment(this.state.bookingData[j].endTime, 'HH:mm:ss')) &&
    //                 this.state.combinedDatas[i].room === this.state.bookingData[j].roomId
    //             ) {
    //                 this.state.combinedDatas[i].available = false;
    //             }
    //         }
    //     }
    // }
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
            }
        }
    }
    render() {

        // if (this.state.bookingData.length > 0) {
        //     this.compareData();
        // }
        if (this.props.bookings.length > 0) {
            this.compareData();
        }

        const allCells = this.state.combinedDatas.map((combinedData, index) => (
            <RoomCell cellData={combinedData} key={index}/>
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
