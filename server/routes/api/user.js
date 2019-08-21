module.exports = (app, db) => {
  // @route   GET api/users
  // @desc    Get all users
  // @access  Public
  app.get('/api/users', (req, res) =>
    db.User.findAll().then(result => res.json(result))
  );

  // @route   GET api/user/:id
  // @desc    Get user by id
  // @access  Public
  app.get('/api/user/:id', (req, res) =>
    db.User.findByPk(req.params.id).then(result => res.json(result))
  );
    
  // @route   POST api/signup
  // @desc    Post new user
  // @access  Public
  app.post('/api/signup', (req, res) =>
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }).then(result => res.json(result))
  );

  // @route   PUT api/user/:id
  // @desc    Modify existing user
  // @access  Public
  app.put('/api/user/:id', (req, res) =>
    db.User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(result => res.json(result))
  );

  // @route   DELETE api/user/:id
  // @desc    Delete existing user
  // @access  Public
  app.delete('/api/user/:id', (req, res) =>
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => res.json(result))
  );
};
