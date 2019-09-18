# Roba43 Room Booking Application
[Logo]:(https://github.com/kirsi-k/loppuprojekti-tilavaraus-applikaatio/blob/master/client/public/logo3.png)
This is a room booking application that was originally created as a final group project for Academy's Accelerated Learning-programming course. The application was created for an actual client and for actual use despite it being a school project.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development purposes.
### Prerequisites
#### Backend
* PostgreSQL
* Node.js
* Express
```
  "dependencies": {
    "async": "^3.1.0",
    "bcrypt": "^3.0.6",
    "body-parser": "^1.19.0",
    "concurrently": "^4.1.2",
    "cookie-parser": "^1.4.4",
    "cors": "^2.8.5",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "jest": "^24.9.0",
    "jsonwebtoken": "^8.5.1",
    "nodemailer": "^6.3.0",
    "pg": "^7.12.1",
    "pg-hstore": "^2.3.3",
    "sequelize": "^5.15.1",
    "sequelize-cli": "^5.5.0",
    "uuidv4": "^4.0.0",
    "validator": "^11.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/node": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/register": "^7.5.5",
    "faker": "^4.1.0",
    "lodash.random": "^3.2.0",
    "lodash.times": "^4.3.2",
    "nodemon": "^1.19.1"
  }
```
#### Frontend
* React.js
```
  "dependencies": {
    "axios": "^0.19.0",
    "jwt-decode": "^2.2.0",
    "moment": "^2.24.0",
    "react": "^16.9.0",
    "react-datepicker": "^2.8.0",
    "react-dom": "^16.9.0",
    "react-moment": "^0.9.2",
    "react-reveal": "^1.2.2",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.1.1",
    "semantic-ui-react": "^0.87.3"
  }
```
### Installing
First, clone the repository to your computer:
```
git clone https://github.com/kirsi-k/loppuprojekti-tilavaraus-applikaatio.git
```
Then, follow these steps:
```
0. Create postgres database to your computer (remember the name of your database)
1. Create .env-file in the root of server folder
2. Add the following lines to the file:
      NODE_ENV=development
      PORT=9999
      DATABASE= *put here the name of your database*
      DATABASE_USER=postgres
      DATABASE_PASSWORD= *your password*
      SECRET= *put here your secret*
      GMAILPW= *put here your email password*
      GMAIL_ADDRESS= *put here your email address*
3. Run npm install in client folder and server folder
4. Run npm start in client folder and server folder
```
## About the project
..
## Technologies
### Backend
* __Node.js__
* Express
* Postgres
* Sequelize
* JSON Web Token
* Bcrypt
* Nodemailer
### Frontend
* __React.js__
* Axios
* Semantic UI
* Moment.js
* JWT Decode
### Deployment
* Amazon RDS (Relational Database Service)
*
*
## Team
* [Sini](https://github.com/siniv)
* [Rico](https://github.com/pircklr1)
* [Lennu](https://github.com/lmetsaranta)
* [Kirsi](https://github.com/kirsi-k)

