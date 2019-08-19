// This page shows the current user's current and past bookings. Here, the user can also modify (cancel) the current bookings.

import React, { Component } from 'react';
import UserBookings from '../components/UserBookings';
import UserBookings from '../components/UserBookings';
class User extends Component {
  render() {
    return (
      <div className='userinfo'>
        <div className='container'>
          <h1>Userpage</h1>
          <h2>Here we will show the name of the user</h2>
          <UserBookings />
        </div>
      </div>
    );
  }
}

export default User;
