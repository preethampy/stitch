module.exports = {
    mongo: process.env.MONGO_URL ? process.env.MONGO_URL : "mongodb://localhost:27017/cartapp",
    port: process.env.PORT ? process.env.PORT : 1515,
    userService: process.env.USER_SERVICE ? process.env.USER_SERVICE : "http://localhost:1414/",
    productsService: process.env.PRODUCTS_SERVICE ? process.env.PRODUCTS_SERVICE : "http://localhost:1212/"
}