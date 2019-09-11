// Popup for more information about a calendar booking.
// When a user (admin) clicks a calendar booking cell, this modal will be shown.
// The modal provides information about the booking (user, starting time and ending time).
import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
import { getRoomData } from '../service/ClientService';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import validate from '../validation/BookingFormValidation';
import Notification from '../components/Notification';
import { AuthContext } from '../context/auth';
import { createBooking } from '../service/ClientService';
import { withRouter } from 'react-router-dom';

function CalendarCellPopup(props) {
  const [room, setRoom] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [roomdata, setRoomdata] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    //getRooms();
  }, []);

  return (
    <div>
      <Modal trigger={<Button primary>Testi</Button>}>
        <Modal.Header
          style={{ borderBottomColor: '#0e6eb8', borderWidth: '4px' }}
        >
          testi
        </Modal.Header>
        <Modal.Content>testi</Modal.Content>
      </Modal>
    </div>
  );
}

export default withRouter(CalendarCellPopup);
