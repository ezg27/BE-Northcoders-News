
const formatArticleData = (articleData, userDocs) => {
  return articleData.map(article => {
    let belongs_to = article.topic;
    let user = userDocs.find(elem => {
      return elem.username === article.created_by;
    })
    const created_by = user._id
    return {
      ...article,
      belongs_to,
      created_by
    }
  })
}

module.exports = {formatArticleData}