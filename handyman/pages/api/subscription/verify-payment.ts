import { sendPaymentReceivedEmail } from "@/backend/controllers/Subscription/emails/sendEmailAfterConfirm";
import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";
import Notification from "@/backend/models/Notifications";
import Plans from "@/backend/models/Plan";
import Subscription from "@/backend/models/Subscription";
import { createError, errorResponse } from "@/backend/utils/errorHandler";

import { transporter } from "@/helper/mailTransporter";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token =  verifyToken(req, res);
	switch (req.method) {
		case "POST":
			try {
				// Check if the user making the request is an admin
				if (token?.role !== "admin") {
					return res.status(401).json("invalid request");
				}

				// Extract the subscription ID from the request body
				const subscriptionId = req.body.subscriptionId;

				// If subscriptionId is not provided, throw an error
				if (!subscriptionId)
					createError("required params is missing", 400);

				// Fetch the subscription from the database using the subscription ID and populate the plan details
				const subscription = await Subscription.findById(
					subscriptionId
				).populate({ path: "plan", model: Plans });

				// Extract the plan details from the subscription
				const plan: any = subscription?.plan;

				// Calculate the start date as the current date
				const start_date = Date.now();
				// Calculate the end date based on the plan's duration in months
				let end_date = new Date(start_date);
				end_date.setMonth(
					end_date.getMonth() + plan?.duration_in_months
				);

				// Update the subscription with the new payment status, activation status, start date, and end date
				const update = await Subscription.findOneAndUpdate(
					{ _id: subscriptionId },
					{
						payment_status: "paid",
						status: "active",
						start_date,
						end_date,
					}
				);

				// Update the craftsman's current subscription and populate the user details
				const craftsman: any = await Craftsman.findOneAndUpdate(
					{ _id: update?.craftsmanId },
					{
						current_subscription: update?._id,
					}
				).populate("user");

				// Create a notification object to inform the user about the activation
				const notification = {
					userId: craftsman.user,
					type: "other",
					content: {
						text: `¡Felicidades!Su ${plan?.duration_in_months} Se activa la suscripción de mes`,
						senderName: "admin",
						link: `/dashboard/handyman/subscriptionmanagement/?subscriptionId=${subscriptionId}`,
					},
				};

				// Save the notification to the database
				new Notification(notification).save();

				// Send an email to the user informing them about the activation
				transporter.sendMail(
					sendPaymentReceivedEmail(
						craftsman?.user?.email,
						craftsman?.user?.name,
						plan,
						moment(start_date).format("L"),
						moment(end_date).format("L")
					)
				);

				// Return the updated subscription details as the response
				return res
					.status(200)
					.json({ data: update, userId: craftsman?.user?._id });
			} catch (error: any) {
				// Handle any errors that occur during the process and return an error response
				return errorResponse(res, error);
			}

		default:
			res.status(405).json({ message: "Method Not Allowed" });
	}
}

export default connectDb(handler);
