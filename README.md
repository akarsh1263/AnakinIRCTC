# AnakinIRCTC

AnakinIRCTC is a project for railway management system built using Node.js and PostgreSQL.

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Setup Instructions

1. Open PostgreSQL shell and run the following commands to set up the database:

   ```sql
   CREATE DATABASE anakinirctc;

   CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    password VARCHAR NOT NULL
   );

   CREATE TABLE trains (
    train_id VARCHAR PRIMARY KEY,
    source VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    seats INTEGER NOT NULL CHECK (seats >= 0)
   );

   CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL REFERENCES users(username),
    train_id VARCHAR NOT NULL REFERENCES trains(train_id)
   );

2. Create a .env file in the root directory of the project and add the required environment variables.
3. Install dependencies by running the following command in the terminal:
   ```node
   npm install
5. Finally, run the server using the following command:
   ```node
   node index.js

## API Endpoints

### User Registration
URL: `/user/registration`
Method: `POST`
Request Body:
```json
{
 "username": "akarsh1",
 "password": "pass1"
}
```

### User Login
URL: `/user/login`
Method: `POST`
Request Body:
```json
{
 "username": "akarsh1",
 "password": "pass1"
}
```
Response: JWT token

### Add train by Admin
URL: `/train/add`
Method: `POST`
Request Body:
```json
{
    "train_id": "train1",
    "source": "source1",
    "destination": "destination1",
    "seats": 5
}
```
Header: Requires 'api-key' in header

### Update seats by Admin
URL: `/train/updateseats/:train_id`
Method: `PUT`
Request Body:
```json
{
    "seats": 2
}
```
Header: Requires 'api-key' in header

### Get trains from source to destination
URL: `/train/get`
Method: `GET`
Request Body:
```json
{
    "source": "source1",
    "destination": "destination"
}
```

### Book a seat
URL: `/booking/add/:train_id`
Method: `POST`
Authorization: JWT token as bearer token

### Get specific booking details
URL: `/booking/get`
Method: `GET`
Authorization: JWT token as bearer token

