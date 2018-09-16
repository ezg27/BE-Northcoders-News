const { Comment } = require('../models');

const getComments = (req, res, next) => {
  Comment.find().populate('created_by')
    .then(comments => res.status(200).send({ comments }));
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
  if (!req.query.hasOwnProperty('vote')) throw { status: 400, msg: '"vote" is the only valid query!' };
  let update = req.query.vote === 'up' ? 1 : req.query.vote === 'down' ? -1 : null;
  if (!update) throw { status: 400, msg: 'Query value must be either "up" or "down"!' }
  Comment.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: update } }, { new: true })
    .populate('created_by')
    .then(comment => {
      if (!comment) throw { status: 404, msg: 'Comment ID does not exist!' };
      res.status(200).send({ comment });
    })
    .catch(next);
}

module.exports = {getComments, deleteCommentById, adjustCommentVoteCountById};
