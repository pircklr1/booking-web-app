// import {NOW} from "sequelize";
// const async = require('async');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const password = process.env.GMAILPW;
//
// module.exports = (app, db) => {
//     app.post('/api/forgot', function (req, res, next) {
//         console.log(req.body.email);
//         const email = req.body.email;
//         async.waterfall([
//             function (done) {
//                 crypto.randomBytes(20, function (err, buf) {
//                     const token = buf.toString('hex');
//                     done(err, token);
//                 });
//             },
//             function (token, done) {
//                 console.log('haetaan käyttäjää')
//                 db.User.findOne({
//                     where: {
//                         email: email
//                     }
//                 }, function (err, users) {
//                     if (!users) {
//                         console.log('käyttäjää ei löydy')
//                         return res.redirect('/forgot');
//                     }
//                     users.resetPasswordToken = token;
//                     users.resetPasswordExpires = NOW + 3600000; // 1 hour
//                     console.log('käyttäjä löytynyt')
//                     users.save(function (err) {
//                         done(err, token, user);
//                     });
//                 });
//             },
//             function (token, users, done) {
//                 const smtpTransport = nodemailer.createTransport({
//                     service: 'Gmail',
//                     auth: {
//                         user: 'roba43tilavaraus@gmail.com',
//                         pass: password
//                     }
//                 });
//                 const mailOptions = {
//                     to: users.email,
//                     from: 'roba43tilavaraus@gmail.com',
//                     subject: 'Roba43 salasanan palauttaminen',
//                     text: 'Sait tämän viestin, koska olet pyytänyt salasanasi palauttamista Roba43:n tilavarauspalveluun.\n\n' +
//                         'Salasanasi uudelleenasettamiseksi klikkaa tätä linkkiä tai kopioi se selaimeesi:\n\n' +
//                         'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//                         'Mikäli et pyytänyt salasanasi palauttamista, jätä tämä viesti huomioimatta, niin salasanasi säilyy ennallaan.\n'
//                 };
//                 smtpTransport.sendMail(mailOptions, function (err) {
//                     console.log('mail sent');
//                     req.flash('success', 'Sähköposti on lähetetty osoitteeseen: ' + users.email + ' salasanan palauttamista varten.');
//                     done(err, 'done');
//                 });
//             }
//         ], function (err) {
//             if (err) return next(err);
//             res.redirect('/forgot');
//         });
//     });
//
//     app.get('api/reset/:token', function (req, res) {
//         const {token} = req.params.token;
//         db.User.findOne({
//             where: {
//                 resetPasswordToken: token,
//                 resetPasswordExpires: {
//                     isAfter: NOW
//                 }
//             }
//         }, function (err, users) {
//             if (!users) {
//                 req.flash('error', 'Linkki salasanan vaihtamiseksi on virheellinen tai vanhentunut! Tarkista linkki.');
//                 return res.redirect('/forgot');
//             }
//             res.render('reset', {token});
//         });
//     });
//
//     app.post('api/reset/:token', function (req, res) {
//         async.waterfall([
//             function (done) {
//                 const {token} = req.params.token;
//                 db.User.findOne({
//                     where: {
//                         resetPasswordToken: token,
//                         resetPasswordExpires: {
//                             isAfter: NOW
//                         }
//                     }
//                 }, function (err, users) {
//                     if (!users) {
//                         req.flash('error', 'Linkki salasanan vaihtamiseksi on virheellinen tai vanhentunut! Tarkista linkki.');
//                         return res.redirect('back');
//                     }
//                     if (req.body.password === req.body.confirm) {
//                         const salt = bcrypt.genSaltSync();
//                         const newpassword = bcrypt.hashSync(req.body.password, salt);
//                         users.setPassword(newpassword, function (err) {
//                             users.resetPasswordToken = undefined;
//                             users.resetPasswordExpires = undefined;
//
//                             users.save(function (err) {
//                                 req.logIn(users, function (err) {
//                                     done(err, user);
//                                 });
//                             });
//                         })
//                     } else {
//                         req.flash("error", "Salasanan varmistus epäonnistui!");
//                         return res.redirect('back');
//                     }
//                 });
//             },
//             function (users, done) {
//                 const smtpTransport = nodemailer.createTransport({
//                     service: 'Gmail',
//                     auth: {
//                         user: 'roba43tilavaraus@gmail.com',
//                         pass: password
//                     }
//                 });
//                 const mailOptions = {
//                     to: users.email,
//                     from: 'roba43tilavaraus@mail.com',
//                     subject: 'Salasanasi on vaihdettu',
//                     text: 'Hei,\n\n' +
//                         'tämä on vahvistusviesti. Salasanasi tunnuksella ' + user.email + ' on nyt vaihdettu.\n'
//                 };
//                 smtpTransport.sendMail(mailOptions, function (err) {
//                     req.flash('success', 'Salasanasi on nyt vaihdettu.');
//                     done(err);
//                 });
//             }
//         ], function (err) {
//             res.redirect('/');
//         });
//     });
// };