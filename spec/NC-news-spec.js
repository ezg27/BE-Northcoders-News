process.env.NODE_ENV = 'test';
const app = require('../app.js');
const request = require('supertest')(app);
const { expect } = require('chai');
const mongoose = require('mongoose');
const testData = require('../seed/testData/index');
const seedDB = require('../seed/seed.js');

describe('NC NEWS API /api', () => {
  // let topicDocs, userDocs, articleDocs, commentDocs, wrongId = mongoose.Types.ObjectId();
  // let wrongId = mongoose.Types.ObjectId();
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
              '__v'
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
    });
  });

  describe('/articles', () => {
    it('GET returns the appropriate articles object', () => {
      return request
        .get('/api/articles/')
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(4);
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
              'belongs_to',
              '__v'
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
      });
    });
  });

  describe('/comments', () => {});

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
