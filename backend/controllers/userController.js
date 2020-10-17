/**
 * User controller: This controller handle CRUD of User collection
 */
// Models
const User = require('../models/users');
// Bcrypt
const bcryptjs = require('bcryptjs');
// Express validator
const { validationResult } = require('express-validator');
// JWT
const jwt = require('jsonwebtoken');

// User controllers
exports.createUser = async (req, res) => {
    // Detect errors
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error: error.array()
        });
    }
    // Extract body fields
    const {email, password} = req.body;

    try {
        // Verify that the email is unique
        let user = await User.findOne({ email });

        // If there's already a user
        if(user){
            return res.status(400).json({
                ok: false,
                message: "The email already exists"
            });
        }
        // Save user
        user = new User(req.body);
        // Hash password
        // Generate salt
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt); 
        await user.save();

        // Create and send token
        const payload = {
            user: {
                id: user.id
            }
        };
        // Create token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000
        }, (error, token) => {
            if(error){
                throw error;
            }
            // Send user information and token to be added in the req
            res.status(200).json({
                ok: true,
                message: "User created",
                data: user,
                token
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "There was an error."
        });
    }
}