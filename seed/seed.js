const mongoose = require('mongoose');
const { Topic, User, Article, Comment } = require('../models/index');
const { formatArticleData, formatCommentData } = require('../utils/index.js');

const seedDB = ({ topicData, userData, articleData, commentData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      return Promise.all([
        Article.insertMany(
          formatArticleData(articleData, userDocs, commentData)
        ),
        topicDocs,
        userDocs
      ]);
    })
    .then(([articleDocs, topicDocs, userDocs]) => {
      return Promise.all([
        Comment.insertMany(
          formatCommentData(commentData, userDocs, articleDocs)
        ),
        topicDocs,
        userDocs,
        articleDocs
      ]);
    });
};

module.exports = seedDB;
