const articleRouter = require('express').Router();
const {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId, adjustArticleVoteCount} = require('../controllers/articles');

articleRouter.route('/').get(getArticles);

articleRouter.route('/:article_id')
  .get(getArticleById)
  .put(adjustArticleVoteCount)

articleRouter.route('/:_id/comments')
  .get(getCommentsByArticleId)
  .post(addCommentByArticleId)

module.exports = articleRouter;
