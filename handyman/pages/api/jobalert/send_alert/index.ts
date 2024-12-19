// Import necessary modules

import { findMatchingJobsAndSendEmail } from "@/backend/controllers/JobAlert/matchJobs";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let token = verifyToken(req, res);
	if (!token) return;
	switch (req.method) {
		case "POST":
			await findMatchingJobsAndSendEmail(req, res);
			break;
		default:
			res.status(405).json({ error: "Method Not Allowed" });
			break;
	}
}
