import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'


class RoomCell extends Component {

    check(){
        if(this.props.cellData.available){
            return ""
        }else{
            return "Varattu"
        }
    }

    checkUser(){
        if(this.props.cellData.users){
            return " oma varaus"
        }else{
            return ""
        }
    }


    render() {

        return (
            <Table.Cell negative={!this.props.cellData.available} >{this.check()}{this.checkUser()}</Table.Cell>
        );
    }

}

export default RoomCell;

    // alku={8} loppu={9}
// room={this.props.room.name}