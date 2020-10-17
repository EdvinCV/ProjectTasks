const mongoose = require('mongoose');
// DOTENV
require('dotenv').config({path: 'variables.env'});
// PORT
process.env.PORT = process.env.PORT || 3001;

// DB-Connection
const dbconnection = async () => {
    try {
        // Connect to DB
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        // If the connection is successfully prints in the console
        console.log("Database connected");
    } catch (error) {
        // If there is an error exit the process
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbconnection;