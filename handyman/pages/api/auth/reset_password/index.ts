import connectDb from "@/backend/middleware/db";
import userDb from "@/backend/models/userModel";
import { generateRandomPassword } from "@/helper/generateRandomPassword";
import { transporter } from "@/helper/mailTransporter";
import bcrypt from "bcryptjs";

import { NextApiRequest, NextApiResponse } from "next";
import { sendResetPassMail } from "./emailOption";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "PUT") {
		try {
			// if token verified
			const { email } = req.body;
			const user = await userDb.findOne({ email });
			const newPassword = generateRandomPassword(8);
			const hashPassword = await bcrypt.hash(newPassword, 10);
            
            if(user){
                await userDb.findByIdAndUpdate(user._id, {
                    $set: { otp: hashPassword}
                });
                 transporter.sendMail(sendResetPassMail(user, newPassword));
                return res
                    .status(200)
                    .json({
                        message: "Hemos enviado un correo electrónico. Por favor, consulte su bandeja de entrada",
                    });
            }else{
                return res
                    .status(404)
                    .json({
                        message: "Usuario no encontrado",
                    });
            }
	
		} catch (error: any) {
			console.log(error);
			res.status(500).json(error.message);
		}
	} else return res.status(405).json({ error: "Method Not Allowed" });
}

export default connectDb(handler);
