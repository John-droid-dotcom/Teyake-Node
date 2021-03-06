const router = require("express").Router();
const { body } = require("express-validator");

/* pages route */
const {
  dashboard,
  homePage,
  register,
  registerPage,
  adminLog,
  adminLogin,
  adminPage,
  login,
  loginPage,
  forgotPassword,
  sendResetPassLink,
  resetPasswordPage,
  resetPassword,
} = require("../controllers/authController");

const { isLoggedin, isNotLoggedin } = require("../lib/check_authentication");
const validator = require("../lib/validation_rules");

router.get("/", homePage);
router.post("/", homePage);

router.get("/dashboard", isLoggedin, dashboard);
router.post("/dashboard", isLoggedin, dashboard);

router.get("/admin/admin-login", isNotLoggedin, adminLog);
router.post(
  "/admin/admin-login",
  isNotLoggedin,
  validator.validationRules[0],
  adminLogin
);

router.get("/admin/admin-page", isLoggedin, adminPage);

router.get("/auth/login", isNotLoggedin, loginPage);
router.post("/auth/login", isNotLoggedin, validator.validationRules[0], login);

router.get("/auth/signup", isNotLoggedin, registerPage);
router.post(
  "/auth/signup",
  isNotLoggedin,
  validator.validationRules[1],
  register
);

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    next(err);
  });
  res.redirect("/");
});

router.get("/auth/passReset_Request", isNotLoggedin, forgotPassword);
router.post("/auth/passReset_Request", isNotLoggedin, sendResetPassLink);

router.get("/reset-password", isNotLoggedin, resetPasswordPage);
router.post(
  "/reset-password",
  isNotLoggedin,
  validator.validationRules[3],
  resetPassword
);

module.exports = router;
