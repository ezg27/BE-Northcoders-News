process.env.NODE_ENV = 'test';
const app = require('../app.js');
const request = require('supertest')(app);
const { expect } = require('chai');
const mongoose = require('mongoose');
const testData = require('../seed/testData/index');
const seedDB = require('../seed/seed.js');
const { Comment } = require('../models');

describe('NC NEWS API /api', () => {
  let topicDocs, userDocs, articleDocs, commentDocs;
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [commentDocs, topicDocs, userDocs, articleDocs] = docs;
    });
  });

  after(() => mongoose.disconnect());

  describe('/topics', () => {
    it('GET returns the appropriate topics object', () => {
      return request
        .get('/api/topics/')
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.equal(2);
        });
    });
    describe('/:topic_slug/articles', () => {
      it('GET returns appropriate articles object for passed topic', () => {
        return request
          .get(`/api/topics/${topicDocs[0].slug}/articles`)
          .expect(200)
          .then(res => {
            expect(res.body.articles.length).to.equal(2);
            expect(res.body.articles[0].title).to.equal(
              'Living in the shadow of a great man'
            );
            expect(res.body.articles[0]).to.have.all.keys(
              '_id',
              'votes',
              'title',
              'created_by',
              'body',
              'created_at',
              'belongs_to',
              'comments'
            );
          });
      });
      it('GET slug that does not exist in the collection returns status 404 and error message', () => {
        return request
          .get('/api/topics/cheesecake/articles')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Topic slug does not exist!');
          });
      });
      it('POST adds a new article to the database and returns posted article', () => {
        const newArticle = {
          title: 'The world is a strange place',
          topic: 'cats',
          created_by: userDocs[0]._id,
          body: 'I like turtles',
          created_at: 1471522072389
        };
        return request
          .post(`/api/topics/${topicDocs[0].slug}/articles`)
          .send(newArticle)
          .expect(201)
          .then(res => {
            expect(res.body.article).to.have.all.keys(
              '_id',
              'votes',
              'title',
              'created_by',
              'body',
              'created_at',
              'belongs_to',
              '__v'
            );
            expect(res.body.article.title).to.equal(
              'The world is a strange place'
            );
          });
      });
      it('POST returns status 400 and error message when a required field is missing', () => {
        const newArticle = {
          topic: 'cats',
          created_by: userDocs[0]._id,
          body: 'I like turtles',
          created_at: 1471522072389
        };
        return request
          .post(`/api/topics/${topicDocs[0].slug}/articles`)
          .send(newArticle)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal(
              'articles validation failed: title: Path `title` is required.'
            );
          });
      });
      xit('POST returns status 404 and error message when posted to slug that does not exist', () => {
        const newArticle = {
          title: 'The world is a strange place',
          topic: 'cats',
          created_by: userDocs[0]._id,
          body: 'I like turtles',
          created_at: 1471522072389
        };
        return request
          .post(`/api/topics/aslgjla/articles`)
          .send(newArticle)
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal(
              'articles validation failed: title: Path `title` is required.'
            );
          });
      });
    });
  });

  describe('/articles', () => {
    it('GET returns the appropriate articles object', () => {
      return request
        .get('/api/articles/')
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(4);
          expect(res.body.articles[0]).to.have.all.keys(
            '_id',
            'votes',
            'title',
            'created_by',
            'body',
            'created_at',
            'belongs_to',
            'comments'
          );
        });
    });
    describe('/:article_id', () => {
      it('GET returns the appropriate article for passed Mongo Id', () => {
        return request
          .get(`/api/articles/${articleDocs[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys(
              '_id',
              'votes',
              'title',
              'created_by',
              'body',
              'created_at',
              'belongs_to'
            );
            expect(res.body.article.title).to.equal(
              'Living in the shadow of a great man'
            );
          });
      });
      it('GET invalid ID returns status 400 and error message', () => {
        return request
          .get(`/api/articles/lasjgia`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal(
              'Cast to ObjectId failed for value "lasjgia" at path "_id" for model "articles"'
            );
          });
      });
      it('GET ID that does not exist in collection returns status 404 and error message', () => {
        return request
          .get(`/api/articles/${topicDocs[0]._id}`)
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Article ID does not exist!');
          });
      });
      it('PUT returns the appropriate article for passed Mongo Id with vote count incremented according to passed query', () => {
        return request
          .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body.article.votes).to.equal(articleDocs[0].votes + 1);
          });
      });
      it('PUT returns the appropriate article for passed Mongo Id with vote count decremented according to passed query', () => {
        return request
          .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body.article.votes).to.equal(articleDocs[0].votes - 1);
          });
      });
      it('PUT invalid ID returns status 400 and error message', () => {
        return request
          .put(`/api/articles/jashdkj?vote=up`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal(
              'Cast to ObjectId failed for value "jashdkj" at path "_id" for model "articles"'
            );
          });
      });
      it('PUT ID that does not exist in collection returns status 404 and error message', () => {
        return request
          .put(`/api/articles/${topicDocs[0]._id}?vote=up`)
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Article ID does not exist!');
          });
      });
      describe('/comments', () => {
        it('GET returns appropriate comment object for passed article Mongo Id', () => {
          return request
            .get(`/api/articles/${articleDocs[0]._id}/comments`)
            .expect(200)
            .then(res => {
              expect(res.body.comments.length).to.equal(2);
              expect(res.body.comments[0]).to.have.all.keys(
                '_id',
                'votes',
                'body',
                'belongs_to',
                'created_by',
                'created_at',
                '__v'
              );
              expect(res.body.comments[0].body).to.equal(
                'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.'
              );
            });
        });
        it('GET invalid ID returns status 400 and error message', () => {
          return request
            .get(`/api/articles/whatever/comments`)
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal(
                'Cast to ObjectId failed for value "whatever" at path "belongs_to" for model "comments"'
              );
            });
        });
        it('GET ID that does not exist in collection returns status 404 and error message', () => {
          return request
            .get(`/api/articles/${topicDocs[0]._id}/comments`)
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal('Article ID does not exist!');
            });
        });
        it('POST adds a new comment to the database and returns posted comment', () => {
          const newComment = {
            body:
              'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.',
            belongs_to: 'Living in the shadow of a great man',
            created_by: userDocs[0]._id,
            votes: 4,
            created_at: 1501051330835
          };
          return request
            .post(`/api/articles/${articleDocs[0]._id}/comments`)
            .send(newComment)
            .expect(201)
            .then(res => {
              expect(res.body.comment).to.have.all.keys(
                '_id',
                'votes',
                'body',
                'belongs_to',
                'created_by',
                'created_at',
                '__v'
              );
              expect(res.body.comment.body).to.equal(
                'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.'
              );
            });
        });
      });
    });
  });

  describe('/comments', () => {
    describe('/:comments_id', () => {
      it('PUT returns the appropriate comment for passed Mongo Id with vote count incremented according to passed query', () => {
        return request
          .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body.comment.votes).to.equal(commentDocs[0].votes + 1);
          });
      });
      it('PUT returns the appropriate comment for passed Mongo Id with vote count decremented according to passed query', () => {
        return request
          .put(`/api/comments/${commentDocs[0]._id}?vote=down`)
          .expect(200)
          .then(res => {
            expect(res.body.comment.votes).to.equal(commentDocs[0].votes - 1);
          });
      });
      it('PUT invalid ID returns status 400 and error message', () => {
        return request
          .put(`/api/comments/jashdkj?vote=down`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal('Cast to ObjectId failed for value "jashdkj" at path "_id" for model "comments"');
          });
      });
      it('PUT ID that does not exist in collection returns status 404 and error message', () => {
        return request
          .put(`/api/comments/${topicDocs[0]._id}?vote=down`)
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Comment ID does not exist!');
          });
      });
      it('DELETE returns the appropriate comment for passed Mongo Id and removes this comment from the collection', () => {
        return request
          .delete(`/api/comments/${commentDocs[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.comment.body).to.equal(
              'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — on you it works.'
            );
            Comment.findOne(commentDocs[0]._id).then(comment => {
              expect(comment).to.equal(null);
            });
          });
      });
      it('DELETE invalid ID returns status 400 and error message', () => {
        return request
          .delete(`/api/comments/jashdkj`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal(
              'Cast to ObjectId failed for value "jashdkj" at path "_id" for model "comments"'
            );
          });
      });
      it('DELETE ID that does not exist in collection returns status 404 and error message', () => {
        return request
          .delete(`/api/comments/${topicDocs[0]._id}`)
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal('Comment ID does not exist!');
          });
      });
    });
  });

  describe('/users', () => {
    it('GET returns the appropriate user object for the passed username', () => {
      return request
        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user.name).to.equal('jonny');
        });
    });
    it('GET username that does not exist in the collection returns status 404 and error message', () => {
      return request
        .get(`/api/users/whatup`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Username does not exist!');
        });
    });
  });
});
