const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user:mongoose.Types.ObjectId,
    cart:{type:[mongoose.Types.ObjectId], default:[]},
});

module.exports = mongoose.model("cartapp",schema)