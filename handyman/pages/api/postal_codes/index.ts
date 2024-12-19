import connectDb from "@/backend/middleware/db";
import { NextApiRequest, NextApiResponse } from "next";
import { createPostalCode } from "../../../backend/controllers/PostalCode/CreatePostalCode";
import { getAllPostalCodes } from "../../../backend/controllers/PostalCode/GetPostalCode";
async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "POST":
			return createPostalCode(req, res);
		case "GET":
			return getAllPostalCodes(req, res);
		default:
			res.status(405).json({ message: "Method Not Allowed" });
	}
}

export default connectDb(handler);
