module.exports = (app, db) => {
    // @route   GET api/bookings
    // @desc    Get all bookings
    // @access  Public
    app.get('/api/bookings', (req, res) =>
        db.Booking.findAll()
            .then(result => res.json(result))
                .catch(err => {
                    console.error("Error with GET All", err.message);
                    res.status(400).send(err.message);
            })
    );

    // @route   GET api/booking/:id
    // @desc    Get booking by id
    // @access  Public
    app.get('/api/booking/:id', (req, res) =>
        db.Booking.findByPk(req.params.id)
            .then(result => res.json(result))
                .catch(err => {
                    console.error("Booking not found", err.message);
                    res.status(404).send(err.message);
                })
    );

    // @route   POST api/booking
    // @desc    Post new booking
    // @access  Public
    app.post('/api/booking', (req, res) => {
            db.Booking.create({
                userId: req.body.user_id,
                roomId: req.body.room_id,
                start: req.body.start,
                end: req.body.end,
                status: req.body.status
            }).then(result => res.json(result))
                .catch(err => {
                    console.error("Error with POST", err.message);
                    res.status(400).send(err.message);
                });
        });

    // @route   PUT api/booking/:id
    // @desc    Modify existing booking
    // @access  Public
    app.put('/api/booking/:id', (req, res) =>
        db.Booking.update({
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
        ).then(result => res.json(result))
            .catch(err => {
                console.error("Error with PUT", err.message);
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
        }).then(result => res.json(result))
            .catch(err => {
                console.error("Error with DELETE", err.message);
                res.status(400).send(err.message);
            })
    );
};

