const articleRouter = require('express').Router();
const {getArticles, getArticleById, getCommentsByArticleId, addCommentByArticleId} = require('../controllers/articles');

articleRouter.route('/').get(getArticles);

articleRouter.route('/:_id').get(getArticleById);

articleRouter.route('/:_id/comments')
  .get(getCommentsByArticleId)
  .post(addCommentByArticleId)

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = articleRouter;
