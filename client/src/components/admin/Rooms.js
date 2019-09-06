import React, { useState, useEffect } from 'react';
import {getAllRooms} from "../../service/ClientService";
import {Container, Grid, Header, Table, Button, Icon} from "semantic-ui-react";
import DeleteButton from "./DeleteButton";
import RoomEditModal from './RoomEditModal';

function Rooms() {
    const [roomData, setRoomData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms(setRoomData);
        setIsLoading(false);
    }, []);


    const renderRoomTable = () => {
        return roomData.map(room => {
            return (
                <Table.Row textAlign='center'>
                    <Table.Cell>{room.name}</Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <DeleteButton id={room.id} type={'room'} />
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <RoomEditModal room={room}/>
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
                    <Table attached celled selectable>
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
                                    <Button ui positive basic icon>
                                        <Icon className='add circle'/>
                                    </Button>
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