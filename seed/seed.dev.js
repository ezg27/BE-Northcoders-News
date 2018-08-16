// const DB_URL = 'mongodb://localhost:27017/NC_News';
const { DB_URL } = require('./config/db-config.js');
const seedDB = require('./seed');
const mongoose = require('mongoose');
const { topicData, userData, articleData, commentData } = require('./devData/');

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    return seedDB({ topicData, userData, articleData, commentData });
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log(`Disconnected from ${DB_URL}`);
  });
