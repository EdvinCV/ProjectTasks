const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);