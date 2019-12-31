const app = require("../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const User = require('../src/models/User')

const { expect } = chai;
chai.use(chaiHttp);

const data = {
  email:  "test@test.com",
  password: 'test is cool',
}

describe("Test Authentication API", () => {

  before(async () => {
    await User.remove({})
  })

  it("successful create a new user", done => {
    chai
      .request(app)
      .post("/register")
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user).exist;
        expect(res.body.user.email).to.equals(data.email)
        done();
      });
  });

  it("fail to create a user with an existend email", done => {
    chai
    .request(app)
    .post("/register")
    .send(data)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).exist;
      expect(res.body.error).to.equals("User already exists")
      done();
    });
  });

  it("successful login user", done => {
    chai
    .request(app)
    .post("/login")
    .send(data)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.user).exist;
      expect(res.body.token).exist;
      expect(res.body.user.email).to.equals(data.email)
      done();
    });
  });

  it("fail to login user", done => {
    chai
    .request(app)
    .post("/login")
    .send({...data, email: "a@a.com"})
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.error).exist;
      expect(res.body.error).to.equals("User not found")
      done();
    });
  });

});
