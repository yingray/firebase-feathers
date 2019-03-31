const firebase = require("firebase/app");
require("firebase/database");
require("dotenv").config();
const config =
	process.env.NODE_ENV === "feathers"
		? {
				databaseURL: `ws://localhost:5000`
		  }
		: JSON.parse(process.env.CONFIG);

const app = firebase.initializeApp(config);

app.database()
	.ref("messages")
	.orderByKey()
	.startAt("messages-1554014147453")
	.limitToLast(3)
	.on("value", snap => {
		console.log("Got value: ", snap.val());
	});
