import connectDb from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import userDb from "@/backend/models/userModel";
import { transporter } from "@/helper/mailTransporter";
import { sendChangePassMail } from "@/helper/sendConfirmEmailForChangePass";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

import { NextApiRequest, NextApiResponse } from "next";

const validatePasswordChange = [
	body("currentPassword").notEmpty().withMessage("Old password is required"),
	body("newPassword")
		.isLength({ min: 8, max: 12 })
		.withMessage("New password must be between 8 and 12 characters long")
		.matches(/[A-Z]/)
		.withMessage("New password must contain at least one uppercase letter")
		.matches(/[a-z]/)
		.withMessage("New password must contain at least one lowercase letter")
		.matches(/\d/)
		.withMessage("New password must contain at least one number")
		.matches(/\W/)
		.withMessage(
			"New password must contain at least one special character"
		),
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "PUT") {
		try {
			// validate inputs
			await Promise.all(
				validatePasswordChange.map((validation) => validation.run(req))
			);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// verify token
			const tokenUser = verifyToken(req, res);

			// if token verified
			if (tokenUser) {
				const { currentPassword, newPassword } = req.body;
				const user = await userDb.findById(tokenUser._id);

				// match password
				const isMatched = await bcrypt.compare(
					currentPassword,
					user?.password
				);
				if (isMatched) {
					const hashPassword = await bcrypt.hash(newPassword, 10);
					await userDb.findByIdAndUpdate(user._id, {
						$set: { password: hashPassword },
					});
					await transporter.sendMail(sendChangePassMail(user));

					return res
						.status(200)
						.json({ message: "Contraseña cambiada correctamente" });
				} else {
					return res
						.status(401)
						.json({
							message:
								"Contraseña actual no válidaida",
						});
				}
			}
		} catch (error: any) {
			console.log(error);
			res.status(500).json(error.message);
		}
	} else return res.status(405).json({ error: "Method Not Allowed" });
}

export default connectDb(handler);
