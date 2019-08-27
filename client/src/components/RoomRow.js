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
    constructor(props) {
        super(props);
        this.state = { bookingData: [],
            roomData: this.props.rooms,
        };

        let combinedDatas = [
            { available: true, time: '06:00' },
            { available: true, time: '06:30' },
            { available: true, time: '07:00' },
            { available: true, time: '07:30' },
            { available: true, time: '08:00' },
            { available: true, time: '08:30' },
            { available: true, time: '09:00' },
            { available: true, time: '09:30' },
            { available: true, time: '10:00' },
            { available: true, time: '10:30' },
            { available: true, time: '11:00' },
            { available: true, time: '11:30' },
            { available: true, time: '12:00' },
            { available: true, time: '12:30' },
            { available: true, time: '13:00'},
            { available: true, time: '13:30' },
            { available: true, time: '14:00' },
            { available: true, time: '14:30'},
            { available: true, time: '15:00' },
            { available: true, time: '15.30' },
            { available: true, time: '16:00' },
            { available: true, time: '16:30' },
            { available: true, time: '17:00' },
            { available: true, time: '17:30' },
            { available: true, time: '18:00'},
            { available: true, time: '18:30' },
            { available: true, time: '19:00' },
            { available: true, time: '19:30' },
            { available: true, time: '20:00'},
            { available: true, time: '20:30' },
            { available: true, time: '21:00' },
            { available: true, time: '21:30' }
            ];

   var r = this.state.roomData.map(x => {
       x.combinedDatas = combinedDatas;
       return x
   });
console.log(r);
    }


    
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
        // console.log(this.state.bookingData)
        // console.log(this.props.rooms)
        // console.log(this.state.bookingData[13].startTime.substring(0,5))
        // console.log(this.state.combinedDatas[30].time)
        // console.log(this.state.bookingData[13].roomId)
        // console.log(this.state.roomData[6].id)

        // for (var i = 0; i < this.state.combinedDatas.length; i++) {
        //     for (var x = 0; x < this.state.roomData.length; x++) {
        //         for (var j = 0; j < data.length; j++) {
        //
        //             if (
        //                 // '15:00' === data[j].startTime.substring(0,5)
        //                 // this.state.combinedDatas[i].time === bookingData2.time &&
        //                 // this.state.combinedDatas[i].room === bookingData2.id
        //             this.state.combinedDatas[i].time === data[j].startTime.substring(0,5) &&
        //             this.state.roomData[x].id === data[j].roomId
        //             ) {
        //                 this.state.combinedDatas[i].available = false;
        //             }
        //         }
        //     }
        // }

        for (var huone = 0; huone < this.state.roomData.length; huone++) {
            let huoneid = this.state.roomData[huone].id;
            for (var rivi = 0; rivi < this.state.roomData[huone].combinedDatas.length; rivi++) {
                let soluaika = this.state.roomData[huone].combinedDatas[rivi].time;
                for (var solu = 0; solu < this.state.bookingData.length; solu++) {
                    let solunhuoneid = this.state.bookingData[solu].roomId;
                    // console.log("Vertailu", this.state.bookingData[k].startTime.substring(0,5), this.state.combinedDatas[j].time,
                    //     this.state.bookingData[k].roomId, this.state.roomData[i].id)
                    if (this.state.bookingData[solu].startTime.substring(0,5) === soluaika &&
                     solunhuoneid === huoneid) {
                        this.state.roomData[huone].combinedDatas[rivi].available = false;
                    }
                }
            }
        }
        console.log(this.state.roomData[2])
    }
    render() {
        if(this.state.bookingData.length > 0) {
            this.compareData()
        }
        // var allCells = [];
        //
        // for (var i = 0; i < this.state.roomData.length; i++) {
        //         for (var j = 0; j < this.state.roomData[i].combinedDatas.length; j++) {
        //             allCells = this.state.roomData[i].combinedDatas[j].map(combinedData => (
        //                 <RoomCell cellData={combinedData} key={combinedData.index} />
        //             ))
        //         }
        //     }

        const allCells = this.state.roomData.map((combinedData, index) => (
            combinedData.combinedDatas.map((cell, index) => (
                <RoomCell cellData={cell} key={index} />
            ))
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
