const mongoose = require("./../export").mongoose;

mongoose
	.connect("mongodb://localhost:27017/firstDB")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

/**
 * @NOTICE here author document is embedded in the course document.
 * it can only be save through the course document. can not access or save it directly.
 */
//for single author document
const authorSchema = new mongoose.Schema({
	name: String,
	bio: String,
	website: String,
});

//for single author document
const Author = mongoose.model("Author", authorSchema);

//for single author document
const Course = mongoose.model(
	"Course",
	new mongoose.Schema({
		name: String,
		author: authorSchema, //directly embedding the complete authorSchema
	})
);

//for multiple author document
const ArrayCourseSchema = mongoose.model(
	"Course_Authors",
	new mongoose.Schema({
		name: String,
		authors: [authorSchema], //embedding the complete authorSchema in an array
	})
);

//for single author document
async function createCourse(name, author) {
	try {
		const course = new Course({
			name,
			author,
		});

		const courseSaved = await course.save();
		console.log(courseSaved);
	} catch (error) {
		console.log(error);
	}
}

//for single author document
async function listCourse() {
	try {
		const courses = await Course.find();
		console.log(courses);
	} catch (error) {
		console.log(error);
	}
}

//for single author document
async function updateAuthor(courseId) {
	try {
		{
			// const course = await Course.findById(courseId);
			// course.author.name = "Shapatar";
			// course.save();

			//--------------OR-----------------
			const course = await Course.findByIdAndUpdate(courseId, {
				$set: {
					"author.name": "Mutahhir  tycoon",
				},
			});
		}

		console.log("saved...");
	} catch (error) {
		console.log(error);
	}
}

// (async () =>
// 	await createCourse(
// 		"Node Course",
// 		new Author({
// 			name: "Mutahhir",
// 			bio: "My bio",
// 			website: "My Website",
// 		})
// 	))();

// (async () => {
// 	await updateAuthor("6452285e03feade8f1428114");
// })();

//------------------------------------
//WORKING WITH ARRAYS

async function addCourseWithMultipleAuthors(name, authors) {
	try {
		const course = new ArrayCourseSchema({
			name,
			authors,
		});

		const newCourse = await course.save();
		console.log(newCourse);
		console.log("saved...");
	} catch (error) {
		console.log(error);
	}
}

async function addAuthor(courseId, author) {
	try {
		const course = await ArrayCourseSchema.findById(courseId);
		course.authors.push(author);
		const newlyAdded = await course.save();
		console.log("saved...");
		console.log(newlyAdded);
	} catch (error) {
		console.log(error);
	}
}

/**
	* @NOTICE the $pull operator removes all array elements that match the given condition. 
	* If you want to remove only the first array element that matches the condition, 
	* you can use the $pull operator with the $slice operator as follows:
	* { $pull: { authors: { _id: authorId }, $slice: -1 } }
	* This removes the last element that matches the condition, which should be the same as removing the first element.
	*/

async function removeAuthor(courseId, authorId) {
	try {
		const course = await ArrayCourseSchema.findOneAndUpdate({ _id: courseId }, { $pull: { authors: { _id: authorId } } }, { new: true });
		console.log("saved...");
		console.log(course);
	} catch (error) {
		console.log(error);
	}
}

// 64527a5f9dc2f78728f26f3d
// 64527a5f9dc2f78728f26f3b
// (async () =>
// 	addCourseWithMultipleAuthors("NODE", [
// 		new Author({ name: "Ali", bio: "bio1", website: "website1" }),
// 		new Author({ name: "khan", bio: "bio2", website: "website2" }),
// 	]))();
// (async () =>
// addAuthor("64527a5f9dc2f78728f26f3d",
// 	new Author({ name: "bro", bio: "bio3", website: "website3" })
// ))();

(async () => await removeAuthor("64527c2e6f0096a722e1c9a0", "64527c2e6f0096a722e1c99e"))();
