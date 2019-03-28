module.exports = {
    // https://docs.mongodb.com/manual/reference/connection-string/
    mongodbConnectionUri: process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb://localhost:27017/reactChatDB'
}