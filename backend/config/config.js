const mongoose = require('mongoose');
// DOTENV
require('dotenv').config({path: 'variables.env'});
// PORT
process.env.PORT = process.env.PORT || 3001;

// DB-Connection
const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbconnection;