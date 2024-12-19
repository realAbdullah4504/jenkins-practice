// Import necessary modules
import { getJobAlerts, updateJobAlert } from "@/backend/controllers/JobAlert";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let token = verifyToken(req, res);
	if (!token) return;
	switch (req.method) {
		case "GET":
			await getJobAlerts(req, res, token);
			break;
		case "PUT":
			await updateJobAlert(req, res, token);
			break;
		
		default:
			res.status(405).json({ error: "Method Not Allowed" });
			break;
	}
}
