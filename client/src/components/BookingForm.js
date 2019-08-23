import React, {Component} from 'react';
import {Button, Form, Modal, Header, Dropdown, Select} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import {getRoomData} from "../service/ClientService";
import subDays from 'date-fns/subDays'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'

class BookingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            room: "",
            startDate: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            roomdata: [],
            formErrors: {startTime: '', endTime: ''},
            startTimeValid: false,
            endTimeValid: false,
            formValid: false
        };
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRooms = this.getRooms.bind(this);
    }

    componentDidMount() {
        this.getRooms();
    }

    getRooms = () => {
        getRoomData(list=>{
            console.log(list)
            var rooms=[];
            var oneRoom  = []
                list.map(room => (
                oneRoom  = {key: room.id, text: room.name, value: room.id},
                rooms.push(oneRoom)
                ))
            this.setState({roomdata: rooms});
            console.log(this.state.roomdata);
        });
    };

    handleRoomChange(e, {value}) {
        this.setState({
            room: value
        })
    }
    handleDateChange(date) {
        this.setState({
            startDate: date
        })
    }
    handleStartTimeChange(time) {
        this.setState({
            startTime: time
        })
    }
    handleEndTimeChange(time) {
        this.setState({
            endTime: time
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        //nämä valmiina jos tietokantaa lähetetään pvm ja ajat erikseen, ilman aikavyöhykettä
        // const date = moment(this.state.startDate).format('YYYY-MM-DD');
        // const start = moment(this.state.startTime).format('HH:mm');
        // const end = moment(this.state.endTime).format('HH:mm');
        const room_id = this.state.room;
        const start = moment(this.state.startDate).format('YYYY-MM-DD') + " " + moment(this.state.startTime).format('HH:mm:ss.SSSZZ');
        const end = moment(this.state.startDate).format('YYYY-MM-DD') + " " + moment(this.state.endTime).format('HH:mm:ss.SSSZZ');
        console.log(start);
        const data ={
            room_id: room_id,
            start: start,
            end: end
        };
        this.props.addBooking(data);
        this.setState({room: '',  startDate: '', startTime: '', endTime: ''});

        console.log(this.state.room)
        console.log(this.state.startDate)
        console.log(this.state.startTime)
        console.log(this.state.endTime)
    }

    render() {
        const {value} = this.state
        return (
            <div>
                <Modal trigger={<Button primary>Varaa huone</Button>}>
                    <Modal.Header>Uusi varaus</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group unstackable widths={2}>
                                <Form.Field control={Select} label="Valitse huone" options={this.state.roomdata} placeholder="Huone"  onChange={this.handleRoomChange} value = {this.state.room}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='Päivämäärä'>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.startDate}
                                        onChange={this.handleDateChange}
                                        minDate={subDays(new Date(), 0)}
                                        locale={fi}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='Alkaa'>
                                    <DatePicker
                                        selected={this.state.startTime}
                                        onChange={this.handleStartTimeChange}
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
                                        selected={this.state.endTime}
                                        onChange={this.handleEndTimeChange}
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
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default BookingForm;

