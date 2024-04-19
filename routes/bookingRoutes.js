const express = require('express');
const router = express.Router();

const bookingControllers = require('../controllers/bookingControllers');
const userAuth = require('../middleware/userAuth');

router.post('/add/:train_id', userAuth.jwtAuth, bookingControllers.addBooking);
router.get('/get', userAuth.jwtAuth, bookingControllers.getBooking);

module.exports = router;