import {NOW} from "sequelize";
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const password = process.env.GMAILPW;


module.exports = (app, db) => {
    app.get('/forgot', function (req, res) {
        res.render('forgot');
    });

    app.post('/forgot', function (req, res, next) {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    const token = buf.toString('hex');
                    done(err, token);
                });
            },
            function (token, done) {
                const {email} = req.body;
                db.User.findOne({
                    where: {
                        email: email
                    }
                }, function (err, user) {
                    if (!user) {
                        req.flash('error', 'Sähköpostilla ei löytynyt käyttäjätiliä! Tarkista sähköposti.');
                        return res.redirect('/forgot');
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = NOW + 3600000; // 1 hour

                    user.save(function (err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                const smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'roba43tilavaraus@gmail.com',
                        pass: password
                    }
                });
                const mailOptions = {
                    to: user.email,
                    from: 'roba43tilavaraus@gmail.com',
                    subject: 'Roba43 salasanan palauttaminen',
                    text: 'Sait tämän viestin, koska olet pyytänyt salasanasi palauttamista Roba43:n tilavarauspalveluun.\n\n' +
                        'Salasanasi uudelleenasettamiseksi klikkaa tätä linkkiä tai kopioi se selaimeesi:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'Mikäli et pyytänyt salasanasi palauttamista, jätä tämä viesti huomioimatta, niin salasanasi säilyy ennallaan.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    console.log('mail sent');
                    req.flash('success', 'Sähköposti on lähetetty osoitteeseen: ' + user.email + ' salasanan palauttamista varten.');
                    done(err, 'done');
                });
            }
        ], function (err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
    });

    app.get('/reset/:token', function (req, res) {
        const {token} = req.params.token;
        db.User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    isAfter: NOW
                }
            }
        }, function (err, user) {
            if (!user) {
                req.flash('error', 'Linkki salasanan vaihtamiseksi on virheellinen tai vanhentunut! Tarkista linkki.');
                return res.redirect('/forgot');
            }
            res.render('reset', {token});
        });
    });

    app.post('/reset/:token', function (req, res) {
        async.waterfall([
            function (done) {
                const {token} = req.params.token;
                db.User.findOne({
                    where: {
                        resetPasswordToken: token,
                        resetPasswordExpires: {
                            isAfter: NOW
                        }
                    }
                }, function (err, user) {
                    if (!user) {
                        req.flash('error', 'Linkki salasanan vaihtamiseksi on virheellinen tai vanhentunut! Tarkista linkki.');
                        return res.redirect('back');
                    }
                    if (req.body.password === req.body.confirm) {
                        const salt = bcrypt.genSaltSync();
                        const newpassword = bcrypt.hashSync(req.body.password, salt);
                        user.setPassword(newpassword, function (err) {
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.save(function (err) {
                                req.logIn(user, function (err) {
                                    done(err, user);
                                });
                            });
                        })
                    } else {
                        req.flash("error", "Salasanan varmistus epäonnistui!");
                        return res.redirect('back');
                    }
                });
            },
            function (user, done) {
                const smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'roba43tilavaraus@gmail.com',
                        pass: password
                    }
                });
                const mailOptions = {
                    to: user.email,
                    from: 'roba43tilavaraus@mail.com',
                    subject: 'Salasanasi on vaihdettu',
                    text: 'Hei,\n\n' +
                        'tämä on vahvistusviesti. Salasanasi tunnuksella ' + user.email + ' on nyt vaihdettu.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    req.flash('success', 'Salasanasi on nyt vaihdettu.');
                    done(err);
                });
            }
        ], function (err) {
            res.redirect('/');
        });
    });
}