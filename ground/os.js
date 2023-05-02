const os = require('node:os')


const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

//convert bytes to human readable format of memory
function niceBytes(x){
  let l = 0, n = parseInt(x, 10) || 0;
  while(n >= 1024 && ++l){
      n = n/1024;
  }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

const version = os.version() //returns string containgn os name, and current time
const userInfo = os.userInfo() //returns object
const upTime = os.uptime() //in seconds
const cpus = os.cpus();
const totalMemory = os.totalmem() //in bytes
const freeMemory = os.freemem() //in bytes
const ownerName = userInfo.username
const hostName = os.hostname()

console.log(`Version: ${version}`)
console.log(`User Info: `,userInfo)
console.log(`Up Time: ${(upTime/60).toFixed(2)} minutes`)
console.log(`CPUs: `, cpus)
console.log(`Total Memory: ${niceBytes(totalMemory)}`) //in GB
console.log(`Free Memory: ${niceBytes(freeMemory)}`) //in GB
console.log(`Owner Name: ${ownerName}`)
console.log(`Host Name: ${hostName}`)
