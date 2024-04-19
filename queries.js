const checkUsername = 'SELECT * FROM users WHERE username=$1';
const addUser = 'INSERT into users (username, password) VALUES ($1, $2)';
const checkTrainid = 'SELECT * FROM trains WHERE train_id=$1';
const checkTrainidUpdate = 'SELECT * FROM trains WHERE train_id=$1 FOR UPDATE';
const addTrain = 'INSERT into trains (train_id, source, destination, seats) VALUES ($1, $2, $3, $4)';
const addBooking = 'INSERT into bookings (username, train_id) VALUES ($1, $2)';
const decrementSeats = 'UPDATE trains SET seats=seats-1 WHERE train_id=$1';
const getUserBookings = 'SELECT * FROM bookings WHERE username=$1';
const getTrains = 'SELECT * FROM trains WHERE source=$1 AND destination=$2';
const updateSeats = 'UPDATE trains SET seats=$1 WHERE train_id=$2';

module.exports = {
    checkUsername,
    addUser,
    checkTrainid,
    checkTrainidUpdate,
    addTrain,
    addBooking,
    decrementSeats,
    getUserBookings,
    getTrains,
    updateSeats,
}