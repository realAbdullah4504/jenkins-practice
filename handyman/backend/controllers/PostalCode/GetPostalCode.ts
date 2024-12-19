import PostalCode from "@/backend/models/PostalCode";
import { errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";

export const getAllPostalCodes = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		// const {pageNumber,pageSize} = req.query
		const search: any = req.query.search;
		const isNameSearch = req.query?.isNameSearch;
		const numericSearch = parseInt(search);
		let postalCodes: any;
		// Check if the search term is a number

		if (!isNaN(numericSearch)) {
			postalCodes = await PostalCode.find({
				Postal_Code: numericSearch,
			});
		} else {
			// If the search term is not a number, perform a partial match search for Place_Name only
			if (isNameSearch === "true") {
				postalCodes = await PostalCode.find({
					Place_Name: { $regex: new RegExp(search, "i") }, // Case-insensitive partial match for Place_Name
				}).limit(5);
			} else postalCodes = [];
		}

		if (search === "") {
			postalCodes = [];
		}
		res.status(200).json(postalCodes);
	} catch (error: any) {
		errorResponse(res, error);
	}
};

export const getPostalCodeById = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { id } = req.query;
	try {
		const postalCode = await PostalCode.findById(id);
		if (!postalCode) {
			res.status(404).json({ message: "Código postal no encontrado" });
		} else {
			res.status(200).json(postalCode);
		}
	} catch (error: any) {
		errorResponse(res, error);
	}
};
