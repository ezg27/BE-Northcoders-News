const topicRouter = require('express').Router();
const {getTopics, getArticlesByTopicSlug, addArticleByTopicSlug} = require('../controllers/topics');

topicRouter.route('/')
  .get(getTopics)

topicRouter.route('/:slug/articles')
  .get(getArticlesByTopicSlug)
  .post(addArticleByTopicSlug)

module.exports = topicRouter;
