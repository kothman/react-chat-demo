import * as request from 'supertest';
import { hashSync } from 'bcryptjs';
import { assert } from 'chai';

import { app, dropAllCollections } from '../';
import User, { IUser } from '../../src/server/models/User';

describe('User Controller', function() {
    let token: string;
    let userInfo = {
        name: 'Adrian',
        email: 'test@test.com',
        password: 'test',
        role: 'admin'
    };

    beforeEach(function(done) {
        dropAllCollections().then(() => {
            let user: IUser = new User({
                name: userInfo.name,
                email: userInfo.email,
                password: hashSync(userInfo.password),
                role: userInfo.role,
            });
            user.save().then((user: IUser) => {
                // once user is created, login and store jwt
                request(app)
                    .post('/api/v1/login')
                    .send({email: userInfo.email, password: userInfo.password})
                    .expect(200)
                    .end((err: any, res: request.Response) => {
                        token = res.get('x-access-token');
                        assert.isNotNull(token);
                        assert.isString(token);
                        assert.isNotEmpty(token);
                        done();
                    });
            }).catch((err: any) => {
                throw err;
            });
        });
    });

    describe('GET /api/v1/user', function() {
        it('should fetch the logged in user', function (done) {
            request(app)
                .get('/api/v1/user')
                .set('x-access-token', token)
                .expect(200, (err: any, res: request.Response) => {
                    if (err) return done(err);
                    assert.strictEqual(res.body.name, userInfo.name);
                    assert.strictEqual(res.body.email, userInfo.email);
                    assert.strictEqual(res.body.role, userInfo.role);
                    assert.notProperty(res.body, 'password');
                    done();
                });
        });
        it('should fail if not logged in', function (done) {
            request(app)
                .get('/api/v1/user')
                .expect(401, done);
        });
    });
    describe('GET /api/v1/users', function() {
        it('should receive a list of users', function (done) {
            request(app)
                .get('/api/v1/users')
                .set('x-access-token', token)
                .expect(200, (err: any, res: request.Response) => {
                    assert.strictEqual(res.body.users.length, 1);
                    assert.include(res.body.users[0], {
                        name: userInfo.name,
                        role: userInfo.role,
                        email: userInfo.email
                    })
                    assert.notProperty(res.body.users[0], 'password');
                    done();
                });
        });
        it('should fail if not logged in', function (done) {
            request(app)
                .get('/api/v1/users')
                .expect(401, done);
        });
    });
    describe('GET /api/v1/user/:email', function() {
        it('should retrieve a user by email', function (done) {
            request(app)
                .get('/api/v1/user/' + userInfo.email)
                .set('x-access-token', token)
                .expect(200, (err: any, res: request.Response) => {
                    assert.hasAllKeys(res.body.user, ['email', 'name', 'role', '_id', 'created']);
                    assert.include(res.body.user, {
                        email: userInfo.email,
                        name: userInfo.name,
                        role: userInfo.role,
                    });
                    done();
                });
        });
        it('should fail if email does not exist', function (done) {
            request(app)
                .get('/api/v1/user/not.in.use@test.com')
                .set('x-access-token', token)
                .expect(400, (err: any, res: request.Response) => {
                    assert.isString(res.body.error);
                    assert.strictEqual(res.body.error, 'No user found with that email');
                    done(err);
                });
        });
        it('should fail if not a valid email', function (done) {
            request(app)
                .get('/api/v1/user/not-an-email')
                .set('x-access-token', token)
                .expect(400, (err: any, res: request.Response) => {
                    assert.isString(res.body.error);
                    assert.strictEqual(res.body.error, 'Please supply a valid email');
                    done(err);
                });
        });
    });
    describe('POST /api/v1/user/update/email', function() {
        it("should update the logged in user's email", function (done) {
            let newEmail = 'new.email@test.com';
            request(app)
                .post('/api/v1/user/update/email')
                .set('x-access-token', token)
                .send({ email: newEmail })
                .expect(200, (err: any, res: request.Response) => {
                    if (err) return done(err);
                    request(app)
                        .get('/api/v1/user')
                        // need to use new access token
                        .set('x-access-token', res.get('x-access-token'))
                        .expect(200, (err: any, res: request.Response) => {
                            assert.strictEqual(res.body.name, userInfo.name);
                            assert.strictEqual(res.body.email, newEmail);
                            assert.strictEqual(res.body.role, userInfo.role);
                            done(err);
                        });
                });
        });
        it('should fail if new email is not valid', function (done) {
            request(app)
                .post('/api/v1/user/update/email')
                .set('x-access-token', token)
                .send({ email: 'not an email' })
                .expect(400, done);
        })
        it('should fail if email already in use', function (done) {
            request(app)
                .post('/api/v1/user/update/email')
                .set('x-access-token', token)
                .send({ email: 'test@test.com' })
                .expect(400, done);
        });
        it('should fail if not authorized', function (done) {
            request(app)
                .post('/api/v1/user/update/email')
                .send({ email: 'test@test.com' })
                .expect(401, done);
        });
    });
    describe('POST /api/v1/user/update/name', function() {
        it('should update name', function (done) {
            let newName = 'new name';
            request(app)
                .post('/api/v1/user/update/name')
                .set('x-access-token', token)
                .send({ name: newName })
                .expect(200, (err: any, res: request.Response) => {
                    request(app)
                        .get('/api/v1/user')
                        .set('x-access-token', res.get('x-access-token'))
                        .expect(200, (err: any, res: request.Response) => {
                            assert.strictEqual(res.body.name, newName);
                            assert.strictEqual(res.body.email, userInfo.email);
                            assert.strictEqual(res.body.role, userInfo.role);
                            done(err);
                        });
                });
        });
        it('should fail if not authorized', function (done) {
            let newName = 'new name';
            request(app)
                .post('/api/v1/user/update/name')
                .send({ name: newName })
                .expect(401, done);
        });
    });
    describe('POST /api/v1/user/update/password', function() {
        it('should update password', function (done) {
            let newPass = 'newpass';
            request(app)
                .post('/api/v1/user/update/password')
                .set('x-access-token', token)
                .send({ oldPass: userInfo.password, newPass: newPass })
                .expect(200, (err: any, res: request.Response) => {
                    if (err) return done(err);
                    request(app)
                        .post('/api/v1/login')
                        .send({ email: userInfo.email, password: newPass })
                        .expect(200, done);
                });
        });
        it('should fail updating password if current password invalid', function (done) {
                request(app)
                    .post('/api/v1/user/update/password')
                    .set('x-access-token', token)
                    .send({ oldPass: 'wrong password', newPass: '12341234' })
                    .expect(400, done);
            });
        it('should fail updating password if not authorized', function (done) {
            request(app)
                .post('/api/v1/user/update/password')
                .expect(401, done);
        });
    });
    describe('POST /api/v1/user/create', function() {
        let newUser = {
            email: 'test123@test.com',
            name: 'New User',
            role: 'user',
        }
        it('should create a new user', function(done) {
            // assert that user doesn't already exist, for sanity
            User.findByEmail(newUser.email).countDocuments((err, count: number) => {
                if (err) return done(err);
                assert.strictEqual(count, 0, 'User should not exist with email test123Wtest.com');
                request(app)
                    .post('/api/v1/user/create')
                    .set('x-access-token', token)
                    .send(newUser)
                    .expect(200, (err: any, res: request.Response) => {
                        if (err) return done(err);
                        User.findByEmail(newUser.email).exec((err, user: IUser) => {
                            if (err) return done(err);
                            assert.deepInclude(user, newUser);
                            done();
                        });
                    });
            });
        });
        it('should fail if user making request is not an admin', function(done) {
            let user: IUser = new User({
                name: newUser.name,
                email: newUser.email,
                password: hashSync('password'),
                role: newUser.role,
            });
            user.save().then((user: IUser) => {
                // once user is created, login and store jwt
                request(app)
                    .post('/api/v1/login')
                    .send({ email: newUser.email, password: 'password' })
                    .expect(200)
                    .end((err: any, res: request.Response) => {
                        token = res.get('x-access-token');
                        request(app)
                            .post('/api/v1/user/create')
                            .set('x-access-token', token)
                            .expect(401, done);
                    });
            }).catch((err: any) => {
                throw err;
            });
        });
        it('should fail if user is not logged in', function(done) {
            request(app)
                .post('/api/v1/user/create')
                .expect(401, done);
        })
        it('should fail if email is not valid', function(done) {
            request(app)
                .post('/api/v1/user/create')
                .set('x-access-token', token)
                .send({
                    email: 'not valid',
                    name: newUser.name,
                    role: newUser.role
                })
                .expect(400, done);
        });
        it('should fail if role not valid', function(done) {
            request(app)
                .post('/api/v1/user/create')
                .set('x-access-token', token)
                .send({
                    email: newUser.email,
                    name: newUser.name,
                    role: 'not valid'
                })
                .expect(400, done);
        });
        it('should fail if email address already in use', function(done) {
            request(app)
                .post('/api/v1/user/create')
                .set('x-access-token', token)
                .send({
                    email: userInfo.email, //already in use
                    name: newUser.name,
                    role: newUser.role
                })
                .expect(400, done);
        });
    });
    describe('PUT /api/v1/user/update', function() {
        let newUserInfo = {
            name: 'New Name',
            email: 'newemail@test.com',
            role: 'user'
        };

        it('should update the user', function(done) {
            request(app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({email: userInfo.email, user: newUserInfo})
                .expect(200, (err: any, res: request.Response) => {
                    if (err) return done(err);
                    User.findByEmail(newUserInfo.email).exec((err: any, user: IUser) => {
                        if (err) return done(err);
                        assert.isNotNull(user);
                        assert.deepInclude(user, newUserInfo);
                        done();
                    });
                });
        });
        it('should fail if user with email does not exist', function(done) {
            request(app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({email: 'doesnotexist@test.com', user: newUserInfo})
                .expect(404, done);
        });
        it('should fail if new email not valid', function(done) {
            request(app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({
                    email: userInfo.email,
                    user: Object.assign({}, newUserInfo, {email: 'not valid'})
                }).expect(400, done);
        });
        it('should fail if role not valid', function(done) {
            request(app)
                .put('/api/v1/user/update')
                .set('x-access-token', token)
                .send({
                    email: userInfo.email,
                    user: Object.assign({}, newUserInfo, { role: 'not valid' })
                }).expect(400, done);
        })
    });
});