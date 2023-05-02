const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/firstDB", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB...", err));


	/**
		* price = 399.99, // This will be rounded to 400 before saving to the database
		* price = 400.99, // This will be rounded to 401 before saving to the database
		* price = 499.99, // This will be rounded to 500 before saving to the database
		* because we have set the get and set methods with roundsup the price
		*/
const artSchema = new mongoose.Schema({
	name: {type:String,required:true},
	category: String,
	artist: String,
	price: {type: Number, required: true, min: 0, max: 1000000, get: v => Math.round(v), set: v => Math.round(v)},
	date: { type: Date, default: Date.now, required: true,  },
	isAvailable: Boolean,
});

const Art = mongoose.model("Art", artSchema);
const art = new Art({
	name: "The Starry Night",
	category: "Painting",
	artist: "Vincent van Gogh",
	price: 1000000,
	isAvailable: true,
});


art.save();

//---------------------------------------------------------------------------
// Art.find({ artist: `Vincent van Gogh` }).exec().then((arts) => console.log('art',arts)).catch((err) => console.log('err',err));

//---------------------------------------------------------------------------
//querying using comparision operators
// const getArts = async () => {
//  const arts = await Art
//  // .find({ artist: `Vincent van Gogh` })
//  // .find({ artist: /.*van.*/i }) // i for case insensitive
//  // .find({price: {$gt: 1000, $lt: 2000}}) //price > 1000 and price < 2000
//  .find({price: $in([1000,1500,2000])}) //price = 1000 or price = 1500 or price = 2000)})
//  .skip(10)
//  .limit(10)
//  .sort({ name: 1 })
//  .select({ name: 1, price: 1 })
//  .exec();

//  console.log('arts',arts);

// }

//---------------------------------------------------------------------------
// //querying using logical operators
// const getArts = async () => {
//  const arts = await Art
//  .find({ artist: `Vincent van Gogh` })
//  // .or([{name: "The Starry Night"},{price: 1500}]) //returns all the arts with name = "The Starry Night" or price = 1500
//  .and({name: "The Starry Night", price: 1000000}) //returns all the arts with name = "The Starry Night" and price = 1500
//  .exec( )

//  console.log('arts',arts);

// };

//---------------------------------------------------------------------------
//REgular expressions
/**
 * starts with vincent /^vincent/
 * ends with vincent   /van$/
 * contains van        /.*van.*/
// * for case insensitive /.*van.*/i -- put i at the end
// *
// */

//---------------------------------------------------------------------------
//PAGIANTION
// const getArts = async () => {
//  const page = 1;
//  const limit = 10;

//  const arts = await Art
//  .find({name: /.*star.*/i})
//  .skip((page - 1) * limit) //skips previous results and server the next results
//  .limit(limit) //limits the number of results to be served
//  .sort({ date: 1 })
//  .exec();

//  console.log('arts',arts);
// }
// getArts( )

//---------------------------------------------------------------------------
//exercise
//get all available arts
//sort them by their name,
//pick only name and artist name
//and display them

//get all the arts that are available
// const getArts = async () => {
// 	const arts = await Art.find({isAvailable:true}).sort({ name: 1 }).select({ name: 1, artist: 1 }).exec();

// 	console.log("arts..", arts);

// };

// //display the result
// async function run () {
//  const arts = await getArts();
//  console.log('arts',arts);
// }

// run();

//---------------------------------------------------------------------------
//exercise
//get all arts that are available with price 1000000 and 1500000
//sort them by their price in descending order
//pick only name and artist
//and display them

//using $in operator
// const getArts = async () => {
// 	return await Art.find({ isAvailable: true, price: { $in: [1000000, 1500000] } })
// 		.sort({ price: -1 }) //or sort('-price')
// 		.select({ name: 1, artist: 1 })
// 		.exec();
// };

//using or method
// const getArts = async () => {
// 	return await Art.find({ isAvailable: true })
// 		.or([{ price: 1000000 }, { price: 1500000 }])
// 		.sort("-price")
// 		.select("name artist")
// 		.exec();
// };

// const run = async () => console.log(await getArts());
// console.log("arts...", run());

//---------------------------------------------------------------------------
//get all arts that are available with price 1000000 or more
//or have the word 'star' in their name

const getArts = async () => {
	return await Art.find({ isAvailable: true })
		.or([{ name: /.*start*./i }, { price: { $gte: 1000000 } }])
		.sort("-price")
		.select("name price")
		.exec();
};

const run = async () => console.log(await getArts());
console.log("arts...", run());
