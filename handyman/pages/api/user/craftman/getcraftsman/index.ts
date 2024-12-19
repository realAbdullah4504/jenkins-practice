import { GetCraftsmans } from "@/backend/controllers/craftsman/GetCraftsman";
import connectDb from "@/backend/middleware/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const payload = req.body;

	try {
		if (req.method === "GET") {
			await GetCraftsmans(req, res);
		}

		if (!["PUT", "DELETE", "GET"].includes(req.method as string)) {
			res.status(404).json({ message: "Invalid request method" });
		}
	} catch (error) {
		console.log(error);
	}
};

export default connectDb(handler);
