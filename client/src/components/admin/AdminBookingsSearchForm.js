import React, {useState, useEffect, useContext} from 'react';
import {Button, Dropdown, Form, Select, Modal} from 'semantic-ui-react';
import moment from 'moment';
import {
    getAllBookings,
    getAllRooms,
    getAllUsers,
    getRoomData,
    getUserBookings,
    getUserBookingsBy
} from "../../service/ClientService";
import {AuthContext} from "../../context/auth";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';

function AdminBookingsSearchForm({
                                     handleSubmit,
                                     handleUserChange,
                                     handleStartDateChange,
                                     handleEndDateChange,
                                     startDate,
                                     endDate,
                                     user,
                                     getUsers
                                 }) {

    // const [startDate, setStartDate] = useState(new Date())
    // const [endDate, setEndDate] = useState(new Date())
    // const [userData, setUserData] = useState([])
    // const [user, setUser] = useState("");
    // const [bookingData, setBookingData] = useState([]);

    // useEffect(() => {
    //     getAllUsers(setUserData);
    // }, [])
    //
    // //get user names to dropdown
    // const getUsers = () => {
    //     return userData.map(user => {
    //         return {key: user.id, text: user.firstName + " " + user.lastName, value: user.id}
    //     })
    // }

    // const handleUserChange = (e, {value}) => setUser(value)
    // const handleStartDateChange = date => setStartDate(date)
    // const handleEndDateChange = date => setEndDate(date)

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const data = {
    //         user_id: user
    //     }
    //
    //     getUserBookings(user, setBookingData)
    //         .then(function (success) {
    //             console.log(bookingData);
    //         })
    //
    //
    // }
    // const handleSubmit = async () => {
    //     const data = {
    //         user_id: user,
    //         start_date: moment(startDate).format('YYYY-MM-DD'),
    //         end_date: moment(endDate).format('YYYY-MM-DD')
    //     }
    //     if (user === 1) {
    //         await getAllBookings(setBookingData)
    //     } else {
    //         const allUserBookings = await getUserBookingsBy(user);
    //         setBookingData(allUserBookings)
    //     }
    //     console.log(bookingData)
    //     const bookingsByDates = bookingData.filter(booking => moment(booking.bookingDate)
    //         .isBetween(data.start_date, data.end_date, null, '[]'));
    //     console.log(bookingsByDates)
    //     return bookingsByDates;
    // };

    // const handleSubmit = async () => {
    //     try {
    //         const data = await getUserBookings(user, setBookingData);
    //     } catch (e) {
    //
    //     } finally {
    //         console.log(bookingData)
    //     }
    // }


    return (
        <Form onSubmit={handleSubmit} style={{border: '1px solid #2185D0', padding: 10, marginTop: 14}}>
            <Form.Group unstackable widths={2}>
                <Form.Input label='Valitse käyttäjä'>
                    <Dropdown
                        placeholder='Käyttäjä'
                        fluid
                        search
                        selection
                        options={getUsers().concat({key: 1, text: 'Kaikki', value: 1}).reverse()}
                        onChange={handleUserChange}
                        value={user}
                    /></Form.Input></Form.Group>
            <Form.Group>
                <Form.Input label='Alkaen'>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        locale={fi}
                    />
                </Form.Input>
            </Form.Group>
            <Form.Group>
                <Form.Input label='Päättyen'>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        locale={fi}
                    />
                </Form.Input>
            </Form.Group>
            <Button primary type='submit'>Hae</Button>
        </Form>
    );
}

export default AdminBookingsSearchForm;
