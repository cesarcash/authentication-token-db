const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {NODE_ENV,JWT_SECRET} = process.env;

module.exports.login = async (req,res) => {

    try{
        
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).send({message: 'Email and password are required'});
        }

        const userData = await User.findUserByCredentials(email,password);
        const token = await jwt.sign(
            {
                _id: userData._id
            },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            {
                expiresIn: '1d'
            }
        )

        res.status(200).send({message: 'ok', data: {email: userData.email, token} });

    }catch(err){
        res.status(400).send({message: err.message || 'Ocurrio un error inesperado'});
    }

}

module.exports.register = async (req,res) => {

    try {

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).send({message: 'Email and password are required'});
        }

        const hash = await bcrypt.hash(password,10);
        const userData = await User.create({email,password: hash});

        res.status(201).send({message: 'User registered successfully', data: {_id: userData._id, email: userData.email} });

    }catch(err){
        res.status(400).send({message: err.message || 'Ocurrio un error inesperado'});
    }

}