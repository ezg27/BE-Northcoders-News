const topicRouter = require('express').Router();
const getTopics = require('../controllers/topics');

topicRouter.route('/').get(getTopics);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = topicRouter;
