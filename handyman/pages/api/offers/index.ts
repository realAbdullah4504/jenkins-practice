// Import necessary modules
import createOffer from "@/backend/controllers/Offers/CreateOffer";
import getOffersByUser from "@/backend/controllers/Offers/GetOffer";
import updateOffer from "@/backend/controllers/Offers/UpdateOffer";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";
import {
	checkRequiredQueryParam,
	createError,
	errorResponse,
} from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let token = verifyToken(req, res);

	const getCraftmanId = async () => {
		try {
			if (token) {
				if (!token.craftsman) {
					const craftsman = await Craftsman.findOne({
						user: token._id,
					});
					return craftsman._id;
				} else return token?.craftsman;
			}
		} catch (error) {
			throw error;
		}
	};

	// get offers
	if (req.method === "GET") {
		try {
			if (token) {
				let userId = token._id;
				if (token?.role === "handyman") {
					userId = token.craftsman;
				}
				if (token.role === "admin") {
					console.log(req.query.userid);
					const id = req.query.userid
					!id && createError("inavalid req", 400);
					console.log(id);
					userId = id as string;
				}

				const { pageSize, pageNumber } = checkRequiredQueryParam(req);

				const response = await getOffersByUser(userId, {
					pageNumber,
					pageSize,
				});

				res.status(200).json({
					message: "data successfully fetched",
					...response,
				});
			}
		} catch (error: any) {
			errorResponse(res, error);
		}
	}
	//create offer
	if (req.method === "POST") {
		try {
			if (token?.role === "handyman") {
				let userId = await getCraftmanId();
				let objId = await token?._id
				const { client, price, job } = req.body;
				if (!client || !price || !job) {
					createError("required params is missing", 400);
				}

				const response = await createOffer({ ...req.body, userId, objId });
				res.status(201).json({
					message: "Oferta creada con éxito",
					response,
				});
			} else createError("request is not authorized", 401);
		} catch (error: any) {
			errorResponse(res, error);
		}
	}

	// update offer
	if (req.method === "PUT") {
		try {
			if (token) {
				let userId = token._id;

				const { offerId, jobId, data = {} } = req.body;
				if (!offerId && Object.keys(data).length === 0)
					createError("Required params is missing", 400);
				if (data.status === "accepted" && !jobId)
					createError("Se requiere una identificación de trabajo para aceptar la oferta", 400);
				// data.status &&
				// 	token.role !== "client" &&
				// 	createError(
				// 		`offer status can not be updated by ${token.role}`,
				// 		401
				// 	);

				if (token.role === "handyman") {
					data.status !== "withdrawn" &&
						createError(
							`Handyman no puede actualizar esto ${data.status}`,
							401
						);
					userId = await getCraftmanId();
				}

				const response = await updateOffer({
					offerId,
					jobId,
					userId,
					data,
				});

				res.status(200).json({
					messag: "Oferta actualizada con éxito",
					data: response,
				});
			}
		} catch (error: any) {
			errorResponse(res, error);
		}
	}

	if (!["POST", "PUT", "GET"].includes(req.method as string)) {
		res.status(405).json({ error: "Method Not Allowed" });
	}
}
