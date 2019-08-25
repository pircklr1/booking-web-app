import axios from 'axios';
const baseUrl = 'http://localhost:9999/api';

// @route   GET api/bookings
// @desc    Get all bookings
// @access  Public
export function getAllBookings(setData) {
  axios
    .get(baseUrl + '/bookings', {
      headers: {
        'Content-Type': 'application/json'
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
    .post(baseUrl + '/booking', data)
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

// @route   GET api/users
// @desc    Get all users
// @access  Public
export function getAllUsers(setUserData) {
  axios
    .get(baseUrl + '/users')
    .then(response => {
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
    .get(baseUrl + '/rooms')
    .then(response => {
      return setRoomData(response.data);
    })
    .catch(error => {
      return error.message;
    });
}

export function adminDeleteBooking(id) {
  return axios
    .delete(baseUrl + '/booking/' + id, id)
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

// This function contacts server for SIGNUP
export const handlessssSignup = userData => {
  axios
    .post(baseUrl + '/users/register', userData)
    .then(res => console.log(res));
  /* .then(res => props.history.push('/login'))
    .catch(err =>
      dispatch({
        //type: GET_ERRORS,
        payload: err.response.data
      })
    ); */
};
