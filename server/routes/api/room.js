module.exports = (app, db) => {
  // @route   GET api/rooms
  // @desc    Get all rooms
  // @access  Public
  app.get('/rooms', (req, res) =>
    db.room.findAll().then(result => res.json(result))
  );

  // @route   GET api/room/:id
  // @desc    Get room by id
  // @access  Public
  app.get('/room/:id', (req, res) =>
    db.room.findByPk(req.params.id).then(result => res.json(result))
  );

  // @route   POST api/room
  // @desc    Post new room
  // @access  Public
  app.post('/room', (req, res) =>
    db.room
      .create({
        capacity: req.body.capacity,
        equipment: req.body.equipment
      })
      .then(result => res.json(result))
  );

  // @route   PUT api/room/:id
  // @desc    Modify existing room
  // @access  Public
  app.put('/room/:id', (req, res) =>
    db.room
      .update(
        {
          capacity: req.body.capacity,
          equipment: req.body.equipment
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(result => res.json(result))
  );

  // @route   DELETE api/room/:id
  // @desc    Delete existing room
  // @access  Public
  app.delete('/room/:id', (req, res) =>
    db.room
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};
