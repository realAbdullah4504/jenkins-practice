import connectDb from "@/backend/middleware/db"; // Importing the database connection middleware
import JobPost from "@/backend/models/NewJob"; // Importing the JobPost model
import OfferDb from "@/backend/models/Offer"; // Importing the OfferDb model
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler"; // Importing error handling utilities
import getDistanceAggrQuery from "@/helper/aggregateDistanceQuery";
import jwt, { JwtPayload } from "jsonwebtoken"; // Importing JWT for token decoding
import mongoose from "mongoose"; // Importing Mongoose for MongoDB operations
import { NextApiRequest, NextApiResponse } from "next"; // Importing Next.js types for request and response handling

// Defining the API handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const id = req.query.id; // Extracting the 'id' parameter from the request query

	// Handling GET requests
	if (req.method === "GET") {
		try {
			const authHeader = req.headers?.authorization; // Extracting the authorization header from the request

			const token = authHeader?.split(" ")[1]; // Extracting the token from the authorization header
			const user = jwt.decode(token as string) as JwtPayload; // Decoding the JWT token to get user information
			let findCriteria: any = {
				// Criteria to find the job
				_id: new mongoose.Types.ObjectId(id as string), // Finding job by its ID
				status: "open",
			};
			
			if (user.role === "admin") {
				delete findCriteria.status;
			}

			const userData = await userDb
				.findOne({ _id: user?._id })
				.populate({path:"address",model:PostalCode});

			const distanceArg = userData
			? getDistanceAggrQuery(
				userData.address.Longitude ?? 0,
				userData.address.Latitude ?? 0
			)
		  : [];

			// Finding the job based on the criteria
			const aggregationQuery = [
				...distanceArg,
				{ $match: findCriteria },
				{ $limit: 1 },
			];
			const jobData = await JobPost.aggregate(aggregationQuery);

			// If job data is not found, throw an error
			jobData.length === 0 &&
				createError("Este trabajo ya no está disponible públicamente", 404);

			let singleJobData = jobData[0];
			// Checking if the user role is 'handyman'
			if (user?.role === "handyman") {
				// If user is a 'handyman', check if they have made an offer for this job
				const offers = await OfferDb.findOne({
					$and: [
						{ craftman: user.craftsman }, // Checking offers made by the craftsman
						{ job: singleJobData._id }, // Matching the job ID
						{ status: { $ne: "withdrawn" } }, // Excluding withdrawn offers
					],
				});

				if (offers) {
					// If an offer exists, update jobData with offer details
					singleJobData = {
						...singleJobData,
						is_offer_sent: true,
						offerId: offers._id,
						price: offers.price,
					};
				}
			}

			// Sending the job data in the response
			res.status(200).json({
				data: singleJobData,
				status: 200,
				succeed: 1,
			});
		} catch (error: any) {
			// Handling errors
			errorResponse(res, error);
		}
	}

	// Handling requests other than GET method
	if (!["GET"].includes(req.method as string)) {
		// Sending a 404 response for invalid request methods
		res.status(404).json({
			message: "Invalid request method",
			succeed: 0,
		});
	}
};

export default connectDb(handler); // Exporting the handler function after connecting to the database
