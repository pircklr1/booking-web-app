module.exports = (app, db) => {
  // @route   GET api/users
  // @desc    Get all users
  // @access  Public
  app.get('/users', (req, res) =>
    db.post.findAll().then(result => res.json(result))
  );

  // @route   GET api/user/:id
  // @desc    Get user by id
  // @access  Public
  app.get('/user/:id', (req, res) =>
    db.user.findByPk(req.params.id).then(result => res.json(result))
  );

  // @route   POST api/user
  // @desc    Post new user
  // @access  Public
  app.post('/user', (req, res) =>
    db.user
      .create({
        email: req.body.email,
        password: req.body.password
      })
      .then(result => res.json(result))
  );

  // @route   PUT api/user/:id
  // @desc    Modify existing user
  // @access  Public
  app.put('/user/:id', (req, res) =>
    db.user
      .update(
        {
          email: req.body.email,
          password: req.body.password
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(result => res.json(result))
  );

  // @route   DELETE api/user/:id
  // @desc    Delete existing user
  // @access  Public
  app.delete('/user/:id', (req, res) =>
    db.user
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => res.json(result))
  );
};
