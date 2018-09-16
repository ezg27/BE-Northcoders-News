const { Topic } = require('../../models');

const createNewTopic = (req, res, next) => {
  const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);
  let title = capitalizeFirstLetter(req.params.slug);
  let topicObj = {
    title: title,
    slug: req.params.slug
  }
  Topic.create(topicObj)
}


const getVoteCount = (comments) => comments.reduce((acc, val) => acc + val.votes, 0);

module.exports = {createNewTopic, getVoteCount};