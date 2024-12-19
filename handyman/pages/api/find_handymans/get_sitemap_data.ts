import connectDb from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";
import { ServiceCards } from "@/constants/landingPage";
import { citySiteMaps } from "@/constants/SiteMapCities";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const postals = await PostalCode.find().select("Place_Name Postal_Code");
      //const result = getCityZipService(postals, ServiceCards);
      const result = postals;
      res.status(200).json(result);
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
connectDb(handler);

function getCityZipService(postalcodeArray: any, serviceArray: any) {
  let response: any[] = [];
  postalcodeArray.forEach((postalcode: any) => {
    serviceArray.forEach((service: any) => {
      response.push({
        city: postalcode.Place_Name,
        zipcode: postalcode.Postal_Code,
        service: service.slug,
      });
    });
  });

  return response;
}
