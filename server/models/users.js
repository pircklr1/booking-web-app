const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                },
                unique: {
                    args: true,
                    msg: 'Email address is already in use!'
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM,
                values: ['user', 'admin']
            }
        },
        {
            underscored: true,
            hooks: {
                beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    instanceMethods: {
        validPassword(password){
            return bcrypt.compare(password, this.password);
        }
    }
    });
    User.associate = function (models) {
        User.hasMany(models.Booking)
    };
    return User;
};