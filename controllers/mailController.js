import nodemailer from "nodemailer";

const sendMail = async (data) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.SMTP_SENDER_EMAIL,
				pass: process.env.SMTP_SENDER_PASSWORD,
			},
		});

		const mailOptions = {
			from: {
				name: "Mandeep Patwa",
				address: process.env.SMTP_SENDER_EMAIL,
			},
			to: data.email,
			subject: "Booking Confirmed",
			text: "Hello ",
			html: "<b>Hello HTML</b>",
		};

		const res = await transporter.sendMail(mailOptions);
		console.log("Email sent Successfully");
	} catch (error) {
		console.log(error);
	}
};

export { sendMail };
