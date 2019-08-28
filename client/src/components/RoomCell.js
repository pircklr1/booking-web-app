import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'

// let backgroundColor = '#1678C2';
// let backgroundColor2 = '#DB2828';

class RoomCell extends Component {


    check(){
        if(this.props.cellData.available){
            return ""
        }else{
            if(this.props.cellData.users){
                return "Oma varaus"
            }else{
                return "Varattu"
            }

        }
    }







    render() {

        let backgroundColor = 'inherit'


        if(!this.props.cellData.available && this.props.cellData.users){
            backgroundColor = '#1678C2';
        } else if (!this.props.cellData.available) {
            backgroundColor = '#DB2828';
        }

        return (

            // <Table.Cell negative={!this.props.cellData.available} >{this.check()}</Table.Cell>

            <Table.Cell selectable style={{backgroundColor}} >{this.check()}</Table.Cell>

        );
    }

}

export default RoomCell;