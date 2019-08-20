module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define(
        'booking',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            room_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'rooms',
                    key: 'id'
                }
            },
            start: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM,
                values: ['valid', 'cancelled', 'completed']
            }
        },
        {
            freezeTableName: true
        });
    Booking.associate = function (models) {
        Booking.belongsTo(models.User, {foreignKey: 'user_id', as: 'users'})
        Booking.belongsTo(models.Room, {foreignKey: 'room_id', as: 'room'})
    };
    return Booking;
};

