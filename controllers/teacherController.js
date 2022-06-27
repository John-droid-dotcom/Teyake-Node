const fs = require('fs')
const path = require('path');
const { validationResult } = require("express-validator");

const dbConn = require("../config/db_Connection")
const validator = require('../lib/validation_rules');
const { uploadImage, uploadCSVFile } = require('../lib/fileUpload');

exports.myProfilePage = (req,res,next)=>{
    res.render("pages/myProfile");
}