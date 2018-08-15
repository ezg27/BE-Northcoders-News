const { Comment } = require('../models');

const getComments = (req, res, next) => {
  Comment.find()
    // .populate('ownerId', 'name -_id')
    // .populate('ownerId')
    .then(comments => {
      res.status(200).send({ comments });
    });
};

module.exports = getComments;
