const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./apis/products/index");
const productsModel = require("./apis/products/products.model");
const app = express();
const axios = require("axios");
const { faker } = require("@faker-js/faker");
const config = require("../config");
const dump = require("./utils.js/dump.json");

mongoose.connect(config.mongo)
    .then(async () => {
        console.log("Connected to mongodb");
        const existingData = await productsModel.find({});
        if (existingData.length == 0) {
            // const products =  await axios.get("https://fakestoreapi.com/products");
            // console.log("Products inserted: ",products)
            // await productsModel.create(products.data);
            await productsModel.create(dump);
        }
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(cors());
app.use("/products", products)

app.get("/", (req, res) => {
    return res.status(200).json({message:`Ok from products-app and i am using port: ${config.port}`});
});

app.listen(config.port, () => {
    console.log("Express products-app listening on: ", config.port);
});