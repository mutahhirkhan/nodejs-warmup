const http = require('http')
const logger = require('./logger')
const moduleWrapper = require("./moduleWrapper")
const OS = require('./os')
const PATH = require('./path')

//this server extends EventEmitter, so server.on, .emit, .removeListener, .off, .once are available
const server = http.createServer((req, res) => {
 //these are the routes to hit
 //later will use express
 if(req.url === '/'){
  res.write('Hello World')
  res.end()
 }
 else if(req.url === '/api'){
  res.write(JSON.stringify([1,2,3]))
  res.end()
 }
 else if(req.url === '/log'){
  //if importing plain object rather than class
  // logger('loggin...')
  const log = new logger()
  log.log("logging...")
  res.write('Logging...')
  res.end();
 }
})

console.log(moduleWrapper);
// moduleWrapper.log('module wrapper call')

server.listen(3000)
console.log('Listening on port 3000...');

server.on('connection', (socket) => {
 console.log(' New connection...')
})

