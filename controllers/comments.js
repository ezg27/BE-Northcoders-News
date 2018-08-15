const { Comment } = require('../models');

const getComments = (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.status(200).send({ comments });
    });
};

const deleteCommentById = (req, res, next) => {
  let obj = { _id: req.params.comment_id};
  Comment.deleteOne(obj)
  .then(comment => {
    res.status(200).send({ comment });
  })
}

module.exports = {getComments, deleteCommentById};
