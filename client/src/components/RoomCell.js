import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'


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

    check(){
        if(this.props.cellData.available){
            return ""
        }else{
            return "Varattu"
        }
    }




    render() {


        return (

            /*<Table.Cell availability={this.props.cell.available} negative={!this.props.cell.available} kellonaika={8}>{this.props.cell.available}, {this.props.room}, aika: {this.props.cell.aika}</Table.Cell>*/
        /*<Table.Cell negative={!this.props.cellData.available}>Aika:{this.props.cellData.time},*/
        /*    huone: {this.props.cellData.room}, vapaa: {this.props.cellData.available}</Table.Cell>*/
            <Table.Cell negative={!this.props.cellData.available}>{this.check()}</Table.Cell>


        );
    }

}

export default RoomCell;

    // alku={8} loppu={9}
// room={this.props.room.name}