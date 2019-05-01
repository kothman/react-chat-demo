import * as request from 'supertest';
import { hashSync } from 'bcryptjs';
import { app, dropAllCollections } from '../';
import User, { IUser } from '../../src/server/models/User';
import { assert } from 'chai';

const session = require('supertest-session');

describe('Auth Controller', function() {
    describe('POST /api/v1/login', function() {
        beforeEach(function (done) {
            dropAllCollections().then(() => {
                let user: IUser = new User({
                    name: 'Adrian',
                    email: 'test@test.com',
                    password: hashSync('test'),
                    role: 'user',
                });
                user.save().then((user: IUser) => done()).catch((err: any) => {
                    throw err;
                });
            });
        });
        it('should login the user', function(done) {
            request(app)
                .post('/api/v1/login')
                .send({
                    email: 'test@test.com',
                    password: 'test'
                })
                .expect(200)
                .end((err: any) => {
                    if (err)
                        return done(err);
                    done();
                });
        });
        it('should return the logged-in user details', function(done) {
            request(app)
                .post('/api/v1/login')
                .send({
                    email: 'test@test.com',
                    password: 'test'
                })
                .expect(200)
                .end((err: any, res: request.Response) => {
                    if (err)
                        return done(err);
                    let json: any = JSON.parse(res.text);
                    assert.strictEqual(json.email, 'test@test.com');
                    assert.strictEqual(json.role, 'user');
                    assert.strictEqual(json.name, 'Adrian');
                    done();
                });
        });
        it('should return an error if the email does not exist', function(done) {
            request(app)
                .post('/api/v1/login')
                .send({
                    email: 'test.does.not.exit@test.com',
                    password: 'test'
                })
                .expect(401)
                .end((err: any, res: request.Response) => {
                    if (err)
                        return done(err);
                    let json: any = JSON.parse(res.text);
                    assert.strictEqual(json.error, 'Invalid email or password');
                    done();
                });
        });
        it('should return an error if the password does not match the hash', function(done) {
            request(app)
                .post('/api/v1/login')
                .send({
                    email: 'test@test.com',
                    password: 'test-invalid-password'
                })
                .expect(401)
                .end((err: any, res: request.Response) => {
                    if (err)
                        return done(err);
                    let json: any = JSON.parse(res.text);
                    assert.strictEqual(json.error, 'Invalid email or password');
                    done();
                });
        });
        it('should return an error if the email or password is missing', function(done) {
            request(app)
                .post('/api/v1/login')
                .send({
                    password: 'test'
                })
                .expect(400)
                .end((err: any, res: request.Response) => {
                    if (err)
                        return done(err);
                    let json: any = JSON.parse(res.text);
                    assert.strictEqual(json.error, 'Please supply an email and password');
                    request(app)
                        .post('/api/v1/login')
                        .send({email: 'test@test.com'})
                        .expect(400)
                        .end((err: any, res: request.Response) => {
                            if (err)
                                return done(err);
                            let json: any = JSON.parse(res.text);
                            assert.strictEqual(json.error, 'Please supply an email and password');
                            done();
                        })
                });
        });
        it('should return an error if the email is not valid', function(done) {
            request(app).post('/api/v1/login')
                .send({email: 'not an email@asdf', password: '1234'})
                .expect(400)
                .end((err: any, res: request.Response) => {
                    if (err)
                        return done(err);
                    let json: any = JSON.parse(res.text);
                    assert.strictEqual(json.error, 'Not a valid email address');
                    done();
                })
        });
    });
    describe('POST /api/v1/register', function() {
        beforeEach(function (done) {
            dropAllCollections().then(() => done());
        });
        it('should register a user', function(done) {
            request(app).post('/api/v1/register')
                .send({email: 'test@test.com', password: 'test'})
                .expect(200)
                .end((err: any, res: request.Response) => {
                    if(err) return done(err);
                    User.findByEmail('test@test.com').exec().then((user: IUser) => {
                        if (!user) {
                            assert.fail();
                            return done();
                        }
                        done();
                    }).catch((err: any) => {
                        return done(err);
                    })
                });
        });
        it('should create an admin user if no users exist', function (done) {
            request(app).post('/api/v1/register')
                .send({ email: 'test@test.com', password: 'test' })
                .expect(200)
                .end((err: any, res: request.Response) => {
                    if (err) return done(err);
                    User.findByEmail('test@test.com').exec().then((user: IUser) => {
                        if (!user) {
                            assert.fail();
                        }
                        assert.strictEqual(user.role, 'admin');
                        done();
                    }).catch((err: any) => {
                        return done(err);
                    })
                });
        });
        it('should create a regular user if users exist', function(done) {
            let u = new User({
                name: 'test',
                email: 'admin@test.com',
                password: 'password',
                role: 'admin'
            })
            u.save().then(() => {
                request(app).post('/api/v1/register')
                    .send({ email: 'test@test.com', password: 'test' })
                    .expect(200)
                    .end((err: any, res: request.Response) => {
                        if (err) return done(err);
                        User.findByEmail('test@test.com').exec().then((user: IUser) => {
                            if (!user) {
                                assert.fail();
                            }
                            assert.strictEqual(user.role, 'user');
                            done();
                        }).catch((err: any) => {
                            return done(err);
                        })
                    });
            })
        });
        it('should return an error if email or password not provided', function(done) {
            request(app).post('/api/v1/register')
                .send({ email: 'test@test.com' })
                .expect(400)
                .end((err: any, res: request.Response) => {
                    if (err) return done(err);
                    let json: any = JSON.parse(res.text);
                    assert.strictEqual(json.error, 'Please supply an email and password');
                    request(app).post('/api/v1/register')
                        .send({password: '123'})
                        .expect(400)
                        .end((err: any, res: request.Response) => {
                            if(err) return done(err);
                            let json: any = JSON.parse(res.text);
                            assert.strictEqual(json.error, 'Please supply an email and password');
                            done();
                        });
                });
        });
        it('should return an error if not a valid email', function(done) {
            request(app).post('/api/v1/register')
                .send({email: 'not an email @ asdlfkj;l', password: '1234'})
                .expect(400)
                .end((err: any, res: request.Response) => {
                    if (err) return done(err);
                    let json: any = JSON.parse(res.text);
                    assert.strictEqual(json.error, 'Not a valid email address');
                    done();
                });
        });
    });
    describe('POST /api/v1/logout', function() {
        let testSession: any;
        beforeEach(function (done) {
            testSession = session(app);
            dropAllCollections().then(() => {
                let user: IUser = new User({
                    name: 'Adrian',
                    email: 'test@test.com',
                    password: hashSync('test'),
                    role: 'user',
                });
                user.save().then((user: IUser) => done()).catch((err: any) => {
                    throw err;
                });
            });
        });
        it('should log out the user', function(done) {
            testSession.post('/api/v1/login')
                .send({email: 'test@test.com', password: 'test'}).end((err: any) => {
                    if (err) return done(err);
                    testSession.get('/api/v1/user').send().expect(200).end((err: any) => {
                        if (err) return done(err);
                        testSession.get('/api/v1/logout').send().expect(200).end((err: any) => {
                            if (err) return done(err);
                            testSession.get('/api/v1/user').send().expect(401).end(done);
                        })
                    })
                });
        });
    });
    /* describe('POST /api/v1/verifyEmail', function() {
        beforeEach(function (done) {
            dropAllCollections().then(() => done());
        });
        it('should verify an email given the correct verification link');
        it('should not verify an email with an incorrect verification link');
    }); */
});