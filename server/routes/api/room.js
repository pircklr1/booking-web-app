module.exports = (app, db) => {
    // @route   GET api/rooms
    // @desc    Get all rooms
    // @access  Public
    app.get('/api/rooms', (req, res) =>
        db.Room.findAll().then(result => res.json(result))
    );

    // @route   GET api/room/:id
    // @desc    Get room by id
    // @access  Public
    app.get('/api/room/:id', (req, res) =>
        db.Room.findByPk(req.params.id).then(result => res.json(result))
    );

    // @route   POST api/room
    // @desc    Post new room
    // @access  Public
    app.post('/api/room', (req, res) =>
        db.Room.create({
            name: req.body.name,
            capacity: req.body.capacity
        }).then(result => res.json(result))
    );

    // @route   PUT api/room/:id
    // @desc    Modify existing room
    // @access  Public
    app.put('/api/room/:id', (req, res) =>
        db.Room.update(
            {
                name: req.body.name,
                capacity: req.body.capacity
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(result => res.json(result))
    );

    // @route   DELETE api/room/:id
    // @desc    Delete existing room
    // @access  Public
    app.delete('/api/room/:id', (req, res) =>
        db.Room.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => res.json(result))
    );
};
