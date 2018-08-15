const topicRouter = require('express').Router();
const {getTopics, getArticlesByTopicSlug} = require('../controllers/topics');

topicRouter.route('/')
  .get(getTopics)

topicRouter.route('/:slug/articles')
  .get(getArticlesByTopicSlug);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = topicRouter;
