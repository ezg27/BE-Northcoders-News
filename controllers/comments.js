const { Comment } = require('../models');

const getComments = (req, res, next) => {
  Comment.find().populate('created_by')
    .then(comments => {
      res.status(200).send({ comments });
    });
};

const deleteCommentById = (req, res, next) => {
  let obj = { _id: req.params.comment_id};
  Comment.findByIdAndRemove(obj._id).populate('created_by')
  .then(comment => {
    if (!comment) throw { status: 404, msg: 'Comment ID does not exist!' };
    res.status(200).send({ comment });
  })
  .catch(next);
}

const adjustCommentVoteCountById = (req, res, next) => {
  if (Object.keys(req.query)[0] !== 'vote') throw { status: 400, msg: '"vote" is the only valid query!' };
  let update = req.query.vote === 'up' ? { $inc: { votes: 1 } } : { $inc: { votes: -1 } };
  if (!update) throw { status: 400, msg: 'Query value must be either "up" or "down"!' }
  let obj = { _id: req.params.comment_id };
  Comment.findByIdAndUpdate(obj._id, update, {new: true}).populate('created_by').then(comment => {
    if (!comment) throw { status: 404, msg: 'Comment ID does not exist!' };
    res.status(200).send({ comment });
  })
  .catch(next);
}

module.exports = {getComments, deleteCommentById, adjustCommentVoteCountById};
