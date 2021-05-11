const mailer = require("nodemailer");

const sendMail = (data, to, subject = "Mailer") => {

	let transporter = mailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	const text = `Sender: ${data.sender}\nEmail: ${data.email}\nMessage:\n\n${data.message}`;
	const html = `<html><body>${text.replace(/\n/g, "<br/>")}</body></html>`;

	return transporter.sendMail({
		from: process.env.MAIL_USER,
		sender: `Digitize.rs - ${data.sender} ${data.email.split("@")[0].toUpperCase()}`,
		to,
		subject,
		text,
		html,
	});
};

module.exports = {sendMail};
