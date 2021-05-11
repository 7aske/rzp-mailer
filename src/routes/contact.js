const express = require("express");
const {sendMail} = require("../mail/mail");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 15 minutes
	max: process.env.NODE_ENV === "production" ? 5 : 999,
});

const contact = express.Router();

contact.post("/", limiter, (req, res) => {
	const data = req.body;

	if ((!data.sender || !data.message || !data.email) && process.env.NODE_ENV === "production")
		return res.status(400).json({error: "Bad Request"});

	process.env.MAIL_RECEIVERS.split(",")
		.forEach(mail => {
			if (process.env.NODE_ENV === "development") {
				console.log(`Sending mail from ${data.mail} to ${mail}`);
			} else {
				sendMail(data, mail, "Contact Message");
			}
		});

	return res.status(200).json({message: "Ok"});
});

module.exports = contact;
