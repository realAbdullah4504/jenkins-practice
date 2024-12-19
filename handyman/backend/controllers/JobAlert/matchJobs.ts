import JobAlert from "@/backend/models/JobAlert";
import JobPost from "@/backend/models/NewJob";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import { errorResponse } from "@/backend/utils/errorHandler";
import { calculateDistanceVincenty } from "@/helper/calculateDistance";
import { transporter } from "@/helper/mailTransporter";
import { sendJobAlert } from "@/pages/api/jobalert/send_alert/emailTemplate";
import { NextApiRequest, NextApiResponse } from "next";

export const findMatchingJobsAndSendEmail = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const jobId = req?.body.newJob._id;

		const job = await JobPost.findById(jobId);

		const preferences = await JobAlert.find({
			$or: [
				{ keywords: { $in: [job.category] } },
				{ location: { $in: [job.location.zip_code] } },
			],
			status: "active",
		}).populate({
			path: "userId",
			model: userDb,
			populate: { path: "address", model: PostalCode },
		});

		const filterPreference = preferences.filter((pref) => {
			// Calculate the distance between the user's location and the job post's location
			const jobDistance = calculateDistanceVincenty(
				pref?.userId?.address.Latitude,
				pref?.userId?.address?.Longitude,
				job.location.coordinates.coordinates[1],
				job.location.coordinates.coordinates[0]
			);

			// Check if the job post is within the specified distance
			return jobDistance <= pref?.radius;
		});

		const craftsman = filterPreference.map((item: any) => {
			const jobDistance = calculateDistanceVincenty(
				item?.userId?.address.Latitude,
				item?.userId?.address?.Longitude,
				job.location.coordinates.coordinates[1],
				job.location.coordinates.coordinates[0]
			);

			return {
				email: item?.userId?.email,
				distance: Math.round(jobDistance),
				otp: item.userId.password,
			};
		});

		// Function to send emails
		const sendEmails = async (items: any[]) => {
			try {
				const promises = items.map((item) => {
					return transporter.sendMail(
						sendJobAlert(item.email, job, item.distance, item.otp)
					);
				});
				await Promise.all(promises);
				console.log("Correos electrónicos enviados correctamente");
			} catch (error) {
				console.error("Error al enviar correos electrónicos:", error);
			}
		};

		// Call the function to send emails
		sendEmails(craftsman);
		res.status(200);
	} catch (error: any) {
		errorResponse(res, error);
	}
};
