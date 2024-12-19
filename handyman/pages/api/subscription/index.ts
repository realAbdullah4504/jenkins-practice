import { createSubscription } from "@/backend/controllers/Subscription/createdSubscritpion";
import { getSubscriptions } from "@/backend/controllers/Subscription/getSubscription";
import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = verifyToken(req, res);

	switch (req.method) {
		case "POST":
			if (token?.role !== "handyman") {
				return res.status(401).json("invalid request");
			}
			req.body = { ...req.body, ...token };
			createSubscription(req, res);
			break;
		case "GET":
			if (token?.role === "client") {
				return res.status(401).json("invalid request");
			}
			req.body = { ...req.body, token };
			return getSubscriptions(req, res);
			
	

		// case "PUT":
		// 	return updatePlan(req, res);
		// case "DELETE":
		// 	return deletePlan(req, res);
		default:
			res.status(405).json({ message: "Method Not Allowed" });
	}
}

export default connectDb(handler);
