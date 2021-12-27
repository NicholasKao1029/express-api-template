('use strict');
require('dotenv').config();
require('./database/connection-sequelize');
const express = require('express');
const cors = require('cors');
const app = express();
const baseRouter = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Allows this reference to be used within the application

baseRouter(app);

module.exports = app;
