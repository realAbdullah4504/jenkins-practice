import { updatePostalCode } from "@/backend/controllers/PostalCode/UpdatePostalCode";
import connectDb from "@/backend/middleware/db";
import { NextApiRequest, NextApiResponse } from "next";
import { deletePostalCode } from "../../../backend/controllers/PostalCode/DeletePostalCode";
import { getPostalCodeById } from "../../../backend/controllers/PostalCode/GetPostalCode";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			return getPostalCodeById(req, res);
		case "PUT":
			return updatePostalCode(req, res);
		case "DELETE":
			return deletePostalCode(req, res);
		default:
			res.status(405).json({ message: "Method Not Allowed" });
	}
}
export default connectDb(handler);
