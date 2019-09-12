import React, {Component} from 'react';
import RoomList from "./RoomList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import {Form, Container} from "semantic-ui-react";

class RoomTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div>
                <Form style={{ marginTop: 20 , marginBottom: 20}}>
                    <Form.Group>
                        <Form.Input>
                            <DatePicker
                                dateFormat='dd/MM/yyyy'
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                locale={fi}
                            />
                        </Form.Input>
                    </Form.Group>
                </Form>
                <Container style={{ overflow: 'auto', marginLeft:'0px'}}>
                <RoomList date={this.state.startDate}/>
                </Container>
            </div>
        );
    }
}

export default RoomTable;