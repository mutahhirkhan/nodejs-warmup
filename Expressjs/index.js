// const articles = [
// 	{
// 		id: 1,
// 		author: "Scott",
// 		body: "A post",
// 	},
// 	{
// 		id: 2,
// 		author: "Max",
// 		body: "A post",
// 	},
// 	{
// 		id: 3,
// 		author: "Allan",
// 		body: "A post",
// 	},
// ];

// const art = articles.find((article) => article.id == 2);
// console.log(articles);
// art.author = "Maximilian";
// console.log(articles);

//===============================================

// Example object to copy
const originalObject = {
 name: "John",
 age: 30,
 hobbies: ["reading", "running"],
};

// Shallow copy using the spread operator
const shallowCopy = { ...originalObject };

// Deep copy using JSON.parse and JSON.stringify
const deepCopy = JSON.parse(JSON.stringify(originalObject));

// Modify original object's hobbies array
originalObject.hobbies.push("cooking");

// Log original object and copies
console.log("Original object:", originalObject);
console.log("Shallow copy:", shallowCopy);
console.log("Deep copy:", deepCopy);
