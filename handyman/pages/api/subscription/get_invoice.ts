// import html2pdf from 'html2pdf.js';
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import generatePDFPayReceipt from "@/helper/invoicTemplate";
import { NextApiRequest, NextApiResponse } from "next/types";
export const companyDetails: any = {
	logo: null, // URL to logo if available
	name: "handyman",
	owner: "Owner Name",
	address: "Company's Address",
	cityStateZip: "City, State Zip",
	country: "France",
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			verifyToken(req, res);
			const { client, subscription }: any = req.body;
			// console.log(subscription)
			if (!client?._id && !subscription) {
				createError("Required params are missing", 400);
			}
			const pdfBuffer = generatePDFPayReceipt({
				client,
				subscription,
			});
		

			const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

			// Set response headers
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader(
			  'Content-Disposition',
			  `attachment; filename=invoice${Date.now()}.pdf`
			);
	  
			// Send the Blob as response
			pdfBlob.arrayBuffer().then(arrayBuffer => {
				res.end(Buffer.from(arrayBuffer));
			});
	  
			// Return the response status
			return res.status(200);
		} catch (error: any) {
			errorResponse(res, error);
		}
	} else {
		res.status(405).end(); // Method Not Allowed
	}
}
