//because this is a module, so it's function and variable are sort of private just like in OOP
//this is how a module in intializzed
//remove IIFE before using this code
//this proves that require and exports and module are not from global object 
(function(exports, require, module, __filename, __dirname){

 console.log(__filename);
 console.log(__dirname);

 const i=1;
 const URL = 'http://'
 function log(message) {
  console.log(message);
 }
 
 module.exports = log
 //exports = log   //this is an invalid statement as exports is just a reference of module.exports
})

