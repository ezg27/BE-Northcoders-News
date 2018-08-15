const { Topic } = require('../models');

const getTopics = (req, res, next) => {
  Topic.find()
    // .populate('ownerId', 'name -_id')
    // .populate('ownerId')
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getArticlesByTopicSlug = (req, res, next) => {
  Topic.find(req.params)
  .then(articles => {
    res.status(200).send({ articles });
  })
  .catch(next);
};

module.exports = { getTopics, getArticlesByTopicSlug };
