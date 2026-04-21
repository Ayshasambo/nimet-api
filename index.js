const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const app = express();
require('dotenv').config();
const cors = require("cors");
const path = require('path');
const FILE_DIRECTORY = process.env.FILE_DIRECTORY || path.join(__dirname, 'files');

const lgaRoute = require('./routes/lga.js');
const srpRoute = require('./routes/srp.js');
const stateRoute = require('./routes/state.js');
const temperatureRoute = require('./routes/temperature.js');
const historicalDataRoute = require('./routes/historical-data.js')

app.use(express.json());
app.use('/api/lga', lgaRoute);
app.use('/api/srp', srpRoute);
app.use('/api/state', stateRoute);
app.use('/api/temperature', temperatureRoute);
app.use('/api/historical-data', historicalDataRoute);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

