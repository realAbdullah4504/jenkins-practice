require("dotenv").config();
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { createError, errorResponse } from "../utils/errorHandler";
// Middleware to verify JWT token
declare module "next" {
	export interface NextApiRequest {
		user?: {
			_id: number;
			role: string;
			// Add any other user-related properties here
		};
	}
}
export interface Token {
	_id: string;
	role: string;
	craftsman: string;
}

export function verifyToken(req: NextApiRequest, res: NextApiResponse) {
	try {
		const authHeader = req.headers?.authorization;
		const token = authHeader?.split(" ")[1];
		if (!token) {
			createError("Token no encontrado", 404);
			return null;
		}
		let tokenUser: Token = { _id: "", role: "", craftsman: "" };
		jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET as string,
			(err: any, decoded: any) => {
				if (err) {
					createError("Token inválido", 401);
					return null;
				}

				tokenUser = decoded;
				return decoded;
			}
		);
		if (tokenUser._id) {
			return tokenUser;
		} else return null;
	} catch (error: any) {
		errorResponse(res, error);
		throw new Error("Token no válido");
	}
}
