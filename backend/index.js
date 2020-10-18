// Configuration file
require('./config/config');
// DB-Connection
const dbconnection = require('./config/config');
// Express
const express = require('express');
const app = express();
const morgan = require('morgan');
// CORS
const cors = require('cors');
// Start db connection
dbconnection();
// Body parser
app.use(express.json({ extended: true}));
// CORS
app.use(cors());
app.use(morgan('dev'));
// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT} port.`);
});