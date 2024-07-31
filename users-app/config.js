module.exports = {
    mongo: process.env.MONGO_URL ? process.env.MONGO_URL : "mongodb://localhost:27017/usersapp",
    port: process.env.PORT ? process.env.PORT : 1414
}