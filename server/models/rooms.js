module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
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
=======
    const Room = sequelize.define('room', {
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
            },
            equipment: DataTypes.TEXT
        },
        {
            freezeTableName: true,
        }
    );
>>>>>>> 54b2e1a5b803c12bcb14d8af101933f2c15ca511

  return Room;
};
