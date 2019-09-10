import React, { useState, useEffect } from 'react';
import {getAllRooms} from "../../service/ClientService";
import {Container, Grid, Header, Table,} from "semantic-ui-react";
import DeleteButton from "./DeleteButton";
import RoomEditModal from './RoomEditModal';
import RoomAddModal from "./RoomAddModal";

function Rooms() {
    const [roomData, setRoomData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rerender, setRerender] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms(setRoomData);
        setRerender(false);
        setIsLoading(false);
        console.log('Tapahtuuko mitään?')
    }, [rerender]);

    function update(){
        setRerender(rerender + 1);
    }



    const renderRoomTable = () => {
        return roomData.map(room => {
            return (
                <Table.Row textAlign='center' key={room.id}>
                    <Table.Cell>{room.name}</Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <DeleteButton id={room.id} type={'room'} update={update}/>
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <RoomEditModal room={room} update={update}/>
                    </Table.Cell>
                </Table.Row>
            );
        });
    };

return(
    <div>
        <Container style={{ padding: '5em 0em' }}>
            <Grid
                textAlign='center'
                style={{ height: '70vh' }}
                verticalAlign='middle'
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' attached='top' block>
                        Huoneet
                    </Header>
                    <Table unstackable celled color={'blue'}>
                        <Table.Header>
                            <Table.HeaderCell textAlign='center'>Nimi</Table.HeaderCell>
                            <Table.HeaderCell>Poista</Table.HeaderCell>
                            <Table.HeaderCell>Muokkaa</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {renderRoomTable()}
                            <Table.Row textAlign='center'>
                                <Table.Cell style={{fontWeight: 'bold'}}>Lisää huone</Table.Cell>
                                <Table.Cell collapsing textAlign='center'>
                                    <RoomAddModal update={update}/>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        </Container>
    </div>
)
}

export default Rooms;