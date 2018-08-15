const { Article } = require('../models');

const getArticles = (req, res, next) => {
  Article.find()
    // .populate('ownerId', 'name -_id')
    // .populate('ownerId')
    .then(articles => {
      res.status(200).send({ articles });
    });
};

const getArticleById = (req, res, next) => {
  Article.findOne(req.params)
    // .populate('ownerId', 'name -_id')
    // .populate('ownerId')
    .then(articles => {
      res.status(200).send({ articles });
    });
};

module.exports = {getArticles, getArticleById};
