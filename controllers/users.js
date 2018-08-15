const { User } = require('../models');

const getUsers = (req, res, next) => {
  User.find()
    // .populate('ownerId', 'name -_id')
    // .populate('ownerId')
    .then(users => {
      res.status(200).send({ users });
    });
};

module.exports = getUsers;
