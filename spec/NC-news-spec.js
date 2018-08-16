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
    })
  })
  
  after(() => mongoose.disconnect());

  describe('/topics', () => {
    it('GET returns the appropriate topics object', () => {
      return request.get('/api/topics/')
      .expect(200)
      .then(res => {
        expect(res.body.topics.length).to.equal(2);
      })
    });
    describe('/:topic_slug/articles', () => {
      it('GET returns appropriate articles object for passed topic', () => {
        return request.get(`/api/topics/${topicDocs[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(2);
        })
      })
      it('GET slug that does not exist in the collection returns status 404 and error message', () => {
        return request.get('/api/topics/cheesecake/articles')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Topic slug does not exist!')
        })
      })
    })
  })
  describe('/articles', () => {
    it('GET returns the appropriate articles object', () => {
      return request.get('/api/articles/')
      .expect(200)
      .then(res => {
        expect(res.body.articles.length).to.equal(4);
      })
    })
  })
  describe('/comments', () => {
    
  })
  describe('/users', () => {
    it('GET returns the appropriate user object for the passed username', () => {
      return request.get(`/api/users/${userDocs[0].username}`)
      .expect(200)
      .then(res => {
        expect(res.body.user.name).to.equal('jonny');
      })
    })
    it('GET username that does not exist in the collection returns status 404 and error message', () => {
      return request.get(`/api/users/whatup`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Username does not exist!');
        })
    })
  })
});