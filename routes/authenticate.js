const router = require("express").Router();
const { body } = require("express-validator");

/* pages route */
const {
		homePage,
		register,
		registerPage,
		login,
		loginPage,
		forgotPassword,
		sendResetPassLink,
		resetPasswordPage
		} = require("../controllers/authController");


const {isLoggedin, isNotLoggedin} = require('../lib/check_authentication');
const validator = require('../lib/validation_rules');

router.get('/', isLoggedin, homePage);

router.get("/auth/login", isNotLoggedin, loginPage);
router.post("/auth/login", isNotLoggedin, validator.validationRules[0], login);

router.get("/auth/signup", isNotLoggedin, registerPage);
router.post("/auth/signup", isNotLoggedin, validator.validationRules[1], register);

router.get('/logout', 
		(req, res, next) => {
				req.session.destroy(
						(err) => {
							next(err);
							}
					);
		res.redirect('/auth/login');
	}
);

router.get("/pages/passReset_Request", isNotLoggedin, forgotPassword);
router.post("/pages/passReset_Request", isNotLoggedin, sendResetPassLink);

router.get("/pages/reset_password", isNotLoggedin, resetPasswordPage);

module.exports = router;