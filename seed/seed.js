const mongoose = require('mongoose');
const { Topic, User, Article, Comment } = require('../models/index');
const {
  formatArticleData
} = require('../utils/index.js');

const seedDB = (topicData, userData, articleData, commentData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      // console.log(userDocs);
      return Promise.all([
        Article.insertMany(formatArticleData(articleData, userDocs, topicDocs)),
        topicDocs,
        userDocs
      ]);
    })
    .then(([articleDocs, topicDocs, userDocs]) => {
      console.log(articleDocs);
      // return Promise.all([
      //   Comment.insertMany(formatCommentData(commentData)),
      //   topicDocs,
      //   userDocs,
      //   articleDocs
      // ]);
    });
    // .then(([topicDocs, userDocs, articleDocs, commentDocs]) => {
    //   console.log(topicDocs);
    //   // console.log(userDocs);
    //   // console.log(articleDocs);
    //   // console.log(commentDocs);
    // })
}

module.exports = seedDB;