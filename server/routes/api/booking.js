import Sequelize, {or} from 'sequelize';
import moment from 'moment';

const Op = Sequelize.Op;

module.exports = (app, db) => {
    // @route   GET api/bookings
    // @desc    Get all bookings
    // @access  Public
    app.get('/api/bookings', (req, res) =>
        db.Booking.findAll()
            .then(result => res.json(result))
            .catch(err => {
                console.error('Error with GET All', err.message);
                res.status(400).send(err.message);
            })
    );

    // @route   POST api/booking
    // @desc    Post new booking
    // @access  Public
    /* this checks if there is already booking at that time where user is trying to create new booking. */
    app.post('/api/booking', (req, res) => {
        var overlapping = [];
            db.Booking.findAll({
                where: {
                    bookingDate: req.body.booking_date,
                    roomId: req.body.room_id
                },
            }).then((bookings) => {
                    for (var i = 0; i < bookings.length; i++) {
                        if ((moment(req.body.start_time, 'HH:mm:ss').isSameOrAfter(moment(bookings[i].startTime, 'HH:mm:ss')) &&
                            moment(req.body.start_time, 'HH:mm:ss').isSameOrBefore(moment(bookings[i].endTime, 'HH:mm:ss')))) {
                                overlapping.push(bookings[i])
                        } else if ((moment(req.body.end_time, 'HH:mm:ss').isSameOrAfter(moment(bookings[i].startTime, 'HH:mm:ss')) &&
                            moment(req.body.end_time, 'HH:mm:ss').isSameOrBefore(moment(bookings[i].endTime, 'HH:mm:ss')))) {
                            overlapping.push(bookings[i])

                        } else if (moment(bookings[i].startTime, 'HH:mm:ss') && moment(bookings[i].endTime, 'HH:mm:ss').isBetween(moment(req.body.start_time, 'HH:mm:ss'), moment(req.body.end_time, 'HH:mm:ss'))) {
                            overlapping.push(bookings[i])
                        }
                    }
                })
                .then(() => {
                if (overlapping.length !== 0) {
                    res.status(403).send('overlapping booking')
                } else {
                    console.log('no overlapping booking');
                    db.Booking.create({
                        userId: req.body.user_id,
                        roomId: req.body.room_id,
                        bookingDate: req.body.booking_date,
                        startTime: req.body.start_time,
                        endTime: req.body.end_time,
                        isValid: req.body.is_valid
                    }).then(result =>
                        res.json(result)).catch(err => {
                        console.error("Error with POST", err.message);
                        res.status(400).send(err.message);
                    });
                }
            })
        });

// @route   GET api/booking/:id
// @desc    Get booking by id
// @access  Public
    app.get('/api/booking/:id', (req, res) =>
        db.Booking.findByPk(req.params.id)
            .then(result => res.json(result))
            .catch(err => {
                console.error('Booking not found', err.message);
                res.status(404).send(err.message);
            })
    );

  // @route   GET api/userbookings/:userId
  // @desc    Get all bookings for user
  // @access  Public
  app.get('/api/userbookings/:id', (req, res) =>
    db.Booking.findAll({
      where: {
        userId: req.params.id
      }
    })
      .then(result => res.json(result))
      .catch(err => {
        console.error('Error with GET All', err.message);
        res.status(400).send(err.message);
      })
  );

  // @route   PUT api/booking/:id
  // @desc    Modify existing booking
  // @access  Public
  app.put('/api/booking/:id', (req, res) =>
    db.Booking.update(
      {
        userId: req.body.user_id,
        roomId: req.body.room_id,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(result => res.json(result))
      .catch(err => {
        console.error('Error with PUT', err.message);
        res.status(400).send(err.message);
      })
  );

  // @route   DELETE api/booking/:id
  // @desc    Delete existing booking
  // @access  Public
  app.delete('/api/booking/:id', (req, res) =>
    db.Booking.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(result => res.json(result))
      .catch(err => {
        console.error('Error with DELETE', err.message);
        res.status(400).send(err.message);
      })
  );
};
