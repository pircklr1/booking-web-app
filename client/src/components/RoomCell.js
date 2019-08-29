import React, {Component} from 'react';
import {Table, Icon} from 'semantic-ui-react'

// let backgroundColor = '#1678C2';
// let backgroundColor2 = '#DB2828';

class RoomCell extends Component {


    check(){
        if(this.props.cellData.available){
            return ""
        }else{
            if(this.props.cellData.users) {
                return <Icon circular name='user'/>
            }else{
                // return <Icon size='large' color='red' name='ban'/> =red ban-icon for grey background
                return <Icon   size='large' name='ban'/>
            }

        }
    }

    render() {

        let backgroundColor = 'inherit'

        if(!this.props.cellData.available && this.props.cellData.users){
            backgroundColor = '#7bace4';
        } else if (!this.props.cellData.available) {
            // backgroundColor = '#cfcfcf'; =grey
            backgroundColor = '#fc9fa3';
        }

        return (
            <Table.Cell  textAlign={'center'} style={{backgroundColor}} >{this.check()}</Table.Cell>
        );
    }

}

export default RoomCell;