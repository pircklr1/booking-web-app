const validateBookingForm = (data) => {
    console.log('data in form validation', data)
    // if (moment(data.bookingDate).isBefore(moment(Date), 'day')) {
    //     console.log('booking date is before current day')
    //     return false
    // }

    if (data.start_time.substring(0,2) < 6) {
        console.log('start time is before 6 am')
        throw new Error('start time is before 6 am')
    }

    if (data.end_time.substring(0,2) > 22) {
        console.log('end time is after 22 am')
        throw new Error('end time is after 22 am')
    }

    if (data.room_id === "") {
        console.log('room was not set')
        throw new Error('room was not set')
    }

    if (data.start_time.substring(0,2) > data.end_time.substring(0,2)) {
        console.log('start time cannot be after endtime')
        throw new Error('start time cannot be after endtime')
    }

    if ((data.start_time.substring(0,2) === data.end_time.substring(0,2)) &&  (data.start_time.substring(3,5) > data.end_time.substring(3,5))) {
        console.log('start time cannot be after endtime')
        throw new Error('start time cannot be after endtime')
    }

    console.log('validation succesfull')

    // bookingDate: "2019-08-25"
    // endTime: "13:04:49.496"
    // room_id: "e59c527e-afd2-4b78-a09c-3e18f99dfa53"
    // startTime: "13:04:49.496"
}

export default validateBookingForm