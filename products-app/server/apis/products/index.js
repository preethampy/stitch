const { Router } = require("express");
const controller = require("./products.controller");
const {requireToken} = require("../../middlewares/auth");
const router = Router();

router.post("/get",requireToken, controller.get);
router.post("/get/specific",requireToken, controller.getSpecific);

module.exports = router;