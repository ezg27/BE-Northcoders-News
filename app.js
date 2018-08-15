const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const bodyparser = require('body-parser');
const DB_URL = 'mongodb://localhost:27017/NC_News';

app.use(bodyparser.json());


mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to DB')
  })

app.get('/', (req, res, next) => {
  res.send('Welcome to NC News...');
});


app.use('/api', apiRouter);


app.use('/*', (req, res) => {
  res.status(404).send({ err: 'Page not found' });
});


module.exports = app;