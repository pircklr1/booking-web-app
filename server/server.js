const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 9999;

//Faker is used in development to create random data for our system
const faker = require('faker');
//Lodash random creates random numbers for development purposes
const random = require('lodash.random');

//api routes
const apiBooking = require('./routes/api/booking');
const apiRoom = require('./routes/api/room');
const apiUser = require('./routes/api/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// These methods connect api routes to server.
//apiBooking(app, db);
//apiRoom(app, db);
//apiUser(app, db);

db.sequelize.sync().then(() => {
  // populate booking table with dummy data
  db.booking.bulkCreate(
    times(10, () => ({
      roomId: random(1, 10),
      userId: random(1, 10),
      start: faker.date.future(),
      end: faker.date.future(),
      status: faker.lorem.sentence()
    }))
  );
  // populate room table with dummy data
  db.room.bulkCreate(
    times(10, () => ({
      equipment: faker.lorem.words(),
      capacity: random(1, 10),
      roomId: random(1, 10)
    }))
  );

  // populate user table with dummy data
  db.user.bulkCreate(
    times(10, () => ({
      email: faker.internet.email(),
      userId: random(1, 10)
    }))
  );

  app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
  });
});
