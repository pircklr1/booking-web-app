module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define(
        'booking', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
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
                values: ['valid', 'cancelled']
            }
        },
        {
            underscored: true
        });
    Booking.associate = function (models) {
        Booking.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Booking.belongsTo(models.Room, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Booking;
};

