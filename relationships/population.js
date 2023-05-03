const mongoose = require("mongoose");
const {Schema} = mongoose;

//connect to mongodb
mongoose
	.connect("mongodb://localhost:27017/firstDB")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
	"Author",
	new Schema({
		name: String,
		bio: String,
		website: String,
	})
);

const Course = mongoose.model(
	"Course",
	new Schema({
		name: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: "Author",
		},
	})
);

async function createAuthor(name, bio, website) {
	const author = new Author({
		name,
		bio,
		website,
	});

	const result = await author.save();
 console.log("author created");
	console.log(result);
}

async function createCourse(name, author) {
	const course = new Course({
		name,
		author,
	});

	const result = await course.save();
 console.log("course created");
	console.log(result);
}

async function listCourses() {
	const courses = await Course.find().populate("author", "name -_id").select("name author").exec();
	console.log(courses);
}
(async () => await listCourses())()
// (async () => await createAuthor("Mutahhir", "My bio", "My Website"))()
// (async () => await createCourse("Node Course", "6451306dfa78ee4e0a48d6dc"))
