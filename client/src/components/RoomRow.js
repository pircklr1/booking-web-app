import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import RoomCell from './RoomCell';
import { getAllBookings } from '../service/ClientService';
//var data = [{available: "Vapaa", room: 1}, {available: "Varattu", }, {available:"Vapaa"}, {available:"Vapaa"}, {available:"Vapaa"}];
// var data = [{available: true, aika: 1}, {available: true, aika: 2},{available: false, aika: 3} ];
// var timeData = [{time: 8},{time: 9},{time: 10},{time: 11},{time: 12},{time: 13}];
//
// var availabilityData = [{available: "vapaa"}, {available: "vapaa"},{available: "varattu"},{available: "vapaa"},{available: "vapaa"},{available: "vapaa"} ];
// var bookingData1 = [{}];
var bookingData2 = [
    { room: 1, time: 9 },
    { room: 2, time: 11 },
    { room: 3, time: 10 },
    { room: 4, time: 15.5 }
];

var combinedData = [{}];

class RoomRow extends Component {

    state = {
    bookingData: [],
    combinedDatas: [
        { available: true, time: '6:00', room: this.props.room.id },
        { available: true, time: '6:30', room: this.props.room.id },
        { available: true, time: '7:00', room: this.props.room.id },
        { available: true, time: '7:30', room: this.props.room.id },
        { available: true, time: '8:00', room: this.props.room.id },
        { available: true, time: '8:30', room: this.props.room.id },
        { available: true, time: '9:00', room: this.props.room.id },
        { available: true, time: '9:30', room: this.props.room.id },
        { available: true, time: '10:00', room: this.props.room.id },
        { available: true, time: '10:30', room: this.props.room.id },
        { available: true, time: '11:00', room: this.props.room.id },
        { available: true, time: '11:30', room: this.props.room.id },
        { available: true, time: '12:00', room: this.props.room.id },
        { available: true, time: '12:30', room: this.props.room.id },
        { available: true, time: '13:00', room: this.props.room.id },
        { available: true, time: '13:30', room: this.props.room.id },
        { available: true, time: '14:00', room: this.props.room.id },
        { available: true, time: '14:30', room: this.props.room.id },
        { available: true, time: '15:00', room: this.props.room.id },
        { available: true, time: '15:30', room: this.props.room.id },
        { available: true, time: '16:00', room: this.props.room.id },
        { available: true, time: '16:30', room: this.props.room.id },
        { available: true, time: '17:00', room: this.props.room.id },
        { available: true, time: '17:30', room: this.props.room.id },
        { available: true, time: '18:00', room: this.props.room.id },
        { available: true, time: '18:30', room: this.props.room.id },
        { available: true, time: '19:00', room: this.props.room.id },
        { available: true, time: '19:30', room: this.props.room.id },
        { available: true, time: '20:00', room: this.props.room.id },
        { available: true, time: '20:30', room: this.props.room.id },
        { available: true, time: '21:00', room: this.props.room.id },
        { available: true, time: '21:30', room: this.props.room.id }
    ]
}


  compareData() {
      this.setState({bookingData: this.props.bookings})
      console.log(this.state.bookingData);
      for (var i = 0; i < this.state.combinedDatas.length; i++) {
          for (var j = 0; j < this.state.bookingData.length; j++) {
              if (
                  this.state.combinedDatas[i].time === this.state.bookingData[j].startTime.substring(0,5) &&
                  this.state.combinedDatas[i].room === this.state.bookingData[j].roomId
              ) {
                  this.state.combinedDatas[i].available = false;
              }
          }
      }
  }

  //compare if there is in booking data same room id's and times than in combined datas and if so, set the available false.
  // compareData() {
  //   var data = this.state.bookingData;
  //
  //   for (var i = 0; i < this.state.combinedDatas.length; i++) {
  //     for (var j = 0; j < data.length; j++) {
  //       if (
  //         this.state.combinedDatas[i].time == data[j].startTime.substring(0,5) &&
  //         this.state.combinedDatas[i].room == data[j].roomId
  //       ) {
  //         this.state.combinedDatas[i].available = false;
  //       }
  //     }
  //   }
  // }

  render() {
      this.compareData();
      // this.setState({bookingData: this.props.bookings})
      //
      // if (this.state.bookingData.length > 0) {
      //
      // }

    console.log(this.props.bookings);
    // const allCells = this.state.cells.map((cell) =>
    //     <RoomCell time={this.data} room = {this.props.room.name} tiedot={this.data} cell={cell} key={cell.index}/>);
    const allCells = this.state.combinedDatas.map(combinedData => (
      <RoomCell cellData={combinedData} key={combinedData.index} />
    ));

    return (
      <Table.Row>
        <Table.Cell>{this.props.room.name}</Table.Cell>
        {allCells}
      </Table.Row>
    );
  }
}

export default RoomRow;
