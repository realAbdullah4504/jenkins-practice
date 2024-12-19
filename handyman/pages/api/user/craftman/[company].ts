import connectDb from "@/backend/middleware/db";
import Craftman from "@/backend/models/CrafstmanModel";
import PostalCode from "@/backend/models/PostalCode";
import Review from "@/backend/models/ReviewModel";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const payload = req.body;

	if (req.method === "GET") {
		const { company } = req.query;
		try {
			const craftMan = await Craftman.findOne({
				company_name: company,
			})
				.populate({
					path: "user",
					model: userDb,
					select: "name lastName phone zipCode profile_photo streetAddress",
					populate: { path: "address", model: PostalCode },
				})
				.populate({
					path: "reviews",
					model: Review,
					match: { status: "active" },
				})
				.exec();

			if (craftMan) {
				const response = craftMan;
				return res.status(200).json(response);
			}
			createError("Craftman not exist", 404);
		} catch (error: any) {
			errorResponse(res, error);
		}
	}
	if (req.method == "PUT") {
	}

	!["PUT", "GET", "POST"].includes(req.method as string) &&
		res.status(404).json({ message: "Invalid request method" });
};

export default connectDb(handler);
