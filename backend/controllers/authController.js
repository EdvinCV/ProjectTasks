/**
 * Auth controller: This controller handle the authentication endpoint
 */
// Models
const User = require('../models/users');
// Bcrypt
const bcryptjs = require('bcryptjs');
// JWT
const jwt = require('jsonwebtoken');
// Validation
const { validationResult } = require('express-validator');

exports.authenticateUser = async (req, res) => {
    // Get validation of the check functions on auth router
    const error = validationResult(req);
    // If there are errors with fields
    if(!error.isEmpty()){
        return res.status(400).json({
            ok: false,
            error: error.array()
        });
    }

    // Extract email and password
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        // Validate user
        if(!user){
            res.status(400).json({
                ok: false,
                message: "User or password incorrect"
            });
        }
        // Validate password
        const pass = await bcryptjs.compare(password, user.password);
        if(!pass){
            res.status(400).json({
                ok: false,
                message: "password incorrect"
            });
        }
        // JWT
        const payload = {
            user: {
                id: user.id
            }
        }
        // Create the token
        const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
            if(error){
                throw error;
            }
            // Send the user information and token to be added in the req
            res.status(200).json({
                ok: true,
                data: user,
                token
            });
        });
    } catch (error) {
        
    }
}