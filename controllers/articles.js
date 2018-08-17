const { Article, Comment } = require('../models');

const getArticles = (req, res, next) => {
  Article.find().populate('created_by', '-__v').lean()
    .then(allArticles => {
      Comment.find().lean()
      .then(comments => {
        let articles = allArticles.map(article => {
          let artComs = comments.filter(comment => {
            return comment.belongs_to.toString() === article._id.toString();
          }).length;
          article.comments = artComs;
          return article;
        })
        res.status(200).send({ articles });
      })
    });
};

const getArticleById = (req, res, next) => {
  let obj = { _id: req.params.article_id };
  Article.findOne(obj).populate('created_by', '-__v')
    .then(article => {
      if (!article) throw {status: 404, msg: 'Article ID does not exist!'}
      res.status(200).send({ article });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  Comment.find({belongs_to: req.params._id})
    .then(comments => {
      if (comments.length === 0) throw { status: 404, msg: 'Article ID does not exist!' }
      res.status(200).send({ comments });
    })
    .catch(next)
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
  Article.findByIdAndUpdate(obj._id, update, {new: true})
    .then(article => {
      if (!article) throw { status: 404, msg: 'Article ID does not exist!' };
      res.status(200).send({ article });
    })
    .catch(next);
    // .catch(err => {
    //   if (err.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
    //     next({ status: 400, msg: 'Article ID is invalid!' });
    //   }
    //   else next(err);
    // });
}

module.exports = {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId, adjustArticleVoteCount};
