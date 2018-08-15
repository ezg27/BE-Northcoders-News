const commentRouter = require('express').Router();
const {getComments, deleteCommentById, adjustCommentVoteCountById} = require('../controllers/comments');

commentRouter.route('/').get(getComments);

commentRouter.route('/:comment_id')
  .put(adjustCommentVoteCountById)
  .delete(deleteCommentById);

module.exports = commentRouter;
