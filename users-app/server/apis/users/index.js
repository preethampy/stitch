const {Router} = require("express");
const controller = require("./users.controller");
const auth = require("../../middlewares/auth");
const router = Router();

router.post("/login",auth.loginCheck,controller.login);
router.post("/register",controller.register);
router.post("/get",auth.loginAuth,controller.get);
router.post("/add/favorite",auth.loginAuth,controller.addFav);
router.post("/remove/favorite",auth.loginAuth,controller.rmFav);
router.post("/get/favorites",auth.loginAuth,controller.getFavs);

router.get("/auth",controller.isAuthenticated);

module.exports = router;