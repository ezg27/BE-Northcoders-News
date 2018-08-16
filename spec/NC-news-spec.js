process.env.NODE_ENV = 'test';
const app = require('../app.js');
const request = require('supertest')(app);
const { expect } = require('chai');
const mongoose = require('mongoose');
const testData = require('../seed/testData/index');
const seedDB = require('../seed/seed.js');

describe('NC NEWS API /api', () => {
  // let topicDocs, userDocs, articleDocs, commentDocs, wrongId = mongoose.Types.ObjectId();
  let wrongId = mongoose.Types.ObjectId();
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [topicDocs, userDocs, articleDocs, commentDocs] = docs;
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
    })
  })
});