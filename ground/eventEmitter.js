const eventEmitter = require("events");
const emitter = new eventEmitter();

// Register a messageLogged listener
emitter.on("messageLogged", (e) => {
	console.log("messageLogged", e);
});

// Raise an event
emitter.emit('messageLogged', {data:'http://socialblocksone.web.app'})


// Register a logging listener
emitter.on('logging', (e)=> {
 console.log("logging", e);
})

// Raise logging event 
emitter.emit('logging', {data: 'message'})


// Register a mutahhir listener
emitter.on('mutahhir', (e) => {
 console.log("mutahhir", e);
})

// Raise mutahhir event
emitter.emit('mutahhir', {data: 'message'})