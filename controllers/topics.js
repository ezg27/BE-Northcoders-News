const { Topic, Article } = require('../models');

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
  Article.find({belongs_to: req.params.slug})
  .then(articles => {
    res.status(200).send({ articles });
  })
  .catch(next);
};

const addArticleByTopicSlug = (req, res, next) => {
  Article.create(req.body)
    .then(article => {
      res.status(201).send({ article })
    })
}

module.exports = { getTopics, getArticlesByTopicSlug, addArticleByTopicSlug };
