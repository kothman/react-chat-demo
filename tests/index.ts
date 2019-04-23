import { conn, app } from '../src/server/server';
import User from '../src/server/models/User';

const dropAllCollections = () => {
    let p = new Promise((resolve, reject) => {
        User.deleteMany({}, (err: any) => {
            if (err) return reject(err);
            return resolve();
        })
    })
    return p.then().catch((err: any) => {
        console.error(err);
    });
}

const NotImplementedError = new Error('Test not implemented');

before('all tests', function(done) {
    // wait for connection to begin tests
    console.log(process.version);
    conn.on('connected', () => {
        console.log('server started');
        done();
    });
});
beforeEach('reset DB', function(done) {
    // start with a fresh database
    dropAllCollections().then(() => done());
});
after('all tests', function(done) {
    // teardown DB
    dropAllCollections().then(() => {
        console.log('Closing connections');
        conn.close();
        done()
    });
})



/* Web */
require('./web/testStore');
require('./web/testAsyncActions');

/* Server */
require('./server/testAuthController');
require('./server/testUserController');
require('./server/testMessageController');
require('./server/testChannelController');

export { app, dropAllCollections, NotImplementedError };
