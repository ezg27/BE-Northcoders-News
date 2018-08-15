const { User } = require('../models');

const getUsers = (req, res, next) => {
  User.find()
    // .populate('ownerId', 'name -_id')
    // .populate('ownerId')
    .then(users => {
      res.status(200).send({ users });
    });
};

const getUserByUsername = (req, res, next) => {
  User.findOne(req.params)
    .then(user => {
      res.status(200).send({ user });
    });
};

module.exports = { getUsers, getUserByUsername };
