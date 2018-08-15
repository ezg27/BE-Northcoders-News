const articleRouter = require('express').Router();
const {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId} = require('../controllers/articles');

articleRouter.route('/').get(getArticles);

articleRouter.route('/:article_id').get(getArticleById);

articleRouter.route('/:_id/comments')
  .get(getCommentsByArticleId)
  .post(addCommentByArticleId)

module.exports = articleRouter;
