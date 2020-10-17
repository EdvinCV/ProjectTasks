/** USER MODEL */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        // Type field
        type: String,
        // Obligatory
        required: true,
        // Delete blank spaces
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        // Value is unique in all collection
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
}, {timestamps: true});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


module.exports = mongoose.model('User', userSchema);