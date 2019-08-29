//validates data which is sent with BookinForm

const validateBookingForm = (data) => {
    // console.log('data in form validation', data)

    //room can be booked between 06:00 and 22:00
    if (data.start_time.substring(0,2) < 6) {
        // console.log('start time is before 6 am')
        throw new Error('start time is before 6 am')
        // return false
    }
    if (data.end_time.substring(0,2) > 22) {
        // console.log('end time is after 22 am')
        throw new Error('end time is after 22 am')
        // return false
    }

    //room name must be set
    if (data.room_id === "") {
        // console.log('room was not set')
        throw new Error('room was not set')
        // return false
    }

    //room can be booked for one day only
    if (data.start_time.substring(0,2) > data.end_time.substring(0,2)) {
        // console.log('start time cannot be after endtime')
        throw new Error('start time cannot be after endtime')
        // return false
    }
    if ((data.start_time.substring(0,2) === data.end_time.substring(0,2)) &&  (data.start_time.substring(3,5) > data.end_time.substring(3,5))) {
        // console.log('start time cannot be after endtime')
        throw new Error('start time cannot be after endtime')
        // return false
    }

    //booking start- and end time must be even or half hour
    if((data.start_time.substring(3,5) === '00' || data.start_time.substring(3,5) === '30')&&
    (data.end_time.substring(3,5) === '00' || data.end_time.substring(3,5) === '30')){
    }else{
        // console.log('start and end time must be even or half hour');
        throw new Error('start and end time must be even or half hour')
        // return false
    }

    // console.log('validation succesfull')
    return true

};

export default validateBookingForm