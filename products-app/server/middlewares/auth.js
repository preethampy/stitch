const axios = require("axios");
const config = require("../../config");

exports.requireToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(400).json({ status: false, message: `Require JWT token!`, code: 401 })
        }
        else {
            const tokenFromRequest = req.headers.authorization;
            const jw_token = tokenFromRequest.split(" ")[1];
            const resp = await axios.get(config.userService + "users/auth", { params: { token: jw_token } });
            next();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({message:"Invalid/Expired token."})
    }

}