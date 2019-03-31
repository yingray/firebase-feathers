const firebase = require("firebase/app");
require("firebase/database");

const config =
	process.env.NODE_ENV === "feathers"
		? {
				databaseURL: `ws://localhost:5000`
		  }
		: process.env.CONFIG;

const app = firebase.initializeApp(config);

const mId = `messages-${new Date().getTime()}`;

app.database()
	.ref(`messages/${mId}`)
	.set({
		id: mId,
		text: "Hello, world!!"
	})
	.then(() => {
		console.log("set");
		app.database()
			.ref(`messages/${mId}`)
			.update({
				id: mId,
				text: "Hello, world!!(updated)"
			});
	});
