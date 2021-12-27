const request = require('supertest');
const app = require('../../../src/index.js');

// TODO: use testing DB then compare that proper id corresponds to what is in DB
// FIX: doesn't work without wifi
// describe('/api/v1', () => {
//     describe('GET /organisation/:id', () => {
//         it('respond with json of appropriate org', function (done) {
//             request(app)
//                 .get('/api/v1/organisation/18')
//                 .set('Accept', 'application/json')
//                 .expect('Content-Type', /json/)
//                 .expect(200, done);
//         });
//     });
// });
