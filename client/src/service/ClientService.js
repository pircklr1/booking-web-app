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
    axios.post(baseUrl + '/login', data)
        .then(response => {
            return response.message
        })
        .catch(error => {
            return error.message
        })
}

export function handleSignup(data) {
                axios.post(baseUrl + '/signup', data)
                    .then(res => res.data)
            }
