// Import necessary modules
import {
	createReclaim,
	updateReclaim,
} from "@/backend/controllers/Reviews/reclaim";
import getReclaim from "@/backend/controllers/Reviews/reclaim/getReclaims";

import connectDb from "@/backend/middleware/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			await createReclaim(req, res);
			break;
		case "GET":
			await getReclaim(req, res);
			break;
		case "PUT":
			await updateReclaim(req, res);
			break;
		default:
			res.status(405).json({ error: "Method Not Allowed" });
			break;
	}
}

export default connectDb(handler);
