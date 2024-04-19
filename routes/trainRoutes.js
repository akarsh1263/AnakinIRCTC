const express = require('express');
const router = express.Router();

const trainControllers = require('../controllers/trainControllers');
const adminAuth = require('../middleware/adminAuth');

router.post('/add', adminAuth.checkApiKey, trainControllers.addTrain);
router.put('/updateseats/:train_id', adminAuth.checkApiKey, trainControllers.updateSeats);
router.get('/get', trainControllers.getTrains);

module.exports = router;