//usage app.use(logger);
function addTimestamp(req, res, next) {
	req.timestamp = new Date();
	next();
}

//usage app.use(addTimestamp);
function logger(req, res, next) {
 console.log('timestamp...',req.timestamp);
 next();
}

//usage app.use(addTimestamp());
function addTimestampReturnedMiddleware() {
	return function(req, res, next) {
			req.timestamp = new Date();
			next();
	}
}

//usage app.use(logger());
function loggerReturnedMiddleware() {
	return function(req, res, next) {
			console.log('timestamp...',req.timestamp);
			next();
	}
}


module.exports = {logger, addTimestamp, loggerReturnedMiddleware, addTimestampReturnedMiddleware}
