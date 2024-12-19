import connectDb from "@/backend/middleware/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
			case "POST":

			case "GET":

			default:
				res.status(405).json({ message: "Method Not Allowed" });
		}
	} catch (error) {
		console.log(error);
	}
}

export default connectDb(handler);
