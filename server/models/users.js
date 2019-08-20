module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type:DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM,
                values: ['user', 'admin']
            },
        },
        {
            freezeTableName: true,
            underscored: true
        }
    );

    return User;
};