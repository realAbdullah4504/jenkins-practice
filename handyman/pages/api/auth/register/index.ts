import RegisterCraftMan from "@/backend/controllers/craftsman/createCraftman";
import connectDb from "@/backend/middleware/db";
import { errorResponse } from "@/backend/utils/errorHandler";
import getIpAddress from "@/helper/getIpAddress";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	let payload = req.body;
	if (req.method == "POST") {
		try {
			if (payload.role === "handyman") {
				const ipAddress = getIpAddress(req);
				let response = await RegisterCraftMan(
					payload,
					ipAddress as string
				);
				if (response) {
					return res.status(200).json({
						message:
							"Hemos enviado un correo electrónico. Por favor, verifique su bandeja de entrada",
					});
				} else throw error;
			}
		} catch (error: any) {
			errorResponse(res, error);
		}
	} else {
		res.status(404).json({ message: "Invalid request method" });
	}
};

export default connectDb(handler);
