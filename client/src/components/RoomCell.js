import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'

// var data = {first: "Vapaa", second: "Varattu", third:"Vapaa", fourth:"Vapaa", fifth:"Vapaa"};
var kellonaika = null;
var room = null;

class RoomCell extends Component {

    // componentDidMount() {
    //     if (kellonaika = 8) {
    //         data = "kello on 8"
    //         if (room === 100) {
    //             data = "kello on 8 ja huone on 100"
    //         }
    //     }
    // }

    render() {


        return (

            <Table.Cell kellonaika={8}>{this.props.cell.available}, {this.props.room}, aika: {this.props.cell.aika}</Table.Cell>

            // <Table.Cell kellonaika={9} huone={this.props.room.name}>{data.second}</Table.Cell>
            // <Table.Cell kellonaika={10} huone={this.props.room.name}>{data.third}</Table.Cell>
            // <Table.Cell kellonaika={11} huone={this.props.room.name}>{data.fourth}</Table.Cell>
            // <Table.Cell kellonaika={12} huone={this.props.room.name}>{data.fifth}</Table.Cell>
        );
    }

}

export default RoomCell;

    // alku={8} loppu={9}
// room={this.props.room.name}