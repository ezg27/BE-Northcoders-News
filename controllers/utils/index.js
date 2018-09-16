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

module.exports = createNewTopic;