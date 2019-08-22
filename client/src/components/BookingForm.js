import React, {Component} from 'react';
import {Button, Form, Modal, Header, Dropdown, Select} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';


//const options = [{key: 1, text: "1", value: 1},{key: 2, text: "2", value: 2}, {key: 3, text: "3", value: 3}, {key: 4, text: "4", value: 4},
 //   {key: 5, text: "5", value: 5}, {key: 6, text: "6", value: 6}, {key: 7, text: "7", value: 7}];
const options = [{key: "5", text: "Huone 5", value: "5"}, {key: "6", text: "Huone 6", value: "6"}, {key: "7", text: "Huone 7", value: "7"}];

class BookingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            room: "",
            startDate: new Date(),
            startTime: new Date(),
            endTime: new Date()
        };

        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        // let main = this.state.startDate
        // console.log(main.format('L'));
        const room_id = this.state.room;
        const start = moment(this.state.startDate).format('YYYY-MM-DD') + " " + moment(this.state.startTime).format('hh:mm:ss.SSSZZ');
        const end = moment(this.state.startDate).format('YYYY-MM-DD') + " " + moment(this.state.endTime).format('hh:mm:ss.SSSZZ');
        console.log(start);
        const data ={
            // room_id: room_id,
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
                                <Form.Field control={Select} label="Valitse huone" options={options} placeholder="Huone"  onChange={this.handleRoomChange} value = {this.state.room}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='Päivämäärä'>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.startDate}
                                        onChange={this.handleDateChange}
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

