const DB_URL = require('../config/db-config.js');
const seedDB = require('./seed.js');
const mongoose = require('mongoose');
const { topicData, userData, articleData, commentData } = require('./devData/index.js');

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
