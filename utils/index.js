
const formatArticleData = (articleData, userDocs, commentData) => {
  return articleData.map(article => {
    let belongs_to = article.topic;
    let user = userDocs.find(elem => {
      return elem.username === article.created_by;
    })
    let votes = commentData.reduce((acc, val) => {
      if (val.belongs_to === article.title) return acc + val.votes;
      else return acc;
    }, 0);
    const created_by = user._id
    return {
      ...article,
      belongs_to,
      created_by,
      votes
    }
  })
}

const formatCommentData = (commentData, userDocs, articleDocs) => {
  return commentData.map(comment => {
    let user = userDocs.find(elem => {
      return elem.username === comment.created_by;
    })
    let article = articleDocs.find(elem => {
      return elem.title === comment.belongs_to;
    })
    let created_by = user._id;
    let belongs_to = article._id;
    return {
      ...comment,
      belongs_to,
      created_by
    }
  })
}

module.exports = {formatArticleData, formatCommentData}