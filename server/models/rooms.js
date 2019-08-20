module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
        'rooms',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            equipment: DataTypes.TEXT
        },
        {
            freezeTableName: true
        });
    Room.associate = function (models) {
        Room.hasMany(models.Booking)
    };
    return Room;
};
