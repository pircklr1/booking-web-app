# Roba43 Room Booking Application
This is a room booking application that was originally created as a final group project for Academy's Accelerated Learning-programming course. The application was created for an actual client and for actual use despite it being a school project.
## Getting Started
..
### Prerequisites
..
### Installing
These instructions will get you a copy of the project up and running on your local machine for development purposes.
First clone the repository to your computer:
```
https://github.com/kirsi-k/loppuprojekti-tilavaraus-applikaatio.git
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
* BCrypt
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

