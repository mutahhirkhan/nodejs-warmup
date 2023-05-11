const express = require('./../../export').express
const route = express.Router()

const HTTP_STATUS_CODE = {
	"Continue": 100,
	"Switching Protocols": 101,
	"Processing": 102,
	"Early Hints": 103,
	"OK": 200,
	"Created": 201,
	"Accepted": 202,
	"Non-Authoritative Information": 203,
	"No Content": 204,
	"Reset Content": 205,
	"Partial Content": 206,
	"Multi-Status": 207,
	"Already Reported": 208,
	"IM Used": 226,
	"Multiple Choices": 300,
	"Moved Permanently": 301,
	"Found": 302,
	"See Other": 303,
	"Not Modified": 304,
	"Temporary Redirect": 307,
	"Permanent Redirect": 308,
	"Bad Request": 400,
	"Unauthorized": 401,
	"Payment Required": 402,
	"Forbidden": 403,
	"Not Found": 404,
	"Method Not Allowed": 405,
	"Not Acceptable": 406,
	"Proxy Authentication Required": 407,
	"Request Timeout": 408,
	"Conflict": 409,
	"Gone": 410,
	"Length Required": 411,
	"Precondition Failed": 412,
	"Payload Too Large": 413,
	"URI Too Long": 414,
	"Unsupported Media Type": 415,
	"Range Not Satisfiable": 416,
	"Expectation Failed": 417,
	"I'm a teapot": 418,
	"Misdirected Request": 421,
	"Unprocessable Entity": 422,
	"Locked": 423,
	"Failed Dependency": 424,
	"Too Early": 425,
	"Upgrade Required": 426,
	"Precondition Required": 428,
	"Too Many Requests": 429,
	"Request Header Fields Too Large": 431,
	"Unavailable For Legal Reasons": 451,
	"Internal Server Error": 500,
	"Not Implemented": 501,
	"Bad Gateway": 502,
	"Service Unavailable": 503,
	"Gateway Timeout": 504,
	"HTTP Version Not Supported": 505,
	"Variant Also Negotiates": 506,
	"Insufficient Storage": 507,
	"Loop Detected": 508,
	"Not Extended": 510,
};

const articles = [
	{
		id: 1,
		author: "Scott",
		body: "A post",
	},
	{
		id: 2,
		author: "Max",
		body: "A post",
	},
	{
		id: 3,
		author: "Allan",
		body: "A post",
	},
];


route.get("/", (req, res) => {
	res.status(HTTP_STATUS_CODE["OK"]).send(articles);
});

// Define a route for GET requests to "/api/articles/:id"
route.get("/:id", (req, res) => {
	// Define a validation schema for the "id" parameter using Joi
	const schema = Joi.object({
		id: Joi.number().required(),
	});

	// Validate the "id" parameter against the schema
	const { error } = schema.validate(req.params);

	// If validation fails, send a 400 Bad Request response with the error message
	if (error) {
		res.status(HTTP_STATUS_CODE["Bad Request"]).send(error.details[0].message);
		return;
	}

	// Extract the "id" parameter from the request object
	const id = req.params.id;

	// Find the article with the matching ID in the "articles" array
	const article = articles.find((article) => article.id == id);

	// If no article was found, send a 404 Not Found response
	if (!article) {
		res.status(HTTP_STATUS_CODE["Not Found"]).send("Article not found");
		return;
	}

	// If an article was found, send a 200 OK response with the article object
	res.status(HTTP_STATUS_CODE["OK"]).send(article);
});

route.post("/", (req, res) => {
	// Define a validation schema for the request body using Joi

	const schema = Joi.object({
		author: Joi.string().min(3).required(),
		body: Joi.string().min(3).required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		res.status(HTTP_STATUS_CODE["Bad Request"]).send(error.details[0].message);
		return;
	}

	const { author, body } = req.body;
	const article = {
		id: articles.length + 1,
		author,
		body,
	};
	articles.push(article);
	res.status(HTTP_STATUS_CODE["Created"]).send(article);
});

route.put("/:id", (req, res) => {
	const schema = Joi.object({
		// id: Joi.number().required(),
		author: Joi.string().min(3).required(),
		body: Joi.string().min(3).required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		res.status(HTTP_STATUS_CODE["Bad Request"]).send(error.details[0].message);
		return;
	}
	const id = +req.params.id;
	const article = articles.find((article) => article.id === id);
	if (!article) {
		res.status(HTTP_STATUS_CODE["Not Found"]).send("Article not found");
		return;
	}
	const { author, body } = req.body;
	article.author = author;
	article.body = body;
	res.status(HTTP_STATUS_CODE["OK"]).send(article);
});

route.delete("/:id", (req, res) => {
	const id = +req.params.id;
	const schema = Joi.number().integer().min(1).required();
	const { error } = schema.validate(id);
	if (error) {
		res.status(HTTP_STATUS_CODE["Bad Request"]).send("id" + error.details[0].message);
		return;
	}

	const articleIndex = articles.findIndex((article) => article.id === id);
	if (articleIndex === -1) {
		return res.status(HTTP_STATUS_CODE['Not Found']).send("Article not found");
	}

	articles.splice(articleIndex, 1);
	res.status(HTTP_STATUS_CODE["No Content"]).send();
});

module.exports	= route;