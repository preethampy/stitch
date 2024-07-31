const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cart = require("./apis/cart/index");
const config = require("../config");
const app = express();

mongoose.connect(config.mongo)
    .then(async () => {
        console.log("Connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(cors());
app.use("/cart", cart)

app.get("/", (req, res) => {
    return res.status(200).json({message:`Ok from cart-app and i am using port: ${config.port}`});
});

app.listen(config.port, () => {
    console.log("Express products-app listening on: ", config.port);
});