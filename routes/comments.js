const commentRouter = require('express').Router();
const getComments = require('../controllers/comments');

commentRouter.route('/').get(getComments);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = commentRouter;
