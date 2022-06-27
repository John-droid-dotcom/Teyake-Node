
const router = require("express").Router();
const express = require("express");
const { dashboard, loginPage } = require("../controllers/authController");
const app = express();

const {
    myProfilePage
} = require("../controllers/teacherController")

const {isLoggedin, isNotLoggedin} = require('../lib/check_authentication');
const validator = require('../lib/validation_rules');

router.get('/pages/myProfile', isLoggedin, myProfilePage);
router.post('/pages/myProfile', isLoggedin, myProfilePage);

router.get('/dashboard', isLoggedin, dashboard)
router.get('/dashboard', isNotLoggedin, loginPage)

module.exports = router