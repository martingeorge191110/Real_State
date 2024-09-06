import nodemailer from 'nodemailer'

/* Function to send mail after login process */

const sendMail = async (userEmail, userName) => {
	let checker = false
	/* Define the transporter options */
	const transporter = nodemailer.createTransport({
		host: process.env.HOST,
		port: process.env.EMAIL_PORT,
		secure: true,
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS
		}
	})

	/* Define the mail options */
	const mailOptions = {
		from:  process.env.GMAIL_USER,
		to: userEmail,
		subject: "Welcome To You!",
		text: "Hello, Admin Martin of this website welcome to you, you have a lot of offers for registering",
		html:  `
			<h1>Welcome Back, ${userName}!</h1>
			<p>We're glad to see you again on our platform. If you have any questions or need assistance, feel free to reach out to us.</p>
			<p>Best Regards,<br>The Team</p>
 		`
	}

		/* Send the mail */
	try {
		await transporter.sendMail(mailOptions);
		checker = true
		return (checker)
	} catch (error) {
		return (checker)
	}
}

/* Function to send mail with generated code to allowing reset password */
const sendMailRestPass = async (userEmail, genCode) => {
	let checker = false;

	const transporter = nodemailer.createTransport({
		host: process.env.HOST,
		port: process.env.EMAIL_PORT,
		secure: true,
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS
		}
	})

	const mailOptions = {
		from: process.env.GMAIL_USER,
		to: userEmail,
		subject: 'Password Reset Request',
		html: `
			<h1>Password Reset</h1>
			<p>Generated Code</p>
			<h2>${genCode}</h2>
		`,
	 };

	try {
		await transporter.sendMail(mailOptions)
		checker = true
		return (checker)
	} catch (err) {
		return (checker)
	}
}

export {sendMail, sendMailRestPass}
