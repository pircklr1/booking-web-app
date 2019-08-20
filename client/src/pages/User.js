// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBookings from '../components/UserBookings';
function User() {
  const [data, setData] = useState([]);
  // const [url, setUrl] = useState('http://localhost:9999/api/bookings/');

  const url = 'http://localhost:9999/api/bookings/';
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then(json => setData(json.data));
    setIsLoading(false);
  }, []);

  const renderTable = () => {
    return data.map(booking => {
      return (
        <tr>
          <td>{booking.id}</td>
          <td>{booking.user_id}</td>
          <td>{booking.room_id}</td>
          <td>{booking.status}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1 id='title'>All bookings</h1>
      <table id='bookings'>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Room</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default User;
