const express = require('express');
const app = express();

const weatherRouter = require('./router/weather');
const locationRouter = require('./router/location');

app.use('/weather', weatherRouter);
app.use('/location', locationRouter);

module.exports = app;
