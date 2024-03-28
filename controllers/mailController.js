import nodemailer from "nodemailer";

function formatDateTime(dateTimeString) {
	// Parse the ISO 8601 string
	const date = new Date(dateTimeString);

	// Get the individual components
	const year = date.getFullYear();
	const month = date.getMonth(); // Month is zero-indexed (0 = January)
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0"); // Pad minutes with leading zero if needed
	const seconds = date.getSeconds().toString().padStart(2, "0"); // Pad seconds with leading zero if needed
	const utcOffset = date.getTimezoneOffset() / -60; // Get UTC offset in hours

	// Format the date part
	const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
		date
	);
	const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
		date
	);
	const dateString = `${weekday}, ${monthName} ${day}, ${year}`;

	// Format the time part
	const timeString = `${hours}:${minutes}:${seconds} UTC`;

	// Combine date and time with UTC offset
	return `${dateString} at ${timeString}`;
}

const sendMail = async (data) => {
	const bookingTime = formatDateTime(data.bookingTime);
	const exitTime = formatDateTime(data.exitTime);
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
			subject: "Your Ride Confirmed",
			html: `
			<!DOCTYPE html>
			<html>
				<head>
					<title>Booking Confirmation</title>
				</head>
				<body>
					<h2>Hi!</h2>
					<p>This email confirms your booking.</p>
					<p>Booking Details:</p>
					<ul>
						<li><strong>Booking Time:</strong> ${bookingTime}</li>
						<li><strong>Exit Time:</strong> ${exitTime}</li> 
						<li><strong>Total Cost:</strong> ₹ ${data.totalCost}</li> 
						<li><strong>Cab Type:</strong> ${data.cabType}</li>
						<li><strong>Estimated Time:</strong> ${data.distance}</li>
					</ul>
					<p>We look forward to welcoming you! If you need to make any changes to your booking, please reply to this email or contact us.</p>
					<p>Sincerely,</p>
					<p>The Uber Clone Team</p>
				</body>
			</html>
		`,
		};

		const res = await transporter.sendMail(mailOptions);
		console.log("Email sent Successfully");
	} catch (error) {
		console.log(error);
	}
};

export { sendMail };
