import { createApproval } from "@/backend/controllers/Approval";
import { updateUserById } from "@/backend/controllers/user/updateUser";
import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Notification from "@/backend/models/Notifications";
import Craftsman from "@/backend/models/CrafstmanModel";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import PostalCode from "@/backend/models/PostalCode";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const payload = req.body;

	if (req.method === "GET") {
		const email = req.query?.email;
		const _id = req.query?._id;
		try {
			if (!email && !_id) createError("missing required params", 404);
			const user = await userDb
				.findOne({ $or: [{ email }, { _id }] })
				.select("-accessToken -refreshToken -password -otp")
				.populate({
					path: 'craftsman',
					model: Craftsman
				})
				.populate({
					path: 'address',
					model: PostalCode  // Make sure this matches your address model name
				});
	
			if (user) {
				// if(user.role==="handyman")
				return res.status(200).json(user);
			}
			createError("usuario no encontrado", 404);
		} catch (error: any) {
			errorResponse(res, error);
		}
	}

	if (req.method == "PUT") {
		const payload = req.body;
		try {
			const token = verifyToken(req, res);
			if (token) {
				let userId = token._id;
				if (token.role === "admin") {
					userId = payload.user;
					delete payload.user;
				}

				const response = await updateUserById(userId, payload);

				if (token?.role === "admin") {
					const Noti = {
						userId: response._id,
						type: "verification",
						content: {
							text:
								response.active_status === "active"
									? `Un administrador hizo su cuenta activa`
									: `Un administrador inactivó su cuenta. Comuníquese con nosotros para cualquier consulta.`,
							senderName: "",
							link: "/dashboard/handyman/",
						},
					};

					// Create notification
					Notification.create(Noti);

					// Create approval
					createApproval({
						approver: token._id,
						requested_user: response._id,
						approval_action: response.active_status,
					});
				}

				return res.status(200).json({
					message: "Datos actualizados con éxito",
					user: response,
				});
			} else createError("Token no válido", 401);
		} catch (error: any) {
			console.log(error);
			errorResponse(res, error);
		}
	}
};

export default connectDb(handler);
