const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./apis/users/index");
const config = require("../config");
const app = express();

mongoose.connect(config.mongo)
.then(()=>{
    console.log("Connected to mongodb")
})
.catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use(cors());
app.use("/users",users);

app.get("/",(req,res)=>{
    return res.status(200).json({message:`Ok from users-app and i am using port: ${config.port}`});
});
app.listen(config.port,(err)=>{
    if(err) console.log(err);
    console.log("Express users-app listening on: ",config.port);
});