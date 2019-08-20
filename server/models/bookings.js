<<<<<<< HEAD
const booking = (sequelize, DataTypes) => {
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
        allowNull: false
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ['valid', 'cancelled', 'completed']
      }
    },
    {
      freezeTableName: true
    }
  );
=======
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('booking', {
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
                    key:'id'
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
            },
        },
        {
            freezeTableName: true,
        }
    );
>>>>>>> 54b2e1a5b803c12bcb14d8af101933f2c15ca511

  return Booking;
};

export default booking;
