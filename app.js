const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const bodyparser = require('body-parser');
const DB_URL = process.env.DB_URL || require('./config/db-config.js');

app.use(bodyparser.json());
app.use(cors());

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to DB');
  });

app.get('/', (req, res, next) => {
  res.send({ message: 'Welcome to NC News...'});
});

app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  res.status(404).send({ err: 'Page not found' });
});

app.use((err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError' || err.name === 'Error')
    err.status = 400;
  res
    .status(err.status || 500)
    .send({ msg: err.msg || err.message || 'Internal server error!' });
  // res.status(500).send('Internal server error');
});

module.exports = app;
