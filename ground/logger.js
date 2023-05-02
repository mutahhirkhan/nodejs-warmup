const EventEmitter = require("events");

const URL = 'http://mylogger.io/log';
class Logger extends EventEmitter {
 constructor() {
  super();
  this.url = URL;
 }
 log(message) {
  // Send an HTTP request
  console.log(message);
  // Raise an event
  this.emit('messageLogged', { id: 1, url: 'http://' });
 }
}

/**
 * function Logger(message) {
 *  //send an HTTP request
 *  console.log(message)
 * }
 * 
 */
module.exports = Logger;