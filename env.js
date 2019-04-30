module.exports = {
    // https://docs.mongodb.com/manual/reference/connection-string/
    mongodbConnectionUri: process.env.MONGODB_URI,
    mongodbTestConnectionUri: process.env.MONGODB_TEST_URI ||
			      'mongodb://localhost:27017/openChatTest',
    port: process.env.PORT || 5000,
    production: process.env.NODE_ENV === 'production' || false,
    useTestDb: process.env.USE_TEST_DB || false,
    secret: process.env.SECRET || 'secret',
    disableCsrf: process.env.DISABLE_CSRF || false,
    disableReduxLogging: process.env.DISABLE_REDUX_LOGGING || false,
    disableAutoStart: process.env.DISABLE_AUTO_START || false,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    baseUrl: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:5000'
}
