const { Topic, Article, Comment } = require('../models');
const { createNewTopic } = require('./utils');

const getTopics = (req, res, next) => {
  Topic.find({}, '-__v')
    .populate('')
    .then(topics => res.status(200).send({ topics }))
    .catch(next);
};

const getArticlesByTopicSlug = (req, res, next) => {
  const topicArticles = Article.find({ belongs_to: req.params.slug }, '-__v')
    .populate('created_by')
    .lean();
  const comments = Comment.find()
    .populate('created_by')
    .lean();
  if (topicArticles.length === 0)
    throw { status: 404, msg: 'Topic slug does not exist!' };
  return Promise.all([comments, topicArticles])
    .then(([comments, topicArticles]) => {
      const articles = topicArticles.map(article => {
        const artComs = comments.filter(comment => {
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
  Topic.findOne({ slug: req.params.slug })
    .then(topic => {
      if (!topic) createNewTopic(req, res, next);
      return Article.create({ ...req.body, belongs_to: req.params.slug });
    })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = { getTopics, getArticlesByTopicSlug, addArticleByTopicSlug };
