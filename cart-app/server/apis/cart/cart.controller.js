const cartModel = require("./cart.model");
const axios = require("axios");
const config = require("../../../config");

exports.get = async (req, res) => {
    try{
        const cart = await cartModel.findOne({ user: req.userId });
        if(cart && cart.cart.length !== 0){
            // const resp = await axios.post(config.productsService + "products/get/specific", { ids: cart.cart });
            let reqConfig = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: config.productsService + "products/get/specific",
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization':`Bearer ${req.token}`
                },
                data : {ids: cart.cart}
              };
              
            const resp = await axios.request(reqConfig);
            return res.status(200).json({ message: "success", data: resp.data.data });
        }
        else{
            const cart = await cartModel.create({ user: req.userId });
            return res.status(200).json({ message: "success", data: [] });
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ messgae: "Something went wrong" });
    }
}

exports.add = async (req, res) => {
    if (!req.body.item || req.body.item == "" || req.body.item == null || req.body.item == undefined) {
        return res.status(400).json({ messgae: "Need item id" })
    }
    else {
        const foundCart = await cartModel.findOneAndUpdate({ user: req.userId }, { $addToSet: { cart: req.body.item } },{new:true});
        if (foundCart) {
            return res.status(200).json({ message: "success", data: foundCart });
        }
        else {
            const createDoc = await cartModel.create({ user: req.userId, cart: [req.body.item] });
            return res.status(200).json({ message: "success", data: createDoc });

        }
    }
}

exports.remove = async (req, res) => {
    if (!req.body.id || req.body.id == "" || req.body.id == null || req.body.id == undefined) {
        return res.status(400).json({ messgae: "Need item id" })
    }
    else {
        const foundCart = await cartModel.findOneAndUpdate({ user: req.userId }, { $pull: { cart: req.body.id } });
        return res.status(200).json({ message: "success" });
    }
}

exports.clear = async (req, res) => {
    try {
        const foundCart = await cartModel.findOneAndUpdate({ user: req.userId }, { cart: [] });
        return res.status(200).json({ message: "success" });
    } 
    catch(err){
        console.log(err);
        return res.status(400).json({ messgae: "Something went wrong" });
    }
}