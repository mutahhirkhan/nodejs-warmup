const mongoose = require("./../export").mongoose

mongoose
	.connect("mongodb://localhost:27017/firstDB", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

const artSchema = new mongoose.Schema({
	name: String,
	category: String,
	artist: String,
	price: Number,
	date: { type: Date, default: Date.now },
	isAvailable: Boolean,
});

const Art = mongoose.model("Art", artSchema);

/**
 * @notice Query first approach
 * useful if you want to validate the retrieved data before updating 
 * e.g. if art is already deleted, you don't want to update it
 */
// async function updateArt(id) {
//  const art = await Art.findById(id);
//  if (!art) return;
//  art.isAvailable = true;
//  art.name = "Another Art";

//  const result = await art.save();
//  console.log('result',result);

// }

// updateArt("644b737901cd726a5f7c36aa")

//---------------------------------------------------------------------------
/**
 * @notice Query first approach
 * useful if you want to directly update the data without validating it 
 * e.g. updating expiry date of a art
 */
//Update first approach
// async function updateArt(id) {
//  //here art is not returned, only the result is returned
//  //for getting the art with updating, use findByIdAndUpdate and set new to true
//  const result = await Art.updateOne({ _id: id }, {
//   $set: {
//    name: "Another Another Art",
//    isAvailable: false,
//   },
//  });
//  console.log('result',result);
// }
// updateArt("644b737901cd726a5f7c36aa")

//---------------------------------------------------------------------------
async function removeArt(id) {
	//if not found, this methods returns deltedCount = 0, don't return the deleted art
	// const result = await Art.deleteOne({ _id: id });
	// console.log('result',result);

	//if not found, this methods returns null, also returns the deleted art
	const art = await Art.findByIdAndDelete(id);
	console.log('art',art);
}

removeArt("644bca336c8128c07aa88a82")
