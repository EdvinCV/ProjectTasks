// Express
const express = require('express');
const router = express.Router();
// Body check function
const {check} = require('express-validator');
const { authenticateUser, getAuthenticatedUser } = require('../controllers/authController');
// Authentication mid
const authentication = require('../middlewares/authentication');

// Controllerconst authController = reu
router
    .get('/', authentication, getAuthenticatedUser)
    .post('/',
    [
        check('email', 'The email is obligatory').not().isEmpty(),
        check('password', 'The password is obligatory').not().isEmpty()
    ],
    authenticateUser
);

module.exports = router;