const pool = require('../db');
const queries = require('../queries');

exports.addTrain = async (req, res) => {
    try{
    const train_id = req.body.train_id;
    const source = req.body.source;
    const destination = req.body.destination;
    const seats = req.body.seats;

    await pool.query(queries.checkTrainid, [train_id], async (error, results) => {

        if(error){
            res.status(400).json({message: 'error', error: error});
        }
        if(results.rows.length){
            res.status(403).json({message: 'Train already exists'});
        }

        await pool.query(queries.addTrain, [train_id, source, destination, seats], (error, results) => {
            if(error) throw error;
            res.status(201).json({message: 'Train added successfully'});
        });
        
    });
    }
    catch(error){
        res.status(400).json({message: 'error', error: error});
    }
};

exports.getTrains = async (req, res) => {
    try{

        const source = req.body.source;
        const destination = req.body.destination;

        await pool.query(queries.getTrains, [source, destination], (error, results) => {
            if(error) throw error;
            res.status(200).json(results.rows);
        });
    }
    catch(error){
        res.status(400).json({message: 'error', error: error});
    }
}

exports.updateSeats = async (req, res) => {
    try{

        const train_id = req.params.train_id;
        const seats = req.body.seats;

        await pool.query(queries.updateSeats, [seats, train_id], (error, results) => {
            if(error) throw error;
            res.status(200).json({message: 'Seats updated successfully'});
        });
    }
    catch(error){
        res.status(400).json({message: 'error', error: error});
    }
}