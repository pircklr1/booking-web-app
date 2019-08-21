import React, {Component} from 'react';
import RoomList from "../components/RoomList";
import BookingForm from "../components/BookingForm";
import {Container} from "semantic-ui-react";

class Calendar extends Component {
    render() {
        return (
            <div>
                <Container style={{overflow:'auto'}}>
                <RoomList/>
                </Container>
                <BookingForm/>
            </div>
        );
    }
}

export default Calendar;