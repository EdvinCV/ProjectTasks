const express = require('express');
const router = express.Router();
// Controller
const {createTask, getTasks, updateTask, deleteTask} = require('../controllers/tasksController');
// Validator
const {check} = require('express-validator');
// Middlewares
const authentication = require('../middlewares/authentication');

router
    .get('/', authentication, getTasks)
    .post('/', [check('name', 'The name is obligatory').not().isEmpty()] ,authentication, createTask)
    .put('/:id', 
        [check('name', 'The name is obligatory').not().isEmpty(),
        check('status', 'The status is obligatory').not().isEmpty(),
        check('project', 'The project is obligatory').not().isEmpty()],
        authentication, 
        updateTask
    )
    .delete('/:id', authentication, deleteTask);

module.exports = router;