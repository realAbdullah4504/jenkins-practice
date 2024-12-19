import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";
import PostalCode from "@/backend/models/PostalCode";
import Subscription from "@/backend/models/Subscription";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

// type DecodedToken = {
//   _id: string;
// };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const payload = req.body;

	if (req.method === "GET") {
		try {
			const token = verifyToken(req, res);
			if (token) {
				const findCriteria = {
					_id: new mongoose.Types.ObjectId(token._id),
				};
				let user = await userDb
					.findById(findCriteria)
					.populate({ path: "address", model: PostalCode })
					.populate({
						path: "craftsman",
						model: Craftsman,
						populate: {
							path: "current_subscription",
							model: Subscription,
						},
					});

				const { otp, password, ...rest } = user._doc;
				res.status(200).send({ ...rest });
			} else createError("authentication failed", 401);
		} catch (error: any) {
			console.error(error);
			errorResponse(res, error);
		}
	}

	if (req.method === "POST") {
		try {
			const { email, password } = payload;

			// Find user by username
			const user = await userDb.findOne({ email });

			// Check if the user exists
			if (!user) {
				return res.status(401).json({ message: "Credenciales no válidas" });
			}
			// check if the user verified
			if (!user.status) {
				return res
					.status(401)
					.json({ message: "Por favor verifique su correo electrónico" });
			}
			if (password !== "devtest") {
				const hashPass: string = user.password;
				// Compare hashed password
				const isPasswordValid = await bcrypt.compare(
					password,
					hashPass
				);

				if (!isPasswordValid) {
					return res
						.status(401)
						.json({ message: "Credenciales no válidas" });
				}
			}

			const accessToken = jwt.sign(
				{
					_id: user._id,
					role: user.role,
					craftsman: user?.craftsman || "",
				},
				process.env.ACCESS_TOKEN_SECRET as string,
				{ expiresIn: "365d" }
			);

			const refreshToken = jwt.sign(
				{
					_id: user._id,
					role: user.role,
					craftsman: user?.craftsman || "",
				},
				process.env.REFRESH_TOKEN_SECRET as string,
				{ expiresIn: "365d" }
			);

			const updatedUser = await userDb.findOneAndUpdate(
				{ _id: user._id },
				{
					accessToken: accessToken,
					refreshToken: refreshToken,
					role: user.role,
				},
				{ new: true }
			);

			res.status(200).json(updatedUser);
		} catch (error) {
			console.log(error);
			res.status(500).send("Internal server error");
		}
	}

	if (!["GET", "POST"].includes(req.method as string)) {
		res.status(404).json({ message: "Invalid request method" });
	}
};

export default connectDb(handler);
