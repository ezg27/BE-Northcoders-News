const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const bodyparser = require('body-parser');
const DB_URL = require('./config/db-config.js');

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

app.use((err, req, res, next) => {
  
})

module.exports = app;