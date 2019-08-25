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

<<<<<<< HEAD
=======
export function handleLogin(data) {
    return axios
        .post(baseUrl + '/login', data)
        .then(response => {
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('jwttoken', token);
                console.log('**************');
                console.log(response);
                console.log('**************');

                return true;
            } else if (response.status === 404) {
                return false;
            } else {
                const error = new Error(response.error);
                throw error;
            }
        })
        .catch(error => {
            return false;
        });
}

>>>>>>> 9c33c0cbafa9bafd767201c629c181fa22889744
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
    .get(baseUrl + '/rooms', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
      return setRoomData(response.data);
    })
    .catch(error => {
      return error.message;
    });
}

<<<<<<< HEAD
=======
export function handleSignup(data) {
    return axios
        .post(baseUrl + '/signup', data)
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

>>>>>>> 9c33c0cbafa9bafd767201c629c181fa22889744
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

<<<<<<< HEAD
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
=======
export function sendForgotPasswordEmail(email) {
    return axios
        .post(baseUrl + '/forgot', email)
        .then(response => {
            if (response.status === 200) {
                return true;
            } else {
                const error = new Error(response.error);
                throw error;
            }
      
export function getRoomData(callback) {
    axios
        .get(baseUrl+'/rooms')
        .then(function (rooms) {
            callback(rooms.data);
        })
        .catch(error => {
            return false;
        });

>>>>>>> 9c33c0cbafa9bafd767201c629c181fa22889744
