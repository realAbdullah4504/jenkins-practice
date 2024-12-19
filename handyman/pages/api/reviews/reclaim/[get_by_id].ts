// Import necessary modules

import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { Reclaim } from "@/backend/models/ReviewModel";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	let token = verifyToken(req, res);
	if (!token) return;
	switch (req.method) {
		case "GET":
			try {
				const reclaimId = req.query?.get_by_id;
				const reclaim = await Reclaim.findById(reclaimId);
				res.status(200).json(reclaim);
			} catch (error: any) {
				errorResponse(res, error);
			}
			break;

		default:
			res.status(405).json({ error: "Method Not Allowed" });
			break;
	}
}

export default connectDb(handler);
