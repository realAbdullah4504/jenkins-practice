import GetCraftManByUserId from "@/backend/controllers/craftsman/GetCraftsman";
import updateCraftman from "@/backend/controllers/craftsman/updateCraftman";
import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";

import userDb from "@/backend/models/userModel";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		try {
			const userId = req.query.userId as string;
			const response = await GetCraftManByUserId(userId);
			return res.status(200).json(response);
		} catch (error: any) {
			errorResponse(res, error);
		}
	}

	if (req.method === "PUT") {
		try {
			await updateCraftman(req, res);
		} catch (error) {
			console.log(error);
		}
	}

	if (req.method === "DELETE") {
		try {
			const token = verifyToken(req, res);
			if (token) {
				const userId = token._id;
				await Craftsman.deleteOne({
					user: userId,
				});
				await userDb.deleteOne({ _id: userId });
				res.status(200).json({ message: "User Deleted Successfully" });
			}
		} catch (error: any) {
			errorResponse(res, error);
		}
	}

	if (!["PUT", "DELETE"].includes(req.method as string)) {
		res.status(404).json({ message: "Invalid request method" });
	}
};

export default connectDb(handler);
