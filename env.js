module.exports = {
    // https://docs.mongodb.com/manual/reference/connection-string/
    mongodbConnectionUri: process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/reactChatDB'
}