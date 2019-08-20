module.exports = (app, db) => {
  // @route   GET api/bookings
  // @desc    Get all bookings
  // @access  Public
  app.get('/api/bookings', (req, res) =>
    db.Booking.findAll().then(result => res.json(result))
  );

  // @route   GET api/booking/:id
  // @desc    Get booking by id
  // @access  Public
  app.get('/api/booking/:id', (req, res) =>
    db.Booking.findByPk(req.params.id).then(result => res.json(result))
  );

  // @route   POST api/booking
  // @desc    Post new booking
  // @access  Public
  app.post('/api/booking', (req, res) =>
    db.Booking.create({
      user_id: req.body.user_id,
      room_id: req.body.room_id,
      start: req.body.start,
      end: req.body.end,
      status: req.body.status
    }).then(result => res.json(result))
  );

  // @route   PUT api/booking/:id
  // @desc    Modify existing booking
  // @access  Public
  app.put('/api/booking/:id', (req, res) =>
    db.Booking.update(
      {
        user_id: req.body.user_id,
        room_id: req.body.room_id,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(result => res.json(result))
  );

  // @route   DELETE api/booking/:id
  // @desc    Delete existing booking
  // @access  Public
  app.delete('/api/booking/:id', (req, res) =>
    db.Booking.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => res.json(result))
  );
};
