import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import RoomCell from './RoomCell';
import {getAllBookings} from '../service/ClientService'
import moment from 'moment';
//var data = [{available: "Vapaa", room: 1}, {available: "Varattu", }, {available:"Vapaa"}, {available:"Vapaa"}, {available:"Vapaa"}];
// var data = [{available: true, aika: 1}, {available: true, aika: 2},{available: false, aika: 3} ];
// var timeData = [{time: 8},{time: 9},{time: 10},{time: 11},{time: 12},{time: 13}];
//
// var availabilityData = [{available: "vapaa"}, {available: "vapaa"},{available: "varattu"},{available: "vapaa"},{available: "vapaa"},{available: "vapaa"} ];
// var bookingData1 = [{}];
var bookingData2 = [
    { id: 'fbdfb2f0-a72a-4165-8a79-35bfd4fe680c', time: '15:00' }
    // { room: 2, time: 11 },
    // { room: 3, time: 10 },
    // { room: 4, time: 15.5 }
];

var combinedData = [{}];

class RoomRow extends Component {
    
    state = { bookingData: [],
        // cells : data,
        // timeDatas: timeData,
        // availabilityData: availabilityData,
        combinedDatas: [
            { available: true, time: 6, room: this.props.rooms.id },
            { available: true, time: 6.5, room: this.props.rooms.id },
            { available: true, time: 7, room: this.props.rooms.id },
            { available: true, time: 7.5, room: this.props.rooms.id },
            { available: true, time: 8, room: this.props.rooms.id },
            { available: true, time: 8.5, room: this.props.rooms.id },
            { available: true, time: 9, room: this.props.rooms.id },
            { available: true, time: 9.5, room: this.props.rooms.id },
            { available: true, time: 10, room: this.props.rooms.id },
            { available: true, time: 10.5, room: this.props.rooms.id },
            { available: true, time: 11, room: this.props.rooms.id },
            { available: true, time: 11.5, room: this.props.rooms.id },
            { available: true, time: 12, room: this.props.rooms.id },
            { available: true, time: 12.5, room: this.props.rooms.id },
            { available: true, time: 13, room: this.props.rooms.id },
            { available: true, time: 13.5, room: this.props.rooms.id },
            { available: true, time: 14, room: this.props.rooms.id },
            { available: true, time: 14.5, room: this.props.rooms.id },
            { available: true, time: '15:00', room: this.props.rooms.id },
            { available: true, time: 15.5, room: this.props.rooms.id },
            { available: true, time: 16, room: this.props.rooms.id },
            { available: true, time: 16.5, room: this.props.rooms.id },
            { available: true, time: 17, room: this.props.rooms.id },
            { available: true, time: 17.5, room: this.props.rooms.id },
            { available: true, time: 18, room: this.props.rooms.id },
            { available: true, time: 18.5, room: this.props.rooms.id },
            { available: true, time: 19, room: this.props.rooms.id },
            { available: true, time: 19.5, room: this.props.rooms.id },
            { available: true, time: 20, room: this.props.rooms.id },
            { available: true, time: 20.5, room: this.props.rooms.id },
            { available: true, time: 21, room: this.props.rooms.id },
            { available: true, time: 21.5, room: this.props.rooms.id }
        ]
    };
    
   componentDidMount() {
       this.updateRows()
    }

// In this function we get all booking data and set it to state that we use in ComponenDidMount function.
    updateRows() {
        getAllBookings(list => {
                this.setState({bookingData: [...this.state.bookingData, ...list]})
            // this.setState({bookingData: list})
        });

    };

   //compare if there is in booking data same room id's and times than in combined datas and if so, set the available false.
    compareData() {
        var data = this.state.bookingData;
        // console.log('******************')
        console.log(data)
        console.log(this.props.rooms)
        // console.log(data[10].startTime.substring(0,5))
        // console.log(this.props.room)
        // console.log(data[10].roomId)
        // console.log('^^^^^^^^^^^^^^^^')

        for (var i = 0; i < this.state.combinedDatas.length; i++) {
            // console.log(this.state.combinedDatas[i].room)
            for (var j = 0; j < data.length; j++) {
                // console.log(data[j].startTime.substring(0,5))
                // console.log(data[j].roomId)
                // console.log('**************************')
                // console.log(this.state.combinedDatas[i].available)
                // console.log(this.state.combinedDatas[i].room)
                if (
                    // '15:00' === data[j].startTime.substring(0,5)
                    this.state.combinedDatas[i].time === bookingData2.time &&
                    this.state.combinedDatas[i].room === bookingData2.id
                    // this.state.combinedDatas[i].time === data[j].startTime.substring(0,5) &&
                    // this.state.combinedDatas[i].room.id === data[j].roomId
                ) {
                    this.state.combinedDatas[i].available = false;
                }
            // console.log(this.state.combinedDatas[i].available)
            }
        }
        // this.state.combinedDatas[18].available = false;
    }
    render() {
        if(this.state.bookingData.length > 0) {
            this.compareData()
        }

        // console.log(this.state.bookingData)
        // const allCells = this.state.cells.map((cell) =>
        //     <RoomCell time={this.data} room = {this.props.room.name} tiedot={this.data} cell={cell} key={cell.index}/>);
        const allCells = this.state.combinedDatas.map(combinedData => (
            <RoomCell cellData={combinedData} key={combinedData.index} />
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
