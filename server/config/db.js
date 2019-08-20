const Sequelize = require('sequelize');
const env = require('./env.js');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: env.DATABASE_DIALECT,
});

// Connect all the models/tables in the database to a db object, so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Define models/tables
db.users = require('./models/users.js')(sequelize, Sequelize);
db.rooms = require('./models/rooms.js')(sequelize, Sequelize);
db.bookings = require('./models/bookings.js')(sequelize, Sequelize);

//Define relations
db.users.hasMany(db.bookings);
db.bookings.belongsTo(db.users);
db.rooms.hasMany(db.bookings);
db.bookings.hasOne(db.rooms);

module.exports = db;