const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) =>
{
    const User = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                required: true
            },
            password: {
                type: DataTypes.STRING,
                required: true
            },
            role: {
                type: DataTypes.ENUM,
                values: ['user', 'admin']
            }
        },
        {
            freezeTableName: true,
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

    return User;
};
