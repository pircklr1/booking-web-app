import Sequelize from 'sequelize';
const Op = Sequelize.Op;

module.exports = (app, db) => {
    app.get('/api/reset/:token', (req, res) => {
        db.User.findOne({
            where: {
                resetPasswordToken: req.query.resetPasswordToken,
                resetPasswordExpires: {
                    [Op.gt]: Date.now(),
                },
            },
        }).then((user) => {
            if (user === null) {
                console.error('password reset link is invalid or has expired');
                res.status(403).send('password reset link is invalid or has expired');
            } else {
                res.status(200).send({
                    email: user.email,
                    message: 'password reset link ok',
                });
            }
        });
    });
};