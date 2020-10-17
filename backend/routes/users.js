// Users routes
const express = require('express');
const router = express.Router();
// Controllers
const usuarioController = require('../controllers/userController');
// Express validator
const { check } = require('express-validator');

// Create users
router.post('/',
    [
        check('username', 'The username is obligatory').not().isEmpty(),
        check('email', 'The email must be valid').isEmail(),
        check('password', 'The password have at least 6 characters').isLength({min: 6})
    ],
    usuarioController.createUser
);

module.exports = router;