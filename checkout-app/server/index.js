const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const payments = require("./apis/payments/index");
const paymentsModels = require("./apis/payments/payments.model");
const config = require("../config");
const app = express();
const stripe = require('stripe')(process.env.STRIPE_KEY);

mongoose.connect(config.mongo)
    .then(async () => {
        console.log("Connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });
app.post("/pay/webhook", express.raw({ type: 'application/json' }),async(req, res) => {
    /**
     * event.type should be payment_intent.succeeded for a successful payments
     * charge.updated
     * checkout.session.completed
     * payment_intent.created
     * charge.succeeded
     * payment_intent.succeeded
     */
    try {
        const payload = req.body;
        const sig = req.headers['stripe-signature'];
        const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_SECRET);
        if(event.type == "payment_intent.succeeded"){
            const paymentDocId = event.data.object.metadata.paymentDocId;
            const paymentId = event.data.object.id;
            const paymentAmount = event.data.object.amount;
            console.log(event);
            await paymentsModels.findOneAndUpdate({_id:paymentDocId},{
                paymentStatus:true,
                paymentId:paymentId,
                amount:paymentAmount,
                failed:false
            });
        }
        else if(event.type == "payment_intent.payment_failed"){
            const paymentDocId = event.data.object.metadata.paymentDocId;
            const paymentId = event.data.object.id;
            const paymentAmount = event.data.object.amount;
            // console.log(event);
            await paymentsModels.findOneAndUpdate({_id:paymentDocId},{
                paymentStatus:false,
                paymentId:paymentId,
                amount:paymentAmount,
                failed:true
            });
        }
        else{
            console.log(event);
            console.log("++++++++++++++++++++++++++++++++++++++++++++++")
        }
        return res.status(200).json({ event: event });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "check logs" });

    }
});
app.use(express.json());
app.use(cors());
app.use("/pay", payments)

app.get("/", (req, res) => {
    return res.status(200).json({ message: `Ok from payments-app and i am using port: ${config.port}` });
});

app.listen(config.port, () => {
    console.log("Express payments-app listening on: ", config.port);
});