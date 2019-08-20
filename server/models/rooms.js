module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'room',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  return Room;
};
