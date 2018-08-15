const { Article, Comment } = require('../models');

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
    .then(article => {
      res.status(200).send({ article });
    });
};

const getCommentsByArticleId = (req, res, next) => {
  Comment.find({belongs_to: req.params._id})
    .then(comments => {
      res.status(200).send({ comments });
    })
}

module.exports = {getArticles, getArticleById, getCommentsByArticleId};
