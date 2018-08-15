const userRouter = require('express').Router();
const getUsers = require('../controllers/users');

userRouter.route('/').get(getUsers);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = userRouter;
