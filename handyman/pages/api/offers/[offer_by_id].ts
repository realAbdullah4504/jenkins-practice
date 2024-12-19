import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import OfferDb from "@/backend/models/Offer";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case "GET":
				try {
					verifyToken(req, res);
					const offer_id = req.query?.offer_by_id;

					const data = await OfferDb.findById(offer_id).populate(
						"job"
					);
					res.status(200).json(data);
				} catch (error: any) {
					errorResponse(res, error);
				}
				break;
			default:
				res.status(405).json({ message: "Method Not Allowed" });
		}
	} catch (error) {
		console.log(error);
	}
}

export default connectDb(handler);
