import { verifyToken } from "@/backend/middleware/verifyJwt";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { getPaginatedData } from "@/helper/getPaginatedData";
import { NextApiRequest, NextApiResponse } from "next";
import Craftsman from "../../models/CrafstmanModel";

export const GetCraftManByUserId = async (user: string) => {
	try {
		const craftsman = await Craftsman.findOne({ user });
		return craftsman;
	} catch (error) {
		throw error;
	}
};

export const GetCraftsmans = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const status = req.query.status as string;
		const tokenUser = verifyToken(req, res);
		if (tokenUser?.role !== "admin") {
			createError("authentication failed", 401);
		}

		let pageNumber = Number(req.query.pageNumber) || 1;
		let pageSize = Number(req.query.pageSize) || 10;
		const totalDocuments = await Craftsman.countDocuments({
			status,
		});

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

		const craftsman = await Craftsman.find({ status });
		res.status(200).json({
			data: craftsman,
			totalPages,
			totalDocuments,
			currentPage,
			fetchedDocs: craftsman.length,
		});
	} catch (error: any) {
		errorResponse(res, error);
	}
};
export default GetCraftManByUserId;
