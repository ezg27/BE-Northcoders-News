const articleRouter = require('express').Router();
const {getArticles, getArticleById, getCommentsByArticleId} = require('../controllers/articles');

articleRouter.route('/').get(getArticles);

articleRouter.route('/:_id').get(getArticleById);

articleRouter.route('/:_id/comments').get(getCommentsByArticleId);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = articleRouter;
