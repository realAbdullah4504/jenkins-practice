import { getUsers } from "@/backend/controllers/user/getUser";
import connectDb from "@/backend/middleware/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === "GET") {
			await getUsers(req, res);
		}
	} catch (error) {
		console.log(error);
	}
};

export default connectDb(handler);
