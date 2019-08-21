const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
// const User = require('../../models/users').User;
const bcrypt = require('bcrypt');
const withAuth = require('../../middleware/middleware');
const cookieParser = require('cookie-parser');



module.exports = (app, db) => {
    // @route   GET api/users
    // @desc    Get all users
    // @access  Public
    app.get('/api/users', withAuth, (req, res) =>
        db.User.findAll().then(result => res.json(result))
    );

    // simple helper function for token validation
    app.get('/api/checktoken', withAuth, (req, res) =>
        res.sendStatus(200)
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

   app.post('/api/login', (req, res) => {
        const {email, password} = req.body;
        db.User.findOne({
            where: {
                email: email
            }
        })
            .then(async function (data) {
                if (!data) {
                    return res.status(401).send({
                        msg: 'Salasana tai sähköposti on virheellinen'
                    }) 
                }
                const match = await bcrypt.compare(password, data.password);
                if (!match) {
                   return res.status(401).send({
                        msg: 'Salasana tai sähköposti on virheellinen'
                    }) 
                } else {
                    const payload = {email};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, {httpOnly: true})
                        .sendStatus(200);
                }
            })
            .catch(function (err) {
                console.log(err)
            })
    });
};
