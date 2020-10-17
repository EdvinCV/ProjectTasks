// Express
const express = require('express');
const router = express.Router();
// Body check function
const {check} = require('express-validator');
const { authenticateUser } = require('../controllers/authController');
// Controllerconst authController = reu
router.post('/',
    [
        check('email', 'The email is obligatory').not().isEmpty(),
        check('password', 'The password is obligatory').not().isEmpty()
    ],
    authenticateUser
);

module.exports = router;