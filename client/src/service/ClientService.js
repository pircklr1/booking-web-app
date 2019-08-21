import axios from 'axios';
const baseUrl = 'http://localhost:9999/api';

export function getAllBookings(setData) {
    axios.get(baseUrl + '/bookings')
        .then(response => {
            return setData(response.data)
        })
        .catch(error => {
            return error.message
        })
}

export function handleLogin(data) {
    return axios.post(baseUrl + '/login', data, {
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => {
            if(response.status === 200) {
                return true
            }else if (response.status === 404) {
                return false
            } else {
                const error = new Error(response.error);
                throw error;
            }
        })
        .catch(error => {
            return false
        });
}

export function handleSignup(data) {
               return axios.post(baseUrl + '/signup', data)
                    .then(response => {
                     if(response.status === 200) {
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
