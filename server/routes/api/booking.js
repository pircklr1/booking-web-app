module.exports = (app, db) => {
  // @route   GET api/bookings
  // @desc    Get all bookings
  // @access  Public
  app.get('/bookings', (req, res) =>
    db.booking.findAll().then(result => res.json(result))
  );

  // @route   GET api/booking/:id
  // @desc    Get booking by id
  // @access  Public
  app.get('/booking/:id', (req, res) =>
    db.booking.findByPk(req.params.id).then(result => res.json(result))
  );

  // @route   POST api/booking
  // @desc    Post new booking
  // @access  Public
  app.post('/booking', (req, res) =>
    db.booking
      .create({
        user: req.body.user,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status
      })
      .then(result => res.json(result))
  );

  // @route   PUT api/booking/:id
  // @desc    Modify existing booking
  // @access  Public
  app.put('/booking/:id', (req, res) =>
    db.booking
      .update(
        {
          user: req.body.user,
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
  );

  // @route   DELETE api/booking/:id
  // @desc    Delete existing booking
  // @access  Public
  app.delete('/booking/:id', (req, res) =>
    db.booking
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};
