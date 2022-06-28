const fs = require("fs");
const path = require("path");
const csvtojson = require("csvtojson");
var Json2csvParser = require("json2csv").Parser;

const dbConn = require("../config/db_Connection");
const { uploadImage, uploadCSVFile } = require("../lib/fileUpload");

// Record import Page
exports.importRecordPage = (req, res, next) => {
  error = req.flash("error");
  message = req.flash("msg");
  res.render("pages/importCSV", {
    error: error,
    msg: message,
    title: "Import Records",
  });
};

// download CSV template
exports.downloadFile = (req, res, next) => {
  // here the res.download() Method is used to download CSV File
  //Alternative Methods: https://www.webmound.com/download-file-using-express-nodejs-server/
  const filePath = "public/csvFiles/csvSampleFormat.csv";
  res.download(filePath, function (err) {
    if (err) {
      console.log(err);
      req.flash("error", "File doesn't found");
      return err;
    }
    req.flash(
      "msg",
      "You download the template. Prepare as per the template and uplaod it here"
    );
  });
};

// Importing new Records from CSV file
exports.importRecord = async (req, res, next) => {
  /* Checking if the CSV file upload or not */
  const CSVFile = uploadCSVFile.single("csvFile");
  CSVFile(req, res, function (err) {
    if (req.file == undefined || err) {
      req.flash(
        "error",
        "Error: No file/wrong file selected! Please select CSV file!"
      );
      req.flash("title", "Import Records");
      return res.redirect("/admin/admin-page");
    }

    //The file is uploaded and Now read the records.
    filePath = "public/csvFiles/" + req.file.filename;
    console.log(filePath);
    csvtojson()
      .fromFile(filePath)
      .then((source) => {
        let userId;
        if (req.session.level == 1) userId = 0;
        else userId = req.session.userID;

        // Fetching the data from each row and inserting to the table "courses"
        for (var i = 0; i < source.length; i++) {
          var ID = source[i]["ID"],
            FullName = source[i]["FullName"],
            Email = source[i]["Email"],
            Password = source[i]["Password"],
            Sex = source[i]["Sex"],
            DeptID = source[i]["DeptID"],
            InstID = source[i]["InstID"],
            CourseID = source[i]["CourseID"],
            PhoneNo = source[i]["PhoneNo"],
            ImageURL = source[i]["ImageURL"];

          var records = [
            FullName,
            Email,
            Password,
            Sex,
            DeptID,
            InstID,
            CourseID,
            PhoneNo,
            ImageURL,
          ];
          //Import the record to Mysql database, courses table
          let query3 =
            `INSERT INTO examiner (FullName, Email, Password,` +
            `Sex, DeptID, InstID, CourseID, PhoneNo, ImageURL) ` +
            `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          dbConn.query(query3, records, (error, results, fields) => {
            if (error) {
              console.log(error);
              fs.unlinkSync(filePath);
              error = req.flash(
                "error",
                "Something wrong! Records are not imported"
              );
              return res.redirect("/admin/admin-page");
            }
          });
        }
        fs.unlinkSync(filePath);
        req.flash(
          "msg",
          "Records are imported successfully! \r\n Go back to Home page & check it."
        );
        return res.redirect("/admin/admin-page");
      });
  });
};

exports.importRecordExaminee = async (req, res, next) => {
  /* Checking if the CSV file upload or not */
  const CSVFile = uploadCSVFile.single("csvFileExaminee");
  CSVFile(req, res, function (err) {
    if (req.file == undefined || err) {
      req.flash(
        "error",
        "Error: No file/wrong file selected! Please select CSV file!"
      );
      req.flash("title", "Import Records");
      return res.redirect("/admin/admin-page");
    }

    //The file is uploaded and Now read the records.
    filePath = "public/csvFiles/" + req.file.filename;
    console.log(filePath);
    csvtojson()
      .fromFile(filePath)
      .then((source) => {
        let userId;
        if (req.session.level == 1) userId = 0;
        else userId = req.session.userID;

        // Fetching the data from each row and inserting to the table "courses"
        for (var i = 0; i < source.length; i++) {
          var ID = source[i]["ID"],
            FullName = source[i]["FullName"],
            Email = source[i]["Email"],
            Password = source[i]["Password"],
            Sex = source[i]["Sex"],
            DeptID = source[i]["DeptID"],
            InstID = source[i]["InstID"],
            CourseID = source[i]["CourseID"],
            PhoneNo = source[i]["PhoneNo"],
            ImageURL = source[i]["ImageURL"];

          var records = [
            FullName,
            Email,
            Password,
            Sex,
            DeptID,
            InstID,
            CourseID,
            PhoneNo,
            ImageURL,
          ];
          //Import the record to Mysql database, courses table
          let query3 =
            `INSERT INTO examiner (FullName, Email, Password,` +
            `Sex, DeptID, InstID, CourseID, PhoneNo, ImageURL) ` +
            `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          dbConn.query(query3, records, (error, results, fields) => {
            if (error) {
              console.log(error);
              fs.unlinkSync(filePath);
              error = req.flash(
                "error",
                "Something wrong! Records are not imported"
              );
              return res.redirect("/admin/admin-page");
            }
          });
        }
        fs.unlinkSync(filePath);
        req.flash(
          "msg",
          "Records are imported successfully! \r\n Go back to Home page & check it."
        );
        return res.redirect("/admin/admin-page");
      });
  });
};

exports.importRecordExam = async (req, res, next) => {
  /* Checking if the CSV file upload or not */
  const CSVFile = uploadCSVFile.single("csvFileExam");
  CSVFile(req, res, function (err) {
    if (req.file == undefined || err) {
      req.flash(
        "error",
        "Error: No file/wrong file selected! Please select CSV file!"
      );
      req.flash("title", "Import Records");
      return res.redirect("/admin/admin-page");
    }

    //The file is uploaded and Now read the records.
    filePath = "public/csvFiles/" + req.file.filename;
    console.log(filePath);
    csvtojson()
      .fromFile(filePath)
      .then((source) => {
        let userId;
        if (req.session.level == 1) userId = 0;
        else userId = req.session.userID;

        // Fetching the data from each row and inserting to the table "courses"
        for (var i = 0; i < source.length; i++) {
          var ID = source[i]["ID"],
            FullName = source[i]["FullName"],
            Email = source[i]["Email"],
            Password = source[i]["Password"],
            Sex = source[i]["Sex"],
            DeptID = source[i]["DeptID"],
            InstID = source[i]["InstID"],
            CourseID = source[i]["CourseID"],
            PhoneNo = source[i]["PhoneNo"],
            ImageURL = source[i]["ImageURL"];

          var records = [
            FullName,
            Email,
            Password,
            Sex,
            DeptID,
            InstID,
            CourseID,
            PhoneNo,
            ImageURL,
          ];
          //Import the record to Mysql database, courses table
          let query3 =
            `INSERT INTO examiner (FullName, Email, Password,` +
            `Sex, DeptID, InstID, CourseID, PhoneNo, ImageURL) ` +
            `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          dbConn.query(query3, records, (error, results, fields) => {
            if (error) {
              console.log(error);
              fs.unlinkSync(filePath);
              error = req.flash(
                "error",
                "Something wrong! Records are not imported"
              );
              return res.redirect("/admin/admin-page");
            }
          });
        }
        fs.unlinkSync(filePath);
        req.flash(
          "msg",
          "Records are imported successfully! \r\n Go back to Home page & check it."
        );
        return res.redirect("/admin/admin-page");
      });
  });
};

// Export Mysql table "courses" into CSV & download it.
exports.exportMysql2CSV = (req, res, next) => {
  let query = "SELECT * FROM examiner";
  dbConn.query(query, function (err, results, fields) {
    if (err) throw err;

    const jsonCoursesRecord = JSON.parse(JSON.stringify(results));

    // -> Convert JSON to CSV data
    const csvFields = [
      "ID",
      "FullName",
      "Email",
      "Password",
      "Sex",
      "DeptID",
      "InstID",
      "CourseID",
      "PhoneNo",
      "ImageURL",
    ];

    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonCoursesRecord);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Examiner_Record.csv"
    );
    res.status(200).end(csv);
  });
};

exports.exportMysql2CSVExaminee = (req, res, next) => {
  let query = "SELECT * FROM examinee";
  dbConn.query(query, function (err, results, fields) {
    if (err) throw err;

    const jsonCoursesRecord = JSON.parse(JSON.stringify(results));

    // -> Convert JSON to CSV data
    const csvFields = [
      "ID",
      "FullName",
      "Email",
      "Section",
      "InstID",
      "ExamKey",
      "Sex",
      "Score",
      "AnswerList",
      "SchoolID",
    ];

    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonCoursesRecord);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Examinee_Record.csv"
    );
    res.status(200).end(csv);
  });
};

exports.exportMysql2CSVExam = (req, res, next) => {
  let query = "SELECT * FROM exam";
  dbConn.query(query, function (err, results, fields) {
    if (err) throw err;

    const jsonCoursesRecord = JSON.parse(JSON.stringify(results));

    // -> Convert JSON to CSV data
    const csvFields = [
      "Name",
      "CourseID",
      "ExamKey",
      "QuestionID",
      "AnswerID",
      "ExaminerID",
      "Status",
      "Duration",
      "Date",
    ];

    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonCoursesRecord);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Exam_Record.csv"
    );
    res.status(200).end(csv);
  });
};
