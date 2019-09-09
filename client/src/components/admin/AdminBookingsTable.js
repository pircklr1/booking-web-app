import React, {useState, useEffect, useContext} from 'react';
import {Button, Table, Container, Header, Icon, Grid, Tab} from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import {getAllBookings, getAllRooms, getAllUsers} from "../../service/ClientService";
import {AuthContext} from "../../context/auth";

function AdminBookingsTable() {

    const {currentUser} = useContext(AuthContext);
    const [bookingData, setBookingData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rerender, setRerender] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        getAllBookings(setBookingData);
        getAllUsers(setUserData);
        getAllRooms(setRoomData);
        setRerender(false);
        setIsLoading(false);
    }, [rerender]);

    function update() {
        setRerender(rerender + 1);
    }

    //get room name by room Id (from booking bookingData)
    const roomName = (roomId) => {
        return roomData.map(room => {
            if (room.id === roomId) {
                return room.name;
            }
        })
    };
    //get user name by user Id (from booking bookingData)
    const userName = (userId) => {
        return userData.map(user => {
            if (user.id === userId) {
                return user.firstName + " " + user.lastName;
            }
        })
    };
    //count booked hours
    const count = (endTime, startTime) => {
        const end = moment(endTime, 'HH:mm');
        const start = moment(startTime, 'HH:mm');
        return end.diff(start, "hours", true);
    };

    const renderBookingTable = () => {
        return bookingData.map(booking => {
            return (
                <Table.Row key={booking.id}>
                    <Table.Cell collapsing textAlign='center'>
                        {moment(booking.bookingDate).format('DD.MM.YYYY')}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        {booking.startTime.substring(0, 5)}-
                        {booking.endTime.substring(0, 5)}
                    </Table.Cell>
                    <Table.Cell>{count(booking.endTime, booking.startTime)}</Table.Cell>
                    <Table.Cell>{roomName(booking.roomId)}</Table.Cell>
                    <Table.Cell>{userName(booking.userId)}</Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <DeleteButton id={booking.id} type={'booking'} update={update}/>
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <Button ui primary basic icon>
                            <i className='edit icon'/>
                        </Button></Table.Cell>
                </Table.Row>
            );
        });
    };


    return (
        <Table unstackable celled color={'blue'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                    <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                    <Table.HeaderCell>Tunnit</Table.HeaderCell>
                    <Table.HeaderCell>Huone</Table.HeaderCell>
                    <Table.HeaderCell>Käyttäjä</Table.HeaderCell>
                    <Table.HeaderCell>Poista</Table.HeaderCell>
                    <Table.HeaderCell>Muokkaa</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{renderBookingTable()}</Table.Body>
        </Table>
    );
}

export default AdminBookingsTable;