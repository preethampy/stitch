module.exports = {
    mongo: process.env.MONGO_URL ? process.env.MONGO_URL : "mongodb://localhost:27017/productsapp",
    port: process.env.PORT ? process.env.PORT : 1212,
    userService: process.env.USER_SERVICE ? process.env.USER_SERVICE : "http://localhost:1414/",
    cancel:process.env.CANCEL ? process.env.CANCEL : "http://localhost:3003/cart",
    success:process.env.SUCCESS ? process.env.SUCCESS : "http://localhost:3003/cart/success",
}