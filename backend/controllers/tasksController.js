// Models
const Task = require('../models/tasks');
const Project = require('../models/projects');
const { validationResult } = require('express-validator');

// Get user and project tasks
exports.getTasks = async (req, res) => {
    try {
        const {project} = req.body;
        const projectFound = await Project.findById(project);
        if(!projectFound){
            return res.status(400).json({
                ok: false,
                message: "Project not found"
            });
        }
        // Verify the user owner
        if(projectFound.user.toString() !== req.user.id){
            return res.status(400).json({
                ok: false,
                message: "Unauthorized"
            });
        }

        // Get tasks of the project
        const tasks = await Task.find({project});
        res.status(200).json({
            ok: true,
            data: tasks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "There was an error"
        });
    }
}

// Create a new task
exports.createTask = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(200).json({
            ok: false,
            error: error.array()
        });
    }
    // Extract the project
    const {project} = req.body;
    try {
        const projectFound = await Project.findById(project.toString());
        if(!projectFound){
            return res.status(400).json({
                ok: false,
                message: "Project not found"
            });
        }

        if(projectFound.user.toString() !== req.user.id){
            return res.status(400).json({
                ok: false,
                message: "Unauthorized"
            });
        }
        // Create the task
        const task = new Task(req.body);
        await task.save();
        res.status(200).json({
            ok: true,
            message: "Task created correctly",
            data: task
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }
}

exports.updateTask = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json({
            ok: false,
            error
        });
    }

    try {
        // Extract the project
        const {project, name, status} = req.body;

        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(400).json({
                ok: false,
                message: "Task not found"
            });
        }

        const projectFound = await Project.findById(project);

        if(projectFound.user.toString() !== req.user.id){
            return res.status(401).json({
                ok: false,
                message: "Not authorized"
            });
        }

        // New task
        const newTasks = {};

        if(name){
            newTasks.name = name;
        }
        if(status){
            newTasks.status = status;
        }

        tasks = await Task.findByIdAndUpdate({_id: req.params.id}, newTasks, {new: true});
        res.status(200).json({
            ok: true,
            data: tasks
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            message: "There was an error"
        })
    }
}

exports.deleteTask = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json({
            ok: false,
            error
        });
    }

    try {
        // Extract the project
        const {project} = req.body;

        const projectFound = await Project.findById(project);

        if(projectFound.user.toString() !== req.user.id){
            return res.status(401).json({
                ok: false,
                message: "Not authorized"
            });
        }

        // Delete task
        await Task.findByIdAndRemove({_id: req.params.id});
        res.status(200).json({
            ok: true,
            message: "Task deleted correctly"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            message: "There was an error"
        })
    }
}