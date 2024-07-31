module.exports = {
    mongo: process.env.MONGO_URL ? process.env.MONGO_URL : "mongodb://localhost:27017/paymentsapp",
    port: process.env.PORT ? process.env.PORT : 1616,
    userService: process.env.USER_SERVICE ? process.env.USER_SERVICE : "http://localhost:1414/",
    productsService: process.env.PRODUCTS_SERVICE ? process.env.PRODUCTS_SERVICE : "http://localhost:1212/",
    cartServices: process.env.CART_SERVICE ? process.env.CART_SERVICE : "http://localhost:1515/",
    cancel:process.env.CANCEL ? process.env.CANCEL : "http://localhost:3003/cart",
    success:process.env.SUCCESS ? process.env.SUCCESS : "http://localhost:3003/cart/success",
}