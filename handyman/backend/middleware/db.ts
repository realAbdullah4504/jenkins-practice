import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const connectDb =
  (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    try {
      mongoose.set('strictQuery', true);
      // mongoose.set('debug', true);
      // console.log(process.env.NEXT_MONGO_URL)
      await mongoose.connect(process.env.NEXT_MONGO_URL as string);
      console.log("connected")
      return handler(req, res);
    } catch (error) {
      console.log({error})
      throw new Error("Connection failed!");
    }
  };

export default connectDb;
