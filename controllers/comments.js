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
    if (!comment) throw { status: 404, msg: 'Comment ID does not exist!' };
    res.status(200).send({ comment });
  })
  .catch(err => {
    if (err.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
      next({ status: 400, msg: 'Comment ID is invalid!' });
    }
    else next(err);
  })
}

module.exports = {getComments, deleteCommentById, adjustCommentVoteCountById};
