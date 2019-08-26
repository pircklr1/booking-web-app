const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET;
const bcrypt = require('bcrypt');
const withAuth = require('../../middleware/middleware');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

module.exports = (app, db) => {
  // @route   GET api/users
  // @desc    Get all users
  // @access  Public
  app.get('/api/users', withAuth, (req, res) =>
    db.User.findAll().then(result => res.json(result))
  );

  // simple helper function for token validation
  app.get('/api/checktoken', withAuth, (req, res) => res.sendStatus(200));

  // @route   GET api/user/:id
  // @desc    Get user by id
  // @access  Public
  app.get('/api/user/:id', (req, res) =>
    db.User.findByPk(req.params.id).then(result => res.json(result))
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

  // @route   GET api/users/login
  // @desc    Login User / Returning JWT Token
  // @access  Public
  app.post('/api/users/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find user by email
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      // Check for user
      if (!user) {
        errors.email = 'Sähköposti tai salasana on virheellinen.';
        return res.status(400).json(errors);
      }

      // Check Password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, email: user.email }; // Create JWT Payload

          // Sign Token
          jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
            res.json({
              id: user.id,
              token
            });
          });
        } else {
          errors.email = 'Sähköposti tai salasana on virheellinen.';
          return res.status(400).json(errors);
        }
      });
    });
  });

  // @route   POST api/users/register
  // @desc    Register user
  // @access  Public
  app.post('/api/users/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        errors.email = 'Sähköpostiosoite on jo käytössä';
        return res.status(400).json(errors);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          var password2 = req.body.password;
          bcrypt.hash(password2, salt, (err, hash) => {
            if (err) throw err;
            password2 = hash;
          });

          db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: password2,
            role: req.body.role
          })
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      }
    });
  });
};
