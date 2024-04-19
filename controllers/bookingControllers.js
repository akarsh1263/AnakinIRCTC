const pool = require('../db');
const queries = require('../queries');

exports.addBooking = async (req, res) => {
    const client = await pool.connect();
    try{
        const username = req.username;
        const train_id = req.params.train_id;

        await client.query('BEGIN');
        await client.query(queries.checkTrainidUpdate, [train_id], async (error, results) => {
            if(error) throw error;
            const seats = results.rows[0].seats;
            if(seats<1){
                await client.query('ROLLBACK');
                res.status(200).json({message: 'Seat not available'});
            }
        });

        await client.query(queries.decrementSeats, [train_id], (error, results) => {
            if(error) throw error;
        });

        await client.query(queries.addBooking, [username, train_id], (error, results) => {
            if(error) throw error;
            res.status(201).json({message: 'Booking added successfully'});
        });

        await client.query('COMMIT');
    }
    catch(error){
        await client.query('ROLLBACK');
        res.status(400).json({message: 'error', error: error});
    }
    finally{
        client.release();
    }
};

exports.getBooking = async (req, res) => {
    try{
        const username = req.username;

        await pool.query(queries.getUserBookings, [username], (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        });
    }
    catch(error){
        res.status(400).json({message: 'error', error: error});
    }
}