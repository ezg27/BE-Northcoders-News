const { Topic } = require('../models');

const getTopics = (req, res, next) => {
  Topic.find()
    // .populate('ownerId', 'name -_id')
    // .populate('ownerId')
    .then(topics => {
      res.status(200).send({ topics });
    });
};

module.exports = getTopics;
