// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.
// cancel rools: 1 week for the big room "Stage", 24h for other rooms

import React, {useState, useEffect, useContext} from 'react';
import {getUserBookings, getRoomData, adminDeleteBooking} from '../service/ClientService';
import {Button, Table, Container, Header, Grid, Icon, Confirm, Tab} from 'semantic-ui-react';
import moment from 'moment';
import {AuthContext} from '../context/auth';

function User() {
    //this needs to be changed to "Stage" id!!
    let bigRoom = '69df3828-edeb-4727-bde7-645847626292';

    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false)
    //const [isLoading, setIsLoading] = useState(false);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        //setIsLoading(true);
        getUserBookings(currentUser.id, setData);
        getRoomData(setRooms);
        //setIsLoading(false);
    }, []);

    //get room name by room Id (from booking data)
    const roomName = (roomId) => {
        const room = rooms.find(room => room.id === roomId)
        if (room === undefined) return " "
        return room.name
    };

    // const roomName = (roomId) => {
    //     return rooms.map(room => {
    //         if(room.id === roomId){
    //             return room.name;
    //         }
    //     })
    // };


    //cancel booking
    const deleteBooking = (bookingId) => {
        adminDeleteBooking(bookingId)
            .then(function (response) {
                getUserBookings(currentUser.id, setData);
                setOpen(false);
            })
    };

    //booking cancel confirmation alert
    const show = () => {
        setOpen(true);
    };

    //if user doesn't cancel booking
    const handleCancel = () => {
        setOpen(false);
    };

    //set roomId
    const setRoomIdString = (id) => {
        setRoomId(id);
    };

    //Tabs for past bookings - all or 10 latest
    const panes = [
        {
            menuItem: 'Viimeiset 10', render: () =>
                <Tab.Pane>
                    <Table unstackable color={'blue'} celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                                <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                                <Table.HeaderCell>Huone</Table.HeaderCell>
                                <Table.HeaderCell>Peruuta</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>{renderUserPastTenBookingTable()}</Table.Body>
                    </Table>
                </Tab.Pane>
        },
        {
            menuItem: 'Kaikki', render: () =>
                <Tab.Pane>
                    <Table unstackable color={'blue'} celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                                <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                                <Table.HeaderCell>Huone</Table.HeaderCell>
                                <Table.HeaderCell>Peruuta</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>{renderUserPastBookingTable()}</Table.Body>
                    </Table>
                </Tab.Pane>
        },
    ];

//future bookings (all)
    const renderUserBookingTable = () => {

        // const bookingsAfterNow = data.filter(booking => moment(booking.bookingDate).isSameOrAfter(moment().format('YYYY-MM-DD')))
        // console.log(bookingsAfterNow.map(booking => <p>{booking.bookingDate}</p>))

        return data.map(booking => {
            let now = moment();
            let cancel = false;

            //rooms must be cancelled 24h before booking startTime
            if (moment(booking.bookingDate).subtract(1, 'days').isSameOrBefore(moment(now).format('YYYY-MM-DD')) &&
                moment(booking.startTime, 'HH:mm:ss').isBefore(moment(now, 'HH:mm:ss'))) {
                cancel = true;
            }
            if (moment(booking.bookingDate).subtract(1, 'days').isBefore(moment(now).format('YYYY-MM-DD'))) {
                cancel = true;
            }
            //big room must be cancelled 1 week before bookingDate
            else if (moment(booking.bookingDate).subtract(7, 'days').isSameOrBefore(moment(now).format('YYYY-MM-DD')) &&
                booking.roomId === bigRoom) {
                cancel = true;
            }

            if (moment(booking.bookingDate).isSameOrAfter(moment(now).format('YYYY-MM-DD'))) {
                return (
                    <Table.Row key={booking.id}>
                        <Table.Cell collapsing textAlign='center'>
                            {moment(booking.bookingDate).format('DD.MM.YYYY')}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            {booking.startTime.substring(0, 5)}-
                            {booking.endTime.substring(0, 5)}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            {roomName(booking.roomId)}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            <Button disabled={cancel} negative basic icon onClick={(event) => {
                                show();
                                setRoomIdString(booking.id)
                            }}>
                                <i className='trash icon'/>
                            </Button>
                            <Confirm
                                open={open}
                                onCancel={handleCancel}
                                cancelButton='Takaisin'
                                confirmButton="Peru varaus"
                                onConfirm={() => deleteBooking(roomId)}
                                content='Haluatko varmasti perua varauksen?'
                            />
                        </Table.Cell>
                    </Table.Row>
                );
            }else{
                return ''
            }
        });
    };

    //past bookings all
    const renderUserPastBookingTable = () => {
        return data.map(booking => {
            let now = moment();
            if (moment(booking.bookingDate).isBefore(moment(now).format('YYYY-MM-DD'))) {
                return (
                    <Table.Row key={booking.id}>
                        <Table.Cell collapsing textAlign='center'>
                            {moment(booking.bookingDate).format('DD.MM.YYYY')}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            {booking.startTime.substring(0, 5)}-
                            {booking.endTime.substring(0, 5)}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            {roomName(booking.roomId)}
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            <Icon name='times'/>
                        </Table.Cell>
                    </Table.Row>
                );
            }
        });
    };

    //past 10 bookings
    const renderUserPastTenBookingTable = () => {
        let newData = [];
        data.map(booking => {
            let now = moment();
            if (moment(booking.bookingDate).isBefore(moment(now).format('YYYY-MM-DD'))) {
                newData.push(booking);
            }
        });
        //first ten from the beginning
        let lastTen = newData.slice(0, 10);
        return lastTen.map(booking => {
            return (
                <Table.Row key={booking.id}>
                    <Table.Cell collapsing textAlign='center'>
                        {moment(booking.bookingDate).format('DD.MM.YYYY')}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        {booking.startTime.substring(0, 5)}-
                        {booking.endTime.substring(0, 5)}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        {roomName(booking.roomId)}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <Icon name='times'/>
                    </Table.Cell>
                </Table.Row>
            );
        })
    };

    return (
        <div>
            <Container style={{padding: '5em 0em', overflow: 'auto'}}>
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header textAlign='left'>Hei, {currentUser.name}!</Header>
                        <Header as='h2' attached='top' block>
                            Tulevat varaukset
                        </Header>
                        <Table unstackable color={'blue'} celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Varauspäivä</Table.HeaderCell>
                                    <Table.HeaderCell>Kellonaika</Table.HeaderCell>
                                    <Table.HeaderCell>Huone</Table.HeaderCell>
                                    <Table.HeaderCell>Peruuta</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{renderUserBookingTable()}</Table.Body>
                        </Table>
                        <Header as='h2' attached='top' block>
                            Menneet varaukset
                        </Header>
                        <Tab panes={panes} style={{marginTop: 14}}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
}

export default User;