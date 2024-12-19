// pages/api/notifications.ts
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import {
	createNotification,
	deleteNotification,
	getAllNotifications,
	markAllNotificationAsRead,
	markNotificationAsRead,
} from "../../../backend/controllers/Notifications/index";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = verifyToken(req, res);
	if (token) {
		if (req.method === "GET") {
			try {
				const pageSize = Number(req.query.pageSize);
				const pageNumber = Number(req.query.pageNumber);
				const notifications = await getAllNotifications(
					token._id,
					pageSize,
					pageNumber
				);
				res.status(200).json({
					message: "notification retrived",
					...notifications,
				});
			} catch (error: any) {
				errorResponse(res, error);
			}
		}
		if (req.method === "POST") {
			try {
				const { receiver, type, content } = req.body;
				const notification = await createNotification(
					receiver,
					type,
					content
				);
				res.status(201).json(notification);
			} catch (error: any) {
				errorResponse(res, error);
			}
		}
		if (req.method === "PUT") {
			try {
				const { id } = req.query;
				let notification: any = {};
				if (id) {
					notification = await markNotificationAsRead(id as string);
				} else
					notification = await markAllNotificationAsRead(token._id);
				res.status(200).json(notification);
			} catch (error: any) {
				errorResponse(res, error);
			}
		}
		if (req.method === "DELETE") {
			try {
				const { id } = req.query;
				await deleteNotification(id as string);
				res.status(200).json({
					message: "Notification deleted successfully",
				});
			} catch (error: any) {
				errorResponse(res, error);
			}
		}
	}

	if (!["GET", "POST", "PUT", "DELETE"].includes(req.method as string)) {
		res.status(405).json({ message: "Method Not Allowed" });
	}
}
