const { Router } = require("express");
const controller = require("./cart.controller");
const {requireToken} = require("../../middlewares/auth");
const router = Router();

router.post("/get", requireToken, controller.get);
router.post("/add", requireToken, controller.add);
router.post("/remove", requireToken, controller.remove);
router.post("/clear", requireToken, controller.clear);
router.get("/", (req,res)=>{
    return res.status(200).json({message:"Inside cart index"})
});

module.exports = router;