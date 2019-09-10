import React, {useState, useEffect, useContext} from 'react';
import {Button, Table, Container, Header, Icon, Grid, Tab} from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import {getAllBookings, getAllRooms, getAllUsers} from "../../service/ClientService";
import {AuthContext} from "../../context/auth";
import BookingEditModal from "./BookingEditModal";

function AdminBookingsTable( { tableData, update }) {

    const {currentUser} = useContext(AuthContext);
    // const [bookingData, setBookingData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [rerender, setRerender] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        // getAllBookings(setBookingData);
        getAllUsers(setUserData);
        getAllRooms(setRoomData);
        // setRerender(false);
        setIsLoading(false);
    // }, [rerender]);
}, []);

    // function update() {
    //     setRerender(rerender + 1);
    // }

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

    const hours = [];
    //count booked hours
    const count = (endTime, startTime) => {
        const end = moment(endTime, 'HH:mm');
        const start = moment(startTime, 'HH:mm');
        hours.push(end.diff(start, "hours", true))
        return end.diff(start, "hours", true);
    };

    const renderBookingTable = () => {
        return tableData.map(booking => {
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
                        <BookingEditModal booking={booking} update={update}/>
                    </Table.Cell>
                </Table.Row>
            );
        });
    };

    //count sum of hours
    const countHours = () => {
        return document.getElementById("demo").innerHTML = hours.reduce(countHelper)
    };
    function countHelper(total, num) {
        return total + num;
    }

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
            {tableData && <Table.Body>{renderBookingTable()}</Table.Body>}
            {tableData.length === 0 && <Table.Body><Table.Row><Table.Cell>Ei varauksia valituilla ehdoilla</Table.Cell></Table.Row></Table.Body>}
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell>Yhteensä</Table.HeaderCell>
                    <Table.HeaderCell><Button onClick={countHours}>Laske</Button></Table.HeaderCell>
                    <Table.HeaderCell id="demo"></Table.HeaderCell>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default AdminBookingsTable;