const express = require('express')
const route = express.Router()


//here index is the file name inside the 'views' folder 
route.get("/", (req, res) => {
	res.render('index', {title:"My Express App", message:"Hello Word"})
});

module.exports = route;