import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Plans from "@/backend/models/Plan";
import Subscription from "@/backend/models/Subscription";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = verifyToken(req, res);

	switch (req.method) {
		case "GET":
			try {
				if (token?.role === "client") {
					return res.status(401).json("invalid request");
				}
				req.body = { ...req.body, token };
				const pendingSubscritption = await Subscription.findOne({
					payment_status: "pending",
					craftsmanId: token?.craftsman,
				}).populate({ path: "plan", model: Plans });
				return res.status(200).json(pendingSubscritption);
			} catch (error: any) {
			return	errorResponse(res, error);
			}

		default:
			res.status(405).json({ message: "Method Not Allowed" });
	}
}

export default connectDb(handler);
