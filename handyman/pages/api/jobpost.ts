import createJob from "@/backend/controllers/jobpost/createJob";
import { getUsersJobPost } from "@/backend/controllers/jobpost/getJobPost";
import { updateJobPost } from "@/backend/controllers/jobpost/updateJobPost";
import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import {
	checkRequiredQueryParam,
	createError,
	errorResponse,
} from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			try {
				const token = verifyToken(req, res);
				const { pageSize, pageNumber } = checkRequiredQueryParam(req);
				if (token) {
					const jobs = await getUsersJobPost(token._id, {
						pageSize,
						pageNumber,
					});
					return res.status(200).json({
						message: "Datos de trabajo recuperados con éxito",
						...jobs,
					});
				}
			} catch (error: any) {
				errorResponse(res, error);
			}
			break;
		case "POST":
			await createJob(req, res);
			break;
		case "PUT":
			const token = verifyToken(req, res);
			if (token) {
				const id = req.query?.id;
				const response = await updateJobPost(id, req.body, token);

				if (res) {
					return res.status(200).json({
						message: "Trabajo actualizado con éxito",
						response,
					});
				} else createError("Something went wrong", 500);
			}
			break;
		default:
			res.status(405).json({ message: "Método de solicitud no válido" });
			break;
	}
};

export default connectDb(handler);
