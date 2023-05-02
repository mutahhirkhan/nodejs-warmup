function getCustomer(id) {
	return new Promise((resolve, reject) =>
		setTimeout(() => {
			resolve({
				id: 1,
				name: "Mosh",
				isGold: true,
				email: "email",
			});
		}, 2000)
	);
}

function getTopMovies() {
	return new Promise((resolve, reject) =>
		setTimeout(() => {
			resolve(["movie1", "movie2"]);
		}, 2000)
	);
}

function sendEmail(email, movies) {
	return new Promise((resolve, reject) =>
		setTimeout(() => {
   resolve();
		}, 2000)
	);
}



async function notifyCustomer() {
	const customer = await getCustomer(1);
 console.log('customer', customer);
	if (customer.isGold) {
		const movies = await getTopMovies();
  console.log('movies', movies);
		await sendEmail(customer.email, movies);
  console.log('mail sent.');
	}
}


notifyCustomer()