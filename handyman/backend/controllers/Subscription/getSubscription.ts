import Subscription from "@/backend/models/Subscription";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { getPaginatedData } from "@/helper/getPaginatedData";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export const updateSubscription = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const subscriptionId = req.query.subscriptionId;
		const payload = req.body;

		// Check if required parameters are present
		if (!subscriptionId) {
			createError("Falta la identificación de suscripción", 400);
		}

		// Update the subscription
		const updatedSubscription = await Subscription.findByIdAndUpdate(
			subscriptionId,
			payload,
			{
				new: true,
			}
		);

		res.status(200).json(updatedSubscription);
	} catch (error: any) {
		console.error(error);
		errorResponse(res, error);
	}
};

export const getSubscriptions = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const pageSize = Number(req.query.pageSize) || 10; // Default page size if not provided
		const pageNumber = Number(req.query.pageNumber) || 1; // Default page number if not provided
		const status = req.query?.status;
		const payment_status = req.query?.payment_status;
		let paymentId = req.query?.paymentId;
		let findCriteria: any = {};
		const token = req.body?.token;

		if (token.role === "handyman") {
			const objectId = new mongoose.Types.ObjectId(token.craftsman);
			findCriteria.craftsmanId = objectId;
		}

		if (status && status !== "undefined") {
			findCriteria.status = status;
		}

		if (payment_status && payment_status !== "undefined") {
			findCriteria.payment_status = payment_status;
		}

		paymentId === "" && (paymentId = "undefined");
		if (paymentId && paymentId !== "undefined") {
			findCriteria.paymentId = { $regex: paymentId, $options: "i" }; // Case-insensitive regex match
		}

		const totalDocuments = await Subscription.countDocuments(findCriteria);

		const {
			adjustedPageSize,
			hasToContinue,
			emptyResponse,
			totalPages,
			currentPage,
		} = getPaginatedData(totalDocuments, pageSize, pageNumber);

		if (!hasToContinue) {
			return res.status(200).json(emptyResponse);
		}

		const dboparation: any = [
			{ $match: findCriteria },
			{ $sort: { createdAt: -1 } },
			{ $skip: (pageNumber - 1) * pageSize },
			{ $limit: adjustedPageSize },
			{
				$lookup: {
					from: "plans", // Name of the plans collection
					localField: "plan",
					foreignField: "_id",
					as: "plan",
				},
			},
			{ $unwind: "$plan" }, // Assuming each subscription has a single plan
		];

		if (token.role === "admin") {
			dboparation.push(
				{
					$lookup: {
						from: "craftsmen", // Name of the plans collection
						localField: "craftsmanId",
						foreignField: "_id",
						as: "craftsmanId",
					},
				},
				{ $unwind: "$craftsmanId" }
			);
		}

		const subscriptions = await Subscription.aggregate(dboparation);
		const result = { data: subscriptions, totalPages, currentPage };

		return res.status(200).json(result);
	} catch (error: any) {
		console.error(error);
		errorResponse(res, error);
	}
};

export const deleteSubscription = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const subscriptionId = req.query.subscriptionId;

		// Check if required parameters are present
		if (!subscriptionId) {
			createError("Falta la identificación de suscripción", 400);
		}

		// Delete the subscription
		const deletedSubscription = await Subscription.findByIdAndDelete(
			subscriptionId
		);

		res.status(200).json(deletedSubscription);
	} catch (error: any) {
		console.error(error);
		errorResponse(res, error);
	}
};
