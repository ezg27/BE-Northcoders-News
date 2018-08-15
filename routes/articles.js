const articleRouter = require('express').Router();
const {getArticles, getArticleById} = require('../controllers/articles');

articleRouter.route('/').get(getArticles);

articleRouter.route('/:_id').get(getArticleById);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = articleRouter;
