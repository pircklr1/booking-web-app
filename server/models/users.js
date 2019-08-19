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
                required: true
            },
            password: {
                type:DataTypes.STRING,
                required: true
            },
            role: {
                type: DataTypes.ENUM,
                values: ['user', 'admin']
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE
        },
        {
            freezeTableName: true,
            underscored: true
        }
    );

    return User;
};