const { Comment } = require('../models');

const getComments = (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.status(200).send({ comments });
    });
};

const deleteCommentById = (req, res, next) => {
  let obj = { _id: req.params.comment_id};
  Comment.findByIdAndRemove(obj)
  .then(comment => {
    res.status(200).send({ comment });
  })
}

const adjustCommentVoteCountById = (req, res, next) => {
  let update = req.query.vote === 'up' ? { $inc: { votes: 1 } } : { $inc: { votes: -1 } };
  let obj = { _id: req.params.comment_id };
  Comment.findByIdAndUpdate(obj, update, {new: true}).then(comment => {
    res.status(200).send({ comment });
  });
}

module.exports = {getComments, deleteCommentById, adjustCommentVoteCountById};
