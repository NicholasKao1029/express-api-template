const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');
// Configure chai
chai.use(chaiHttp);

// (2) create the server and pass that to chai.request
// const server = http.createServer(app);
// const request = chai.request(server);

// (3) add an after that closes the server
// after(done => server.close(done));

describe('Internal API root index testing suite', () => {
    describe('api router', () => {
        describe('test router', () => {
            describe("/sanity-check'", () => {
                it("check if GET'/sanity-check' returns 'sanity checked'", (done) => {
                    chai.request(app)
                        .get('/sanity-check')
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.statusCode).to.equal(200);
                            expect(res.text).to.equal('sanity checked');
                        });
                    done();
                }).timeout(10000);
            });
        });
    });
});
