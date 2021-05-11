const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./router");
const bodyParser = require("body-parser");

console.log("NODE_ENV=" + process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
	dotenv.config({path: ".env.production"});
} else {
	const path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}.local` : ".env";
	dotenv.config({path});
}
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", router);

app.listen(PORT, () => console.log("Server listening on port " + PORT));
