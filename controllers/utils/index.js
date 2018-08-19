const { Topic, Article } = require('../../models');

const createNewTopic = (req, res, next) => {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  let title = capitalizeFirstLetter(req.params.slug);
  let topicObj = {
    title: title,
    slug: req.params.slug
  }
  Topic.create(topicObj)
}


const getVoteCount = (comments) => {
  return comments.reduce((acc, val) => {
    return acc + val.votes;
  }, 0)
}

module.exports = {createNewTopic, getVoteCount};