const jwt = require("jsonwebtoken");
const userModel = require("../apis/users/users.model");

exports.sign = async (data,name) => {
    const jw_token = await jwt.sign({ _id: data,name:name }, "preetham", { expiresIn: '100h', algorithm: 'HS256' });
    return jw_token;
}

exports.loginCheck = async (req, res, next) => {
    try {
        if (!req.body.password || req.body.password == "" || req.body.password == undefined || req.body.password == null || !req.body.username || req.body.username == "" || req.body.username == undefined || req.body.username == null) {
            res.status(400).json({ status: false, message: `Username or Password is missing!` })
        }
        else {
            const username = String(req.body.username);
            const userDetailsInDb = await userModel.findOne({ username: username });
            if (userDetailsInDb == null) {
                res.status(400).json({ status: false, message: `Username or Password is wrong!` });
            }
            else {
                userDetailsInDb.comparePassword(req.body.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        req.passed = true;
                        req.userId = userDetailsInDb._id.toString();
                        req.username = userDetailsInDb.username;
                        next();
                    }
                    else {
                        req.passed = false;
                        next();
                    }
                });
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.loginAuth = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(400).json({ status: false, message: `Require JWT token!`, code: 401 })
    }
    else {
        const tokenFromRequest = req.headers.authorization;
        const jw_token = tokenFromRequest.split(" ")[1];
        try {
            const verifyJWT = await jwt.verify(jw_token, "preetham", { algorithms: ["HS256"] });
            if (verifyJWT) {
                req.userId = verifyJWT._id;
                next();
            }
        }
        catch (err) {
            console.log(err)
            if (err.name == "JsonWebTokenError") {
                res.status(400).json({ status: false, code: "JsonWebTokenError", message: `JWT not valid!` });
            }
            else if (err.name == "TokenExpiredError") {
                res.status(400).json({ status: false, code: "TokenExpiredError", message: `JWT expired!` });
            }
            else {
                res.status(400).json({ status: false, message: `JWT expired or not valid!` });
            }
        }
    }
}