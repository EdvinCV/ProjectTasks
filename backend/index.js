// Configuration file
require('./config/config');
// DB-Connection
const dbconnection = require('./config/config');
// Express
const express = require('express');
const app = express();
// Start db connection
dbconnection();

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT} port.`);
});