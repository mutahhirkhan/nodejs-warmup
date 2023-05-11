//importing all the required modules from root directory
const localDebug = require("./../export").debug("app:local");
const Joi = require("./../export").joi;
const morgan = require("./../export").morgan;
const config = require("./../export").config;
const helmet = require("./../export").helmet;
const { logger, addTimestamp, addTimestampReturnedMiddleware, loggerReturnedMiddleware } = require("./middleware");
const express = require("./../export").express;
const app = express();

//importing routes
const articles = require("./routes/articles");
const home = require("./routes/home");

//set port as `export PORT=5000` in terminal before stating sever
const port = process.env.PORT || 5000;

//pub, Mustache, EJS all are the templating engines for dynamic HTML
app.set("view engine", "pug");
app.set("views", "./views"); //default // used in default route '/'
app.use(express.json());

//custom middleware to add timestamp in req object
//order is important, first it add the timestamp then logger logs it
app.use(addTimestamp);
app.use(logger);
// app.use(addTimestampReturnedMiddleware());
// app.use(loggerReturnedMiddleware());

app.use(helmet());
app.use(express.static("public")); //static files directly served from public folder

//using api routes as a middleware
app.use("/", home);
app.use("/api/articles", articles);

console.log(app.get("env")); //development. by default it is development, can be set to production by `export NODE_ENV=production` in terminal
if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	localDebug("morgan enabled..."); //console.log('Morgan enabled...');
}

//	Configuration
//custom-envirnoment-variables.json file is used to set the values of the variables in config/default.json file
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
