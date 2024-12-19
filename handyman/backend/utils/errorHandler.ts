import { NextApiRequest, NextApiResponse } from "next";

class CustomError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

const createError = (message: string, status: number): never => {
	throw new CustomError(message, status);
};

const errorResponse = (res: NextApiResponse, error: Error): void => {
	if (error instanceof CustomError) {
		res.status(error.status).json({ error: error.message });
	} else {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// required query error for data fetching
const checkRequiredQueryParam = (req: NextApiRequest) => {
	const { pageSize, pageNumber } = req.query;
	if (!pageNumber && !pageSize) {
		createError("Please add required query `pageSize, pageNumber`}", 400);
	}
	return { pageSize: Number(pageSize), pageNumber: Number(pageNumber) };
};

export { checkRequiredQueryParam, createError, errorResponse };

