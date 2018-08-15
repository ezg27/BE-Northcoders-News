const articleRouter = require('express').Router();
const {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId, adjustVoteCount} = require('../controllers/articles');

articleRouter.route('/').get(getArticles);

articleRouter.route('/:article_id')
  .get(getArticleById)
  .put(adjustVoteCount)

articleRouter.route('/:_id/comments')
  .get(getCommentsByArticleId)
  .post(addCommentByArticleId)

module.exports = articleRouter;
