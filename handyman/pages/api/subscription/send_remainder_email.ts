import connectDb from "@/backend/middleware/db";
import Subscription from "@/backend/models/Subscription";
import { errorResponse } from "@/backend/utils/errorHandler";
import { transporter } from "@/helper/mailTransporter";
import moment from "moment";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next/types";

const template = ({ plan, name, lastName, end_date }: any) => {
	return `
	<html>
            <head>
              <style>
                body { max-width: 100%; margin-inline: auto; } h1 { color: #717171;
                font-size: 24px; color: #000000; margin-top: 20px;} p { font-size: 14px;}
                .container { max-width: 500px; margin: 0 auto; padding-top: 24px; } .main
                {margin-bottom: 20px; color: #000000;} .hr__line{ height: 1.2px;
                background-color: #dddddd; margin: 40px auto 30px auto; } .desc { color:
                #000000; padding-bottom: 10px;} .desc1 {color: #000;padding-bottom:10px;} .desc2{color:#000; padding: 10px 0} .footer__desc { color: #56595C;
                padding-bottom: 10px;} .footer__img{ width: 96px; } .mid_p { margin: 0
                auto 4px auto; font-size: 13px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="main">
                  <p>Dear ${name}</p>
                </div>

                <p class="desc">We hope this email finds you well. This is a friendly reminder that your subscription to <b>${
					plan.name
				}</b> is set to expire in 30 days, on ${moment(end_date).format(
		"L"
	)}.</p>

                <p class="desc1">We appreciate your continued trust in our services, and we want to ensure that you experience no interruption. To maintain uninterrupted access, please renew your subscription before the expiration date.</p>
             
                <p class="desc">You can easily renew your subscription by visiting <a href="${
					process.env.BASE_URL
				}/dashboard/handyman/subscriptionmanagement">this link</a>  or contacting our support team at support@handyman.com</p>

                <p class="desc">Thank you for being a valued member of our community. We look forward to continuing to serve you.</p>

                <div class="hr__line"></div>
                <p class="footer__desc">Best regards, </br> Handyman Service Portal Team</p>
            </body>
          </html>
	
	
	`;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const authHeader = req?.headers.authorization;
		if (
			!process.env.CRON_SECRET ||
			authHeader !== `Bearer ${process.env.CRON_SECRET}`
		) {
			return res.status(401).json({ success: false });
		}
		// const currentDate = moment(); // Get current date
		const futureDate = moment().add(30, "days"); // Get date 30 days from now
		const subscription = await Subscription.aggregate([
			{
				$match: {
					status: "active",
					end_date: { $lte: futureDate.toDate() },
				},
			},
			{
				$lookup: {
					from: "plans",
					localField: "plan",
					foreignField: "_id",
					as: "plan",
				},
			},
			{
				$unwind: "$plan",
			},
			{
				$lookup: {
					from: "craftsmen",
					localField: "craftsmanId",
					foreignField: "_id",
					as: "craftsman",
				},
			},
			{
				$unwind: "$craftsman",
			},
			{
				$lookup: {
					from: "userdbs", // Changed from "userdbs" assuming it was a typo
					localField: "craftsman.user",
					foreignField: "_id",
					as: "craftsman.user",
				},
			},
			{
				$unwind: "$craftsman.user",
			},

			{
				$project: {
					_id: 1,
					status: 1,
					start_date: 1,
					end_date: 1,
					plan: 1,
					username: "$craftsman.username",
					email: "$craftsman.user.email",
					last_name: "$craftsman.user.lastName",
					name: "$craftsman.user.name",
				},
			},
		]);

		if (subscription.length > 0) {
			const emailPromises = subscription.map(async (i: any) => {
				try {
					console.log(`Attempting to send email to: ${i?.email}`);
					await transporter.sendMail({
						from: "'Handyman'<backenddatabase2023@gmail.com>",
						to: `${i?.email}`,
						subject: `Your Subscription Will Expire in 30 Days`,
						html: template(i),
					});
					console.log(`Email successfully sent to: ${i?.email}`);
				} catch (error) {
					console.error(
						`Failed to send email to ${i?.email}:`,
						error
					);
				}
			});

			try {
				await Promise.all(emailPromises);
				res.status(200).json(subscription);
			} catch (error) {
				console.error("Error sending some emails:", error);
				res.status(500).json({ error: "Error sending some emails" });
			}
		} else {
			console.log("No subscriptions to process.");
			res.status(200).json({ message: "No subscriptions to process." });
		}
	} catch (error: any) {
		errorResponse(res, error);
	}
}

export default connectDb(handler);
