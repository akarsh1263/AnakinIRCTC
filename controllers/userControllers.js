const pool = require('../db');
const queries = require('../queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

exports.userRegister = async (req, res) => {
    try{
    const username = req.body.username;
    const pass = req.body.password;
    const password = await bcrypt.hash(pass, 10);

    await pool.query(queries.checkUsername, [username], async (error, results) => {

        if(error){
            res.status(400).json({message: 'error', error: error});
        }
        if(results.rows.length){
            res.status(403).json({message: 'Username already exists'});
        }

        await pool.query(queries.addUser, [username, password], (error, results) => {
            if(error) throw error;
            res.status(201).json({message: 'User registered successfully'});
        });
        
    });
    }
    catch(error){
        res.status(400).json({message: 'error', error: error});
    }
};

exports.loginUser = async (req, res) => {
	try {
		const { username, password } = req.body
		
        await pool.query(queries.checkUsername, [username], async (error, results) => {

            if(error){
                res.status(400).json({message: 'error', error: error});
            }
            if(!results.rows.length){
                res.status(401).json({message: 'Username does not exist'});
            }
            const user_password = results.rows[0].password;
            if (await bcrypt.compare(password, user_password)) {

                const token = jwt.sign(
                    {
                        username: username
                    },
                    JWT_SECRET,
                    {expiresIn: '10m'}
                )
    
                return res.status(200).json({ status: 'ok', data: token })
            }
            res.status(403).json({ status: 'error', error: 'Invalid password' })

        })
		
	}
	catch (error) {
		res.status(400).json({ message: 'error', error: error });
	}
};