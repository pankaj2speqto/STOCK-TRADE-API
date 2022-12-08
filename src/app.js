const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/stock.route');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/', routes);

module.exports = app;
