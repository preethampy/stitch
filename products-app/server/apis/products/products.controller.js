const products = require("./products.model");
const redis = require("../../clients/redisclient");
const axios = require("axios");
const config = require("../../../config");

exports.get = async (req, res) => {
    try {
        const productsCache = await redis.get("products");
        if (productsCache) {
            return res.status(200).json({ message: "success", data: JSON.parse(productsCache) });
        }
        else {
            const foundProducts = await products.find({});
            await redis.set("products", JSON.stringify(foundProducts));
            return res.status(200).json({ message: "success", data: foundProducts });
        }
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong!" });
    }
}

exports.getSpecific = async (req, res) => {
    if (!req.body.ids || req.body.ids.length == 0 || req.body.ids == null || req.body.ids == undefined) {
        return res.status(400).json({ message: "Require ID's!" });
    }
    else {
        try {
            const foundProducts = await products.find({ _id: { $in: req.body.ids } });
            return res.status(200).json({ message: "success", data: foundProducts });
        }
        catch (err) {
            return res.status(400).json({ message: "Something went wrong!" });
        }
    }
}