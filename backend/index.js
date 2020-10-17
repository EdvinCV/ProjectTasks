// Configuration file
require('./config/config');
// DB-Connection
const dbconnection = require('./config/config');
// Express
const express = require('express');
const app = express();
// Start db connection
dbconnection();
// Body parser
app.use(express.json({ extended: true}));
// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT} port.`);
});