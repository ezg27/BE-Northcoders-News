const articleRouter = require('express').Router();
const getArticles = require('../controllers/articles');

articleRouter.route('/').get(getArticles);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = articleRouter;
