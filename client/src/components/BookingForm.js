import React, {Component, useState, useEffect} from 'react';
import {Button, Form, Modal, Header, Dropdown, Select} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import {getRoomData} from "../service/ClientService";
import subDays from 'date-fns/subDays'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import validate from '../validation/BookingFormValidation'
import Notification from '../components/Notification'

const BookingForm = ({ addBooking }) => {
    const [room, setRoom] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [roomdata, setRoomdata] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        getRooms();
    }, [])

    const getRooms = () => {
        getRoomData(list=>{
            setRoomdata(list.map(room => {
                return {key: room.id, text: room.name, value: room.id}
            } ))
        });
    };

    const handleRoomChange = (e, {value}) => setRoom(value)
    const handleDateChange = date => setStartDate(date)
    const handleStartTimeChange = time => setStartTime(time)
    const handleEndTimeChange = time => setEndTime(time)

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            room_id: room,
            booking_date: moment(startDate).format('YYYY-MM-DD'),
            start_time: moment(startTime).format('HH:mm:ss.SSS'),
            end_time: moment(endTime).format('HH:mm:ss.SSS')
        };
        console.log(data)

        try {
            validate(data)
            addBooking(data)
            setRoom("")
            setStartDate(new Date())
            setStartTime(new Date())
            setEndTime(new Date())
            setMessage('Varaus onnistui')
        } catch (e) {
            const error = []
            if (e.message === 'start time is before 6 am') {
                setMessage('Huoneita voi varata klo 6-22')
            }else if (e.message === 'end time is after 22 am'){
                setMessage('Huoneita voi varata klo 6-22')
            }else if (e.message === 'room was not set'){
                setMessage('Huonetta ei ole valittu')
            }else if (e.message === 'start time cannot be after endtime'){
                setMessage('Tarkista alkamis- ja päättymisaika')
            }else if (e.message === 'start time cannot be after endtime'){
                setMessage('Tarkista alkamis- ja päättymisaika')
            }else {
                setMessage('Error')
            }
        } finally {
            setTimeout(() => {
                setMessage(null) }, 7000);
        }
    }

        //const {value} = this.state
        return (
            <div>
                <Modal trigger={<Button primary>Varaa huone</Button>}>
                    <Modal.Header>Uusi varaus</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group unstackable widths={2}>
                                <Form.Field control={Select} label="Valitse huone" options={roomdata} placeholder="Huone"  onChange={handleRoomChange} value = {room}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='Päivämäärä'>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        minDate={subDays(new Date(), 0)}
                                        locale={fi}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='Alkaa'>
                                    <DatePicker
                                        selected={startTime}
                                        onChange={handleStartTimeChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        minTime={setHours(setMinutes(new Date(), 0), 6)}
                                        maxTime={setHours(setMinutes(new Date(), 30), 21)}
                                        timeIntervals={30}
                                        timeFormat="p"
                                        locale={fi}
                                        dateFormat="p"
                                        timeCaption="Klo"
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='Päättyy'>
                                    <DatePicker
                                        selected={endTime}
                                        onChange={handleEndTimeChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        minTime={setHours(setMinutes(new Date(), 30), 6)}
                                        maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                        timeIntervals={30}
                                        timeFormat="p"
                                        locale={fi}
                                        dateFormat="p"
                                        timeCaption="Klo"
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Button type='submit'>Varaa</Button>
                            {message &&
                                <Notification message={message}/>
                            }
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );

}

export default BookingForm;