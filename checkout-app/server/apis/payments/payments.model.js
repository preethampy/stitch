const mongoose = require("mongoose");

const schema = mongoose.Schema({
    paymentId:{
        type:String,
        default:null
    },
    user:mongoose.Types.ObjectId,
    sessionId:String,
    amount:String,
    items:[],
    paymentStatus:{
        type:Boolean,
        default:false},
    cancelled:{
        type:Boolean,
        default:false},
    failed:{
        type:Boolean,
        default:false},
    createAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("payments",schema)