const { Router } = require("express");
const controller = require("./payments.controller");
const {requireToken} = require("../../middlewares/auth");
const router = Router();

router.post("/checkout", requireToken,controller.checkout);
router.post("/get", requireToken,controller.get);

module.exports = router;