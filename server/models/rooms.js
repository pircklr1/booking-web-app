module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
        'room',
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
            available: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            equipment: DataTypes.TEXT
        },
        {
            underscored: true
        });
    Room.associate = function (models) {
        Room.hasMany(models.Booking)
    };
    return Room;
};
