const apiRouter = require('express').Router();
const topicRouter = require('./topics');
const userRouter = require('./users');
const articleRouter = require('./articles');
const commentRouter = require('./comments');
const express = require('express');


apiRouter.route('/').get(express.static('public'));

apiRouter.use('/topics', topicRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/articles', articleRouter);

apiRouter.use('/comments', commentRouter);

module.exports = apiRouter;
