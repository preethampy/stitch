const paymentsModel = require("./payments.model");
const axios = require("axios");
const config = require("../../../config");
const stripe = require('stripe')(process.env.STRIPE_KEY);

function gen(dt) {
    return {
        price_data: {
            currency: 'usd',
            product_data: {
                name: dt.title,
            },
            unit_amount: Number(dt.price) * 100,
        },
        quantity: 1,
    }
}

exports.checkout = async (req, res) => {
    try {
        let configg = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: config.cartServices + "cart/get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.token}`
            },
            data: {}
        };

        const cart = await axios.request(configg);

        if (cart.data.data.length == 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        else {
            const newData = cart.data.data.map((item, index) => gen(item, req.userId));
            const preSave = new paymentsModel({
                paymentId: null,
                sessionId: null,
                items: cart.data.data,
                user:req.userId
            });

            const session = await stripe.checkout.sessions.create({
                line_items: newData,
                client_reference_id: String(preSave._id),
                mode: "payment",
                success_url: config.success,
                cancel_url: config.cancel,
                payment_intent_data: {
                    "metadata": {
                        "paymentDocId": String(preSave._id),
                    }
                }
            });

            preSave.sessionId = session.id;
            await preSave.save();
            return res.status(200).json({ link: session.url });
        }
    }
    catch (err) {
        console.log(err);
        if (err && err.raw) return res.status(400).json({ message: "check logs", error: err.raw.message });
        else return res.status(400).json({ message: "check logs" });
    }
}

exports.get = async (req, res) => {
    try{
        const foundPayments = await paymentsModel.find({user:req.userId});
        return res.status(200).json({data:foundPayments});
    }
    catch(err){
        console.group(err);
        return res.status(400).json({message:"Something went wrong"});

    }
}