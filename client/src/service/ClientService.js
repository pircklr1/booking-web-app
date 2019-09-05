import axios from 'axios';

const baseUrl = 'http://localhost:9999/api';

// @route   GET api/bookings
// @desc    Get all bookings
// @access  Public
export function getAllBookings(setData) {
  axios
    .get(baseUrl + '/bookings', {
      headers: {
        'Content-Type': 'application/json',
          token: localStorage.getItem('jwtToken')
      }
    })
    .then(response => {
      return setData(response.data);
    })
    .catch(error => {
      return error.message;
    });
}

// @route   GET api/userbookings/:userId
// @desc    Get all bookings for user
// @access  Public
export function getUserBookings(id, setData) {
  axios
    .get(baseUrl + '/userbookings/' + id, id, {
      headers: {
        'Content-Type': 'application/json',
          token: localStorage.getItem('jwtToken')
      }
    })
    .then(response => {
      return setData(response.data);
    })
    .catch(error => {
      return error.message;
    });
}

export function createBooking(data) {
  return axios
    .post(baseUrl + '/booking', data, {
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('jwtToken')
        }
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        return true;
      } else {
        const error = new Error(response.error);
        throw error;
      }
    })
    .catch(error => {
      return false;
    });
}

// @route   GET api/users
// @desc    Get all users
// @access  Public
export function getAllUsers(setUserData) {
  axios
    .get(baseUrl + '/users', {
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('jwtToken')
      }
    })
    .then(response => {
      console.log('JEPS');
      return setUserData(response.data);
    })
    .catch(error => {
      return error.message;
    });
}

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public
export function getAllRooms(setRoomData) {
  axios
    .get(baseUrl + '/rooms', {
      headers: {
        'Content-Type': 'application/json',
          token: localStorage.getItem('jwtToken')
      }
    })
    .then(response => {
      return setRoomData(response.data);
    })
    .catch(error => {
      return error.message;
    });
}

export function getRoomData(callback) {
  axios
    .get(baseUrl + '/rooms', {
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('jwtToken')
        }
        })
    .then(function(rooms) {
      callback(rooms.data);
    })
    .catch(error => {
      return false;
    });
}

// ADMIN SERVICES
export function adminDeleteBooking(id) {
  return axios
    .delete(baseUrl + '/booking/' + id, id, {
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('jwtToken')
        }
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      } else {
        const error = new Error(response.error);
        throw error;
      }
    })
    .catch(error => {
      return false;
    });
}

export function adminDeleteRoom(id) {
  return axios
    .delete(baseUrl + '/room/' + id, id, {
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('jwtToken')
        }
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      } else {
        const error = new Error(response.error);
        throw error;
      }
    })
    .catch(error => {
      return false;
    });
}

export function adminDeleteUser(id) {
  return axios
    .delete(baseUrl + '/user/' + id, id, {
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('jwtToken')
        }
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      } else {
        const error = new Error(response.error);
        throw error;
      }
    })
    .catch(error => {
      return false;
    });
}
