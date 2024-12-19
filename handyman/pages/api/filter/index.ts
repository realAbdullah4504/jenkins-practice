// Import necessary modules
import { getFilter, updateFilter } from "@/backend/controllers/Filter";
import { getJobAlerts, updateJobAlert } from "@/backend/controllers/JobAlert";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let token = verifyToken(req, res);
    if (!token) return;
    switch (req.method) {
        case "GET":
            await getFilter(req, res, token);
            break;
        case "PUT":
            await updateFilter(req, res, token);
            break;

        default:
            res.status(405).json({ error: "Method Not Allowed" });
            break;
    }
}
