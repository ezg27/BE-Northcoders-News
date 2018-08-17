const { Topic, Article } = require('../models');
const createNewTopic = require('./utils');

const getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getArticlesByTopicSlug = (req, res, next) => {
  Article.find({belongs_to: req.params.slug})
  .then(articles => {
    if (articles.length === 0) throw { status: 404, msg: 'Topic slug does not exist!' };
    res.status(200).send({ articles });
  })
  .catch(next);
};

const addArticleByTopicSlug = (req, res, next) => {
  let slug = { slug: req.params.slug };
  Topic.findOne(slug)
    .then(topic => {
      if (!topic) createNewTopic(req, res, next);
      else {
        let obj = req.body;
        obj.belongs_to = req.params.slug;
        Article.create(obj)
          .then(article => {
            // if (!article.belongs_to) throw {status: 404, msg: 'Topic slug does not exist!'}
            res.status(201).send({ article });
          })
          .catch(next);
      }
    })
}

module.exports = { getTopics, getArticlesByTopicSlug, addArticleByTopicSlug };
