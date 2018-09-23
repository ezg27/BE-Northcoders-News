const { Topic } = require('../../models');

const createNewTopic = (req, res, next) => {
  const capitalizeFirstLetter = str => str[0].toUpperCase() + str.slice(1);
  const title = capitalizeFirstLetter(req.params.slug);
  const topicObj = {
    title: title,
    slug: req.params.slug
  }
  Topic.create(topicObj)

}

module.exports = createNewTopic; 