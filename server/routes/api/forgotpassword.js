const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const password = process.env.GMAILPW;
const sender = process.env.GMAIL_ADDRESS;

module.exports = (app,db) => {
    app.post('/api/forgot', (req, res) => {
        if (req.body.email === '') {
            res.status(400).send('email required');
        }
        console.error(req.body.email);
        db.User.findOne({
            where: {
                email: req.body.email,
            },
        }).then((user) => {
            if (user === null) {
                console.error('email not in database');
                res.status(403).send('email not in db');
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                user.update({
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 360000,
                });

                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: sender,
                        pass: password
                    },
                });

                const mailOptions = {
                    from: 'roba43tilavaraus@gmail.com',
                    to: user.email,
                    subject: 'Roba43 salasanan palauttaminen',
                    text: 'Sait tämän viestin, koska olet pyytänyt salasanasi palauttamista Roba43:n tilavarauspalveluun.\n\n' +
                        'Salasanasi uudelleenasettamiseksi klikkaa tätä linkkiä tai kopioi se selaimeesi:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'Mikäli et pyytänyt salasanasi palauttamista, jätä tämä viesti huomioimatta, niin salasanasi säilyy ennallaan.\n'
                };
                console.log('sending mail');

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error('there was an error: ', err);
                    } else {
                        console.log('here is the res: ', response);
                        res.status(200).json('recovery email sent');
                    }
                });
            }
        });
    });
};