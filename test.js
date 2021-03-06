var request = require("supertest");
var should = require("should");
var app = require("./app");

var agent = request.agent(app);

before(function (done) {
    app.on("appStarted", function () {
        done();
    });
});

describe("API", function () {
    describe("Logins and Signups", function () {
        it("Should create a new user", function (done) {
            agent
                .post("/api/signup")
                .set("Accept", "application/json")
                .send({
                    username: "user1",
                    password: "password",
                    confirmpass: "password",
                    email: "user1@domain.com",
                    confirmemail: "user1@domain.com"
                })
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(function (err, res) {
                    if (err)
                        return done(err);
                    res.body.should.have.property("ok", true);
                    done();
                });
        });
        it("Should login successfully", function (done) {
            agent
                .post("/api/login")
                .set("Accept", "application/json")
                .send({
                    username: "user1",
                    password: "password",
                })
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(function (err, res) {
                    if (err)
                        return done(err);
                    res.body.should.have.property("ok", true);
                    done();
                });
        });
        it("Should notify that the username already exists", function (done) {
            agent
                .post("/api/signup")
                .set("Accept", "application/json")
                .send({
                    username: "user1",
                    password: "password",
                    confirmpass: "password",
                    email: "user2@domain.com",
                    confirmemail: "user2@domain.com"
                })
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(function (err, res) {
                    if (err)
                        return done(err);
                    res.body.should.have.property("ok", false);
                    done();
                });
        });
        it("Should notify that the email already exists", function (done) {
            agent
                .post("/api/signup")
                .set("Accept", "application/json")
                .send({
                    username: "user2",
                    password: "password",
                    confirmpass: "password",
                    email: "user1@domain.com",
                    confirmemail: "user1@domain.com"
                })
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(function (err, res) {
                    if (err)
                        return done(err);
                    res.body.should.have.property("ok", false);
                    done();
                });
        });
        it("Should notify that the password and password confirmation are not the same", function (done) {
            agent
                .post("/api/signup")
                .set("Accept", "application/json")
                .send({
                    username: "user3",
                    password: "passwords",
                    confirmpass: "password",
                    email: "user3@domain.com",
                    confirmemail: "user3@domain.com"
                })
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(function (err, res) {
                    if (err)
                        return done(err);
                    res.body.should.have.property("ok", false);
                    done();
                });
        });
        it("Should notify that the email and email confirmation are not the same", function (done) {
            agent
                .post("/api/signup")
                .set("Accept", "application/json")
                .send({
                    username: "user3",
                    password: "password",
                    confirmpass: "password",
                    email: "user3@domain.com",
                    confirmemail: "user@domain.com"
                })
                .expect(200)
                .expect("Content-Type", "application/json; charset=utf-8")
                .end(function (err, res) {
                    if (err)
                        return done(err);
                    res.body.should.have.property("ok", false);
                    done();
                });
        });
    });
});
