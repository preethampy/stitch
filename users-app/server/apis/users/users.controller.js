const auth = require("../../middlewares/auth");
const userModel = require("./users.model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const createdUser = await userModel.create(req.body);
        return res.status(201).json({ status: 200, data: createdUser })
    }
    catch (err) {
        if (err && err.name) {
            if (err.name == "ValidationError") {
                let errors = {};

                Object.keys(err.errors).forEach((key) => {
                    errors[key] = err.errors[key].message;
                });

                return res.status(400).json({ status: false, error: errors })
            }
            else if (err.code && err.code == 11000) {
                return res.status(400).json({ status: false, error: "Username already exist!" })
            }
        }
        else {
            return res.status(400).json({ status: false, error: err })
        }
    }
}

exports.login = async (req, res) => {
    if (!req.passed) {
        return res
            .status(400)
            .json({ status: false, message: `Username or password is wrong!` });
    } else {
        try {
            const jwt = await auth.sign(req.userId, req.username);
            const updateJwt = await userModel.updateOne({ _id: req.userId }, { $set: { jwt: jwt } });

            if (updateJwt.modifiedCount !== 0) {
                return res.status(200).json({
                    status: true,
                    message: `Logged in!`,
                    data: { jwt: jwt, uid: req.userId, username: req.username },
                });
            }
            else {
                return res.status(404).json({ status: false, message: "User not found!" })
            }
        } catch (err) {
            console.error(err);
            return res.status(400).json({ status: false, message: `Something went wrong!` });
        }
    }
};

exports.get = async (req, res) => {
        try {
            const foundUser = await userModel.findOne({_id:req.userId},{_id:0, jwt:0, __v:0, password:0});
            return res.status(200).json({data:foundUser});
        } catch (err) {
            console.error(err);
            return res.status(400).json({ status: false, message: `Something went wrong!` });
        }
};

exports.isAuthenticated = async(req,res) =>{
    try{
        const verifyJWT = await jwt.verify(req.query.token, "preetham", { algorithms: ["HS256"] });
        if(verifyJWT) return res.status(200).json({message:"success",userId:verifyJWT._id});
        else return res.status(400).json({message:"fail"});
    }
    catch(err){
        return res.status(400).json({message:"fail"});
    }
}

exports.addFav = async (req,res) =>{
    if(req.body.id == null || req.body.id == undefined || req.body.id == "" || !req.body.id){
        return res.status(400).json({message:"Require product ID"});
    }
    else{
        try {
            await userModel.findOneAndUpdate({_id:req.userId},{$addToSet:{favorites:req.body.id}});
            return res.status(200).json({message:"Success", data:req.body.id});

        } catch (error) {
            console.log(err);
        return res.status(400).json({message:"Something went wrong"});
        }
    }
}

exports.rmFav = async (req,res) =>{
    if(req.body.id == null || req.body.id == undefined || req.body.id == "" || !req.body.id){
        return res.status(400).json({message:"Require product ID"});
    }
    else{
        try {
            await userModel.findOneAndUpdate({_id:req.userId},{$pull:{favorites:req.body.id}});
            return res.status(200).json({message:"Success", data:req.body.id});

        } catch (error) {
            console.log(err);
        return res.status(400).json({message:"Something went wrong"});
        }
    }
}

exports.getFavs = async(req,res) =>{
    try {
        const foundFavs = await userModel.findOne({_id:req.userId},{favorites:1});
        return res.status(200).json({message:"Success", data:foundFavs});

    } catch (error  ) {
        console.log(err);
        return res.status(400).json({message:"Something went wrong"});
    }
}