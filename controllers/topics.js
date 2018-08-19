const { Topic, Article, Comment } = require('../models');
const { createNewTopic } = require('./utils');

const getTopics = (req, res, next) => {
  Topic.find({}, '-__v').populate('')
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getArticlesByTopicSlug = (req, res, next) => {
  Article.find({belongs_to: req.params.slug}, '-__v').populate('created_by').lean()
  .then(topicArticles => {
    if (topicArticles.length === 0) throw { status: 404, msg: 'Topic slug does not exist!' };
    return Promise.all([
      Comment.find().populate('created_by').lean(),
      topicArticles
    ]);
  })
  .then(([comments, topicArticles]) => {
    let articles = topicArticles.map(article => {
      let artComs = comments.filter(comment => {
        return comment.belongs_to.toString() === article._id.toString();
      }).length;
      article.comments = artComs;
      return article;
    });
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
            res.status(201).send({ article });
          })
          .catch(next);
      }
    })
}

module.exports = { getTopics, getArticlesByTopicSlug, addArticleByTopicSlug };
