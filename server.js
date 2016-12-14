'use strict'
require('dotenv').config({ silent: true });
const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');
const raceRouter  = require('./routes/api/races');

const app         = express();
const PORT        = process.argv[2] || process.env.PORT || 3000;

app.use(logger('dev'));

// so app knows where to go for files
app.use(express.static(path.join(__dirname, 'dist')));

// This will parse our payload from fetch which is sent as a JSON object
app.use(bodyParser.json());

// serve race routes
app.use('/api/races', raceRouter);

app.listen(PORT, () => console.log('server here! listening on', PORT));
