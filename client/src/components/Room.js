import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'


class Room extends Component {

    render() {
        return (

                <Table.Row>
                    <Table.Cell>{this.props.room.name}</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>
                    <Table.Cell>Vapaa</Table.Cell>

                    <Table.Cell textAlign='right'>None</Table.Cell>
                </Table.Row>

        );
    }
}

export default Room;