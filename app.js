/*
 * load express module - thrid party module
 * A minimal and extensible framework that provides a set of common utilities
 * for building servers and web applications
 */
const express = require("express");

/*
 * Load Express-session module - thrid party module thta used by an HTTP server-side framework
 * to create and manage a session middleware
 */
const session = require("express-session");

/* Load path module - nodejs core module
 * path module is used for handling and transforming file paths
 */
const path = require("path");
var flash = require("connect-flash");

/* Initializations of the express module */
const app = express();

/*Setup the veiw directory and veiw engine
 * Veiw engine - define the template engine to use.
 * View default - the directory where the template files are located
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* Express.static function
 * A built-in middleware function used to serve static files
 * such as images, CSS files, and JavaScript files
 */
app.use(express.static(path.join(__dirname, "public")));

/* setup port: load default from env variable or set custom */
app.set("port", process.env.PORT || 5000);

app.use(express.urlencoded({ extended: false }));

/* Creating a session and save it in cookies */
app.use(
  session({
    name: "session",
    secret: "my_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 * 1000 }, // 1hr
  })
);

app.use(flash());

app.use(require("./routes/authenticate"));
app.use(require("./routes/courses"));

app.use((err, req, res, next) => {
  //console.log(err);
  return res.send("Internal Server Error<br>" + err);
});

/* Starting the server */
app.listen(app.get("port"), () => {
  console.log("Server is running on port: " + app.get("port"));
});
