const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');

router.post('/register', userControllers.userRegister);
router.post('/login', userControllers.loginUser);

module.exports = router;