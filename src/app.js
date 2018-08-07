const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET'
  })
);

const weatherRouter = require('./router/weather');
const locationRouter = require('./router/location');

app.use('/weather', weatherRouter);
app.use('/location', locationRouter);

module.exports = app;
