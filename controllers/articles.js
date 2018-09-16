const { Article, Comment } = require('../models');

const getArticles = (req, res, next) => {
  const getAllArticles = Article.find({}, '-__v').populate('created_by', '-__v').lean();
  const getAllComments = Comment.find();
      return Promise.all([
        getAllComments,
        getAllArticles
      ])
    .then(([comments, allArticles]) => {
      let articles = allArticles.map(article => {
        let artComs = comments.filter(comment => {
          return comment.belongs_to.toString() === article._id.toString();
        });
        article.comments = artComs.length;
        return article;
      })
      res.status(200).send({ articles });
    })
};

const getArticleById = (req, res, next) => {
  Article.findById(req.params.article_id, '-__v')
    .populate('created_by', '-__v')
    .lean()
    .then(article => {
      if (!article) throw { status: 404, msg: 'Article ID does not exist!' };
      return Promise.all([
        Comment.find({ belongs_to: article._id }),
        article
      ]);
    })
    .then(([comments, article]) => {
      article.comments = comments.length;
      res.status(200).send({ article });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params._id }).populate('created_by')
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
  if (Object.keys(req.query)[0] !== 'vote') throw { status: 400, msg: '"vote" is the only valid query!' }
  let update = (req.query.vote === 'up') ? { $inc: { votes: 1 } } : (req.query.vote === 'down') ? { $inc: { votes: -1 } } : null;
  if (!update) throw { status: 400, msg: 'Query value must be either "up" or "down"!'}
  let obj = { _id: req.params.article_id };
  Article.findByIdAndUpdate(obj._id, update, {new: true}).populate('created_by').lean()
    .then(article => {
      if (!article) throw { status: 404, msg: 'Article ID does not exist!' };
      return Promise.all([
        Comment.find({ belongs_to: article._id }),
        article
      ])
    }).then(([comments, article]) => {
      article.comments = comments.length;
      res.status(200).send({ article });
    })
    .catch(next);
}

module.exports = {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId, adjustArticleVoteCount};
