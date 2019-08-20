module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
  const User = sequelize.define(
    'users',
    {
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
        type: DataTypes.STRING,
        required: true
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin']
      }
    },
    {
      freezeTableName: true,
      underscored: true
    }
  );
=======
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
                allowNull: false
            },
            password: {
                type:DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM,
                values: ['user', 'admin']
            },
        },
        {
            freezeTableName: true,
            underscored: true
        }
    );
>>>>>>> 54b2e1a5b803c12bcb14d8af101933f2c15ca511

  return User;
};
