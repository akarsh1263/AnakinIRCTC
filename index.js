const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/user', userRoutes);
app.use('/train', trainRoutes);
app.use('/booking', bookingRoutes);

app.listen(port, () => {
    console.log("Server is running on port " + port);
})