import React, {useState, useEffect, useContext} from 'react';
import {Form, Header, Tab} from "semantic-ui-react";
import AdminBookingsSearchForm from "./AdminBookingsSearchForm";
import AdminBookingsTable from "./AdminBookingsTable";
import moment from "moment";
import {getAllBookings, getAllBookingsPromise, getAllUsers, getUserBookingsBy} from "../../service/ClientService";
import Notification from "../Notification";

function Bookings() {
    const [bookingData, setBookingData] = useState([]);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [userData, setUserData] = useState([])
    const [user, setUser] = useState(1);
    const [message, setMessage] = useState(null)

    useEffect(() => {
        getAllUsers(setUserData);
    }, [])

    //get user names to dropdown
    const getUsers = () => {
        return userData.map(user => {
            return {key: user.id, text: user.firstName + " " + user.lastName, value: user.id}
        })
    }

    const handleUserChange = (e, {value}) => setUser(value)
    const handleStartDateChange = date => setStartDate(date)
    const handleEndDateChange = date => setEndDate(date)

    const handleSubmit = async () => {
        setMessage(null)
        const data = {
            user_id: user,
            start_date: moment(startDate).format('YYYY-MM-DD'),
            end_date: moment(endDate).format('YYYY-MM-DD')
        };

        try {
            const bookingData = user === 1 ?
                await getAllBookingsPromise() :
                await getUserBookingsBy(user);

            const bookingsByDates = bookingData.filter(booking => moment(booking.bookingDate)
                .isBetween(data.start_date, data.end_date, null, '[]'));

            setBookingData(bookingsByDates)
        } catch (e) {
            setMessage('Odottamaton virhe')
        }


        // return bookingsByDates;
    };

    return (
        <div>
            <Header as='h3' attached='top' block>Hae varauksia</Header>
            <AdminBookingsSearchForm
                handleSubmit={handleSubmit}
                handleUserChange={handleUserChange}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                userData={userData}
                startDate={startDate}
                endDate={endDate}
                user={user}
                setUserData={setUserData}
                getUsers={getUsers}
            />
            {message &&
            <Notification message={message}/>
            }
            <Header as='h3' attached='top' block>Haetut varaukset</Header>
            <AdminBookingsTable tableData={bookingData}/>
        </div>
    )
}

export default Bookings;