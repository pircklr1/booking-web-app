import React, {useState, useEffect, useContext} from 'react';
import {Button, Table, Container, Header, Icon, Grid, Tab} from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import {getAllBookings, getAllRooms, getAllUsers} from "../../service/ClientService";
import {AuthContext} from "../../context/auth";

function AdminAllBookings() {

    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllBookings(setData);
        getAllUsers(setUserData);
        getAllRooms(setRoomData);
        setIsLoading(false);
    }, []);

    const renderBookingTable = () => {
        return data.map(booking => {
            return (
                <Table.Row key={booking.id}>
                    <Table.Cell collapsing textAlign='center'>
                        {moment(booking.bookingDate).format('DD.MM.YYYY')}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        {booking.startTime.substring(0, 5)}-
                        {booking.endTime.substring(0, 5)}
                    </Table.Cell>
                    <Table.Cell>Käyttäjä</Table.Cell>
                    <Table.Cell>Huone</Table.Cell>
                    <Table.Cell>
                    <Button ui primary basic icon>
              <i className='edit icon' />
                    </Button></Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <DeleteButton id={booking.id} type='booking'/>
                    </Table.Cell>
                </Table.Row>
            );
        });
    };


    return (
            <Table unstackable celled textAlign='center'>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                    <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                        <Table.HeaderCell>Huone</Table.HeaderCell>
                        <Table.HeaderCell>Käyttäjä</Table.HeaderCell>
                        <Table.HeaderCell>Muokkaa</Table.HeaderCell>
                    <Table.HeaderCell>Peruuta</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderBookingTable()}</Table.Body>
            </Table>
    );
}

export default AdminAllBookings;