require('dotenv').config();
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

require('uuidv4');

//Importing sequelize and its models
import models, {sequelize} from './models';

//Faker is used in development to create random data for our system
const faker = require('faker');

//Lodash random creates random numbers for development purposes, lodash times specifies the multiple of creations.
import random from 'lodash.random';
import times from 'lodash.times';

//Importing api routes
import apiBooking from './routes/api/booking';
import apiRoom from './routes/api/room';
import apiUser from './routes/api/user';

// Setting up some packages for the server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// These methods connect api routes to server.
apiBooking(app, models);
apiRoom(app, models);
apiUser(app, models);

// Erasing everything from the database
const eraseDatabaseOnSync = true;

// Starting the server
sequelize.sync({force: eraseDatabaseOnSync}).then(async () => {
    if (eraseDatabaseOnSync) {
        createMockData();
    }

    app.listen(process.env.PORT, () => {
        console.log('***********************************************');
        console.log(`Listening on port ${process.env.PORT}!`);
        console.log('***********************************************');
    });
});

// With this function, we create mock data for our database.
const createMockData = async () => {
    // populate booking table with dummy data
    models.Booking.bulkCreate(
        times(10, () => ({
            start: faker.date.future(),
            end: faker.date.future(),
            status: faker.random.arrayElement(['valid', 'cancelled'])
        }))
    );
    // populate room table with dummy data
    models.Room.bulkCreate(
        times(7, () => ({
            equipment: faker.lorem.words(),
            name: faker.lorem.word(),
            capacity: random(1, 20),
            available: faker.random.arrayElement(['true', 'false'])
        }))
    );
    // populate user table with dummy data
    models.User.bulkCreate(
        times(10, () => ({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: faker.random.arrayElement(['admin', 'user'])
        }))
    );
};
