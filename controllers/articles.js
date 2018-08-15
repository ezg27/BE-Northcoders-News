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

const addCommentByArticleId = (req, res, next) => {
  Comment.create(req.body)
    .then(comment => {
    res.status(201).send({ comment });
  });
}

module.exports = {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId};
