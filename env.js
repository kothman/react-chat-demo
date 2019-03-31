module.exports = {
    // https://docs.mongodb.com/manual/reference/connection-string/
    mongodbConnectionUri: process.env.MONGODB_URI,
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN
}
