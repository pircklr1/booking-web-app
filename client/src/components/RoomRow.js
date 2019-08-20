import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'
import RoomCell from "./RoomCell";

//var data = [{available: "Vapaa", room: 1}, {available: "Varattu", }, {available:"Vapaa"}, {available:"Vapaa"}, {available:"Vapaa"}];
var data = [{available: "Vapaa", room: 1, aika: 1}, {available: "Vapaa", room: 2, aika: 2},{available: "Vapaa", room: 2, aika: 2} ];
class RoomRow extends Component {

    state = {
        cells : data,

    }

    // componentDidMount() {
    //     if (kellonaika = 8) {
    //         data = "kello on 8"
    //         if (huone === 100) {
    //             data = "kello on 8 ja huone on 100"
    //         }
    //     }
    // }

    render() {
        const allCells = this.state.cells.map((cell) =>
            <RoomCell room = {this.props.room.name} tiedot={this.data} cell={cell} key={cell.index}/>);
        return (

            <Table.Row>
                {/*<Table.Cell>{this.props.room.name}</Table.Cell>*/}
                {/*<Table.Cell kellonaika={8}>{data.first}</Table.Cell>*/}
                {allCells}
                {/*<RoomCell/>*/}
            </Table.Row>

        );
    }
}

export default RoomRow;