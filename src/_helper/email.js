import nodemailer from 'nodemailer';
const smtpTransport = nodemailer.createTransport({
	// host: "mail.silverwebbuzz.com",
	// port: 465,
	// secure: true, // true for 465, false for other ports
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: 'tusharjoshiswb@gmail.com', // generated ethereal user
		pass: 'zbhvzjrmkchemgse',
	},

	// tls: {
	//     rejectUnauthorized: false
	// }
});

async function sendDynamicMail(to, subject, htmlSend) {
	var mailOptions = {
		from: 'tusharjoshiswb@gmail.com',
		to: to,
		subject: subject,
		html: htmlSend,
	};

	smtpTransport.sendMail(mailOptions, function (error, response) {
		console.log('response', response);
		console.log('error', error);
		if (response) {
			return true;
		}
		if (error) {
			return error;
		}
	});
}

module.exports = {
	sendDynamicMail,
};
