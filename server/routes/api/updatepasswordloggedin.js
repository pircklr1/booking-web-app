import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 10;

module.exports = (app, db) => {
    app.put('/updatePassword/:id', (req, res) => {
        db.User.findByPk(req.params.id)
            .then((user) => {
                if (user != null) {
                    console.log('user found in db');
                    bcrypt
                        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
                        .then((hashedPassword) => {
                            user.update({
                                password: hashedPassword,
                            });
                        })
                        .then(() => {
                            console.log('password updated');
                            res.status(200).send('password updated');
                        });
                } else {
                    console.error('no user exists in db to update');
                    res.status(404).json('no user exists in db to update');
                }
            });
    });
};