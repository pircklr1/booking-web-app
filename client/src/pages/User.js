// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBookings from '../components/UserBookings';
import {getAllBookings} from '../service/ClientService';
function User() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllBookings(setData);
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
