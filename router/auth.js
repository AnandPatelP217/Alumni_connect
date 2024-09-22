const express = require("express")
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const signupSchema = require("../validator/auth-validator");
const validate = require("../middlewares/validate-middlewares");
const authMiddleware = require('../middlewares/auth-middleware');
const Roles = require("../enums/roles");

router.route("/").get(authcontroller.home);
router 
    .route("/register")
    .post(validate(signupSchema),authMiddleware([Roles.ADMIN]),authcontroller.register);
router.route("/login").post(authcontroller.login); 

router.route('/user').get(authMiddleware,authcontroller.user);

module.exports = router;