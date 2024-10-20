import app from "../app";
import { expect as _expect, use, request } from "chai";
import { sign } from "jsonwebtoken";
import { createTestUser, deleteTestUser } from "./testUtilities";
import chaiHttp from "chai-http";
require('dotenv').config({ path: '../.env' });

const expect = _expect;

use(chaiHttp);

describe('Testing /login endpoint', function () {
    before(async function () {
        await createTestUser();
    });

    after(async function () {
        await deleteTestUser();
    });

    it('Login with valid credentials', function (done) {
        const user = {
            username: "backendUnitTest",
            password: "unitTest#0001"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Login with whitespace character exist in username', function (done) {
        const user = {
            username: "random User",
            password: "unitTest#0001"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with number starts first in username', function (done) {
        const user = {
            username: "3randomUser",
            password: "unitTest#0001"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with username too short', function (done) {
        const user = {
            username: "ran",
            password: "unitTest#0001"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with username too long', function (done) {
        const user = {
            username: "randomUsernameabc123def456",
            password: "unitTest#0001"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with password too short', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "Abc123#"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with password too long', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "randomUsernameabc#123def456"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with number in password missing', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "Abc###abc"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with special character in password missing', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "Abcabc123"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with capital letter in password missing', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "abcabc123##"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Login with incorrect username', function (done) {
        const user = {
            username: "testuser9000",
            password: "27190670Kendrick#"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "User Not Found!" });
                done();
            });
    });

    it('Login with incorrect password', function (done) {
        const user = {
            username: "testuser8000",
            password: "fsfasasdF#4"
        };

        request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.deep.equal({ error: "Incorrect Password!" });
                done();
            });
    });
});

describe('Testing /register endpoint', function () {
    after(async function () {
        await deleteTestUser();
    });

    it('Register with valid credentials', function (done) {
        const user = {
            username: "backendUnitTest",
            password: "unitTest#0001"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Register with whitespace character exist in username', function (done) {
        const user = {
            username: "random User",
            password: "unitTest#0001"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with number starts first in username', function (done) {
        const user = {
            username: "3randomUser",
            password: "unitTest#0001"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with username too short', function (done) {
        const user = {
            username: "ran",
            password: "unitTest#0001"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with username too long', function (done) {
        const user = {
            username: "randomUsernameabc123def456",
            password: "unitTest#0001"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with password length too short', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "Abc123#"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with password length too long', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "randomUsernameabc#123def456"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with number in password missing', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "Abc###abc"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with special character in password missing', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "Abcabc123"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with capital letter in password missing', function (done) {
        const randomUsername = "a" + Math.random().toString(36).slice(2, 10);
        const user = {
            username: randomUsername,
            password: "abcabc123##"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "Username or password entered does not match pattern required!" });
                done();
            });
    });

    it('Register with duplicate username', function (done) {
        const user = {
            username: "backendUnitTest",
            password: "unitTest#0001"
        };

        request(app)
            .post('/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "User already exists!" });
                done();
            });
    });
});

describe('Testing /id=:id endpoint', function () {
    before(async function () {
        await createTestUser();
    });

    after(async function () {
        await deleteTestUser();
    });

    const token = sign({ user: "backendUnitTest" }, process.env.JWT_SECRET, { expiresIn: '5s' });
    const invalidToken = sign({ user: "backendUnitTest" }, process.env.JWT_SECRET, { expiresIn: '0s' });

    it('Get user details with valid credentials', function (done) {
        request(app)
            .get('/user/id=1')
            .set("Authorization", `Bearer ${token}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Get user details with JWT missing', function (done) {
        request(app)
            .get('/user/id=1')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.deep.equal({ error: "You are not logged in." });
                done();
            });
    });

    it('Get user details with invalid JWT', function (done) {
        request(app)
            .get('/user/id=1')
            .set("Authorization", `Bearer ${invalidToken}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.deep.equal({ error: "JWT malformed" });
                done();
            });
    });

    it('Get user details with negative userID', function (done) {
        request(app)
            .get('/user/id=-1')
            .set("Authorization", `Bearer ${token}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "User id is invalid!" });
                done();
            });
    });

    it('Get user details with userID missing from the db', function (done) {
        request(app)
            .get('/user/id=1000')
            .set("Authorization", `Bearer ${token}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: "User Not Found!" });
                done();
            });
    });
});
