// Importing necessary modules and utilities
import JobAlert from "@/backend/models/JobAlert"; // Importing the JobAlert model
import userDb from "@/backend/models/userModel"; // Importing the user model
import { createError, errorResponse } from "@/backend/utils/errorHandler"; // Importing error handling utilities
import { transporter } from "@/helper/mailTransporter"; // Importing the mail transporter utility
import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js types
import { sendUnsubscriptionConfirmation } from "./unsubscribeEmial"; // Importing the function to send unsubscription confirmation email

// Handler function for the API endpoint
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const makeUnsubscribe = async () => {
		try {
			// Retrieving OTP and email from request query parameters
			const otp = req.query.otp;
			const email = req.query.email;

			// Checking if OTP or email is missing, if so, throwing an error
			(!otp || !email) && createError("missing credentials", 400);

			// Finding the user based on the email
			const user = await userDb.findOne({ email });

			// If user is not found, throwing an error
			!user && createError("invalid request", 400);

			// Checking if the provided OTP matches the user's password, if not, throwing an error
			user.password !== otp && createError("invalid request", 400);

			// Finding the job alert for the user
			const jobalert = await JobAlert.findOne({
				userId: user._id,
			});

			// If job alert is inactive, throwing an error
			jobalert.status === "inactive" &&
				createError("invalid request", 400);

			// Updating the job alert status to inactive
			const jobAlert = await JobAlert.findOneAndUpdate(
				{
					userId: user._id,
				},
				{ status: "inactive" }
			);

			// If job alert update fails, throwing an error
			!jobAlert && createError("invalid request", 400);

			// Sending unsubscription confirmation email
			await transporter.sendMail(
				sendUnsubscriptionConfirmation(email as string)
			);
			return res.redirect("/?job_alert_unsubscription=true");
		} catch (error: any) {
			// Handling errors and sending error response
			errorResponse(res, error);
		}
	};

	switch (req.method) {
		// Handling GET requests
		case "GET":
			await makeUnsubscribe();
			break;

		// Handling other HTTP methods
		default:
			res.status(405).json({ error: "Method Not Allowed" });
			break;
	}
}
