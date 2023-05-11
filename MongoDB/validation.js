/**
 * Validation is the process of ensuring that data is both correct and secure.
 * we have two types of validation:
 * 1. SchemaType validation
 * 2. Custom validation
 *
 * SchemaType validation:
 * 1. required
 * 2. minlength
 * 3. maxlength
 * 4. match
 * 5. enum
 *
 * Custom validation:
 * 1. validate
 * 2. async validate
 * 3. validateSync
 * 4. async validateSync
 * 5. runValidators
 * 6. isAsync
 * 7. validator
 */
const mongoose = require("./../export").mongoose;
mongoose
	.connect("mongodb://localhost:27017/firstDB", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

const artSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 255,
  lowerscase: true,
  // uppercase: true,
  trim: true,

	},
	category: {
		type: [ String ],
		enum: ["Painting", "Sculpture", "Photography", "Mixed Media"],
  validate: {
   // isAsync: true,
   validator: function(v) {
    const magic = this;
    
    //this is a mock async operation
    return new Promise(function(resolve) {
      setTimeout(function() {
        const result = magic.category && magic.category.length > 0;
        resolve(result);
      }, 2000);
    });
   
   },
   message: "An art should have at least one category.",
  }
	},
	artist: String,
	date: { type: Date, default: Date.now, required: true },
	isAvailable: Boolean,
	price: {
		type: Number,
		required: function () {
			return this.isAvailable; //if isAvailable is true, price is required
		},
		min: 0,
		max: 1000000,
			get: (v) => Math.round(v),
			set: (v) => Math.round(v),
	},
});

const Art = mongoose.model("Art", artSchema);

async function saveArt() {
	const art = new Art({
		name: "The Starry Night",
		category: [],
		artist: "Vincent van Gogh",
		price: 1000001,
		isAvailable: true,
	});
	try {
		/**
   * await art.validate(); //this will throw an error if the art object is invalid, it does not return a promise
   * or alternatve way
   * art.validate((err) => {
       if(err) console.log(err.message);
     })
   */

		const result = await art.save();
		console.log(result);
	} catch (ex) {
  //in this object we have a separte property for each invalid property in an art object.
		// console.log(ex.errors);
  for(field in ex.errors)
   console.log(ex.errors[field].message);
	 }
}

saveArt();
