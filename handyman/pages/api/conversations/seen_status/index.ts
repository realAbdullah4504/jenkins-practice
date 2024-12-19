// Import necessary modules
import { updateSeenStataus } from "@/backend/controllers/Coversation/CreateMessage";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { createError } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let token = verifyToken(req, res);
	// add message  and update conversation
	if (req.method === "PUT") {
		try {
			if (token) {
				const sender = token._id;
				let { convId } = req.body;

				if (!convId) {
					createError("Falta la identificación de la conversación", 400);
				}
				const response = await updateSeenStataus(sender, convId);
				res.status(200).json({
					messag: "Estado visto actualizado",
					response,
				});
			}
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	if (!["PUT"].includes(req.method as string)) {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
