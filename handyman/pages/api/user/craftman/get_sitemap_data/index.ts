import connectDb from "@/backend/middleware/db";
import Craftsman from "@/backend/models/CrafstmanModel";

import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "GET") {
		try {
			const agrr = [
				{
					$match: {
						status: "verified",
					},
				},

				{
					$lookup: {
						from: "userdbs",
						let: { userId: "$user" },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$_id", "$$userId"] },
								},
							},
							{
								$project: {
									_id: 0,
									active_status: 1,
								},
							},
						],
						as: "userArray",
					},
				},

				{
					$addFields: {
						user: { $arrayElemAt: ["$userArray", 0] },
					},
				},
				{
					$match: {
						"user.active_status": "active",
					},
				},
				{
					$project: {
						company_name: 1,
						updatedAt: 1,
					},
				},
			];

			const response = await Craftsman.aggregate(agrr);

			return res.status(200).json(response);
		} catch (error: any) {
			errorResponse(res, error);
		}
	}

	if (!["PUT", "DELETE"].includes(req.method as string)) {
		res.status(404).json({ message: "Invalid request method" });
	}
};

export default connectDb(handler);
