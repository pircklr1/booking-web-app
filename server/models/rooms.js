module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
        'rooms',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            freezeTableName: true
        });
    Room.associate = function (models) {
        Room.hasMany(models.Booking)
    };
    return Room;
};
