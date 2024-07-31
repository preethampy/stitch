const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title:String,
    price:String,
    description:String,
    category:String,
    image:String,
    images:[],
    catImg:String,
    tag:{
        type:String,
        default:null
    }
});

module.exports = mongoose.model("products",schema)