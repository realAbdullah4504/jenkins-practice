import JobPost from "@/backend/models/NewJob";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { generateRandomPassword } from "@/helper/generateRandomPassword";
import getIpAddress from "@/helper/getIpAddress";
import { transporter } from "@/helper/mailTransporter";
import { sendMailSailerOption } from "@/helper/sendConfirmationEmailConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../user/createUser";
import User from "../user/interface";
const createJob = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { newData } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const ipAddress = getIpAddress(req);
    const { contactDetails } = newData;
    const { name, phone, email, password: passwd, address } = contactDetails;

    if (!name || !phone || !email) {
      // Validate required fields
      return res
        .status(404)
        .json({ message: "Nombre, teléfono, correo electrónico es necesario" });
    }

    // Generate a unique listingId
    const listingId = Math.round(Math.random() * 10000000);
    // If user doesn't exist, create a new user
    // Generate a random password for the user
    const password = generateRandomPassword(12);
    const salt = 10;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    // Check if user with the given email already exists
    let userData = await userDb.findOne({ email });
    // Create a new job post functions
    const createJob = async (userData: any) => {
      const location = await PostalCode.findById(userData.address);
      if (!location) return createError("Se requiere ubicación", 400);
      const newJobData = {
        ...newData,
        listingId,
        location: {
          place_name: location.Place_Name,
          zip_code: location.Postal_Code,
          type: "Point",
          coordinates: [location.Longitude, location.Latitude],
        },
        userId: userData._id,
        status: userData.status ? "open" : "pending",
      };
      return await new JobPost(newJobData).save();
    };

    // if logged in user
    if (token) {
      const getRes = async (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: "Token inválido" });
        }
        if (userData.role !== "client") {
          return res.status(401).json({
            info: "Solo las clientas pueden publicar trabajos",
            success: 0,
            status: 401,
          });
        }

        const newJob = await createJob(userData);
        return res.status(201).json({
          newJob,
          success: 1,
          status: 201,
          info: "Puesto de trabajo exitosa",
        });
      };

      jwt.verify(
        token as string,
        process.env.ACCESS_TOKEN_SECRET as string,
        getRes
      );
      return;
    }

    if (!userData) {
      const userObj: User = {
        name,
        phone,
        email,
        address,
        accessToken: "",
        refreshToken: "",
        role: "client",
        lastName: "",
        password: "",
        otp: hashedPassword,
        ip: ipAddress as string,
      };

      // Save the new user
      userData = await createUser(userObj);
      transporter.sendMail(sendMailSailerOption(email, password));

      createJob(userData);

      return res.status(200).json({
        info: "Hemos enviado un correo electrónico.Verifique su cuenta",
        success: 1,
        status: 200,
        // user_details: userData,
      });
    }

    // ****************** If user already exsit but not logged in***************

    if (!userData.status) {
      await userDb.findByIdAndUpdate(userData._id, {
        $set: { otp: hashedPassword },
      });
      await transporter.sendMail(sendMailSailerOption(email, password));
      return res.status(200).json({
        info: "Hemos enviado un correo electrónico. Verifique su cuenta primero",
        success: 1,
        status: 200,
      });
    }

    if (passwd && userData) {
      const isMatched = await bcrypt.compare(passwd, userData.password);

      if (isMatched) {
        if (userData.role === "client") {
          createJob(userData);
          // Generate access and refresh tokens for the new user
          const accessToken = jwt.sign(
            { _id: userData._id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "365d" }
          );

          const refreshToken = jwt.sign(
            { _id: userData._id },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "365d" }
          );

          // Update the user with the generated tokens
          await userDb.findByIdAndUpdate(userData._id, {
            accessToken,
            refreshToken,
            role: "client",
          });

          return res.status(200).json({
            info: "Puesto de trabajo exitosa",
            success: 1,
            status: 200,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            user_details: userData,
          });
        }
        return res.status(401).json({
          info: "Solo las clientas pueden publicar trabajos",
          success: 0,
          status: 401,
        });
      }
      return res.status(401).json({
        info: "Contraseña no válida!Inicie sesión con contraseña válida",
        success: 0,
        status: 401,
      });
    }
  } catch (error: any) {
    errorResponse(res, error);
  }
};
export default createJob;
