import {
	createPlan,
	deletePlan,
	getPlans,
	updatePlan,
} from "@/backend/controllers/Plans";
import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = verifyToken(req, res);

	switch (req.method) {
		case "POST":
			if (token?.role !== "admin") {
				return res.status(401).json("invalid request");
			}
			return createPlan(req, res);
		case "GET":
			return getPlans(req, res);
		case "PUT":
			if (token?.role !== "admin") {
				return res.status(401).json("invalid request");
			}
			return updatePlan(req, res);
		case "DELETE":
			if (token?.role !== "admin") {
				return res.status(401).json("invalid request");
			}
			return deletePlan(req, res);
		default:
			res.status(405).json({ message: "Method Not Allowed" });
	}
}

export default connectDb(handler);
