const { Article, Comment } = require('../models');

const getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.status(200).send({ articles });
    });
};

const getArticleById = (req, res, next) => {
  console.log(req.params)
  let obj = { _id: req.params.article_id };
  Article.findOne(obj)
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
  let obj = req.body;
  obj.belongs_to = req.params._id;
  Comment.create(obj)
    .then(comment => {
    res.status(201).send({ comment });
  });
}

const adjustArticleVoteCount = (req, res, next) => {
  let update = (req.query.vote === 'up') ? { $inc: { votes: 1 } } : { $inc: { votes: -1 } };
  let obj = { _id: req.params.article_id };
  Article.findByIdAndUpdate(obj, update)
    .then(article => {
      res.status(200).send({ article });
    })
}

module.exports = {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId, adjustArticleVoteCount};
