const express = require('express');
const router = express.Router();
// Controllers
const {addProject, getProjects, updateProject, deleteProject} = require('../controllers/projectsController');
// Authentication middleware
const authentication = require('../middlewares/authentication');
// Express validator
const {check} = require('express-validator');

router
    .get('/', authentication, getProjects)
    .post('/', authentication, check('name', 'The name is obligatory').not().isEmpty() ,addProject)
    .put('/:id', authentication, check('name', 'The name is obligatory').not().isEmpty() ,updateProject)
    .delete('/:id', authentication, deleteProject);

module.exports = router;