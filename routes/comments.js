const commentRouter = require('express').Router();
const {getComments, deleteCommentById} = require('../controllers/comments');

commentRouter.route('/').get(getComments);

commentRouter.route('/:comment_id')
  .delete(deleteCommentById);

module.exports = commentRouter;
