const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET;
const bcrypt = require('bcrypt');
const withAuth = require('../../middleware/middleware');
const BCRYPT_SALT_ROUNDS = 10;

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserSettingsInput = require('../../validation/usersettings');

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
        db.User.findByPk(req.params.id)
            .then(result => res.json(result))
                .catch(err => {
                    console.error('User not found', err.message);
                    res.status(404).send(err.message);
                })
    );

    // @route   PUT api/user
    // @desc    Modify existing user
    // @access  Public
    app.put('/api/user/:id', (req, res) => {
        const {errors, isValid} = validateUserSettingsInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        db.User.findByPk(req.params.id)
        .then(user => {
            if (user === null) {
                console.error('no such user in db');
                res.status(404).send('user not found in database');
            } else if (user != null) {
                console.log('user exists in db');
                user.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                        })
                    .then(() => {
                        console.log('user updated');
                        res.status(200).send({message: 'user updated'});
                    });
            }
        })
    });

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
        const {errors, isValid} = validateLoginInput(req.body);

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
                    const payload = {id: user.id, email: user.email}; // Create JWT Payload

                    // Sign Token
                    jwt.sign(payload, SECRET_KEY, {expiresIn: 3600}, (err, token) => {
                        res.json({
                            name: user.firstName,
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
        const {errors, isValid} = validateRegisterInput(req.body);
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
                    let password2 = req.body.password;
                    bcrypt.hash(password2, salt, (err, hash) => {
                        if (err) throw err;
                        password2 = hash;
                    });

                    db.User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: password2
                    })
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            }
        });
    });
};
