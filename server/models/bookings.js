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

  return Booking;
};

export default booking;
