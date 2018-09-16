const { User } = require('../models');

const getUsers = (req, res, next) => {
  User.find({}, '-__v')
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {
  User.findOne(req.params, '-__v')
    .then(user => {
      if (user === null) throw { status: 404, msg: 'Username does not exist!' };
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUsers, getUserByUsername };
