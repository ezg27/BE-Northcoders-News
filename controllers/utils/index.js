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
    .then(() => {
      let articleObj = req.body;
      articleObj.belongs_to = req.params.slug;
      Article.create(articleObj)
        .then(article => {
          // if (!article.belongs_to) throw {status: 404, msg: 'Topic slug does not exist!'}
          res.status(201).send({ article });
        })
        .catch(next);
    })
    .catch(next);
}

module.exports = createNewTopic;