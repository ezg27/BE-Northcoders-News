const userRouter = require('express').Router();
const {getUsers, getUserByUsername} = require('../controllers/users');

userRouter.route('/').get(getUsers);

userRouter.route('/:username').get(getUserByUsername);

// areaRouter
//   .route('/:area_id/restaurants')
//   .get(getRestaurantsByAreaId)
//   .post(addRestaurantsToArea);

module.exports = userRouter;
