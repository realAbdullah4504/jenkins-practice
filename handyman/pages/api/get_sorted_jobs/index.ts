import connectDb from "@/backend/middleware/db";
import JobPost from "@/backend/models/NewJob";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const payload = req.body;
      const sortedData = payload.data;

      const allJobData = await JobPost.find({status:'inactive'}).sort({ created_at: -1 });

      if (sortedData.length === 0) {
        res.status(200).json({ data: allJobData });
      }

      const filteredData = allJobData.filter((data: any) =>
        sortedData.some((category: string) => data.category.includes(category))
      );

      // console.log(filteredData, "filtered data");
      // console.log(sortedData, "sorted data");

      res.status(200).json({ data: filteredData });
    } else {
      res.status(404).json({ message: "Invalid request method" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No se pudo obtener datos" });
  }
};

export default connectDb(handler);
