// Models
const Project = require('../models/projects');
const { validationResult } = require('express-validator');

// Get all the user projects
exports.getProjects = async (req, res) => {
    try {
        // Find the user projects
        const projects = await Project.find({user: req.user.id});
        res.status(200).json({
            ok: true,
            data: projects
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }
}

// Create a project
exports.addProject = (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            ok: false,
            error
        });
    }
    try {
        const project = new Project(req.body);
        // Get the user
        project.user = req.user.id;
        // Save the projects
        project.save();
        res.status(200).json({
            ok: true,
            data: project
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error'
        });
    }
}

// Update a project
exports.updateProject = async (req, res) => {
    // Get the project id
    const projectId = req.params.id;
    // Verify fields
    const error = validationResult(req);
    if(!error.isEmpty()){
            return res.status(400).json({
                ok: false,
                error
            });
    }
    // Get the name of project
    const {name} = req.body;
    // New project to update
    const newProject = {};
    // Verify the available fields
    if(name){
        newProject.name = name;
    }

    try {
        // Verify if project exists
        let project = await Project.findById(projectId);
        if(!project){
            return res.status(400).json({
                ok: false,
                message: "The project doesn't exists"
            });
        }
        // Verify the project owner
        if(project.user.toString() !== req.user.id){
            return res.status(401).json({
                ok: false,
                message: "Unauthorized"
            });
        }
        // Find the project and update it
        project = await Project.findByIdAndUpdate({_id: projectId}, {$set: newProject}, {new: true});
        res.json(project);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

exports.deleteProject = async (req, res) => {
    const projectId = req.params.id;

    try {
        let project = await Project.findById(projectId);
        if(!project){
            return res.status(400).json({
                ok: false,
                message: "The project doesn't exists"
            });
        }    
        // Verify the project owner
        if(project.user.toString() !== req.user.id){
            return res.status(401).json({
                ok: false,
                message: "Unauthorized"
            });
        }
        // Delete project
        await Project.findOneAndRemove({_id: projectId});
        res.json({
            ok: true,
            message: "Project deleted correctly"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}