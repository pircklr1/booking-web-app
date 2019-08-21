import React, { Component } from 'react';
import RoomList from '../components/RoomList';
import CalendarTable from '../components/CalendarTable';
class Calendar extends Component {
  render() {
    return (
      <div>
        <CalendarTable />
      </div>
    );
  }
}

export default Calendar;
