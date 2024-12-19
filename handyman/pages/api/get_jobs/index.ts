import connectDb from "@/backend/middleware/db";
import JobPost from "@/backend/models/NewJob";
import userDb from "@/backend/models/userModel";
import Craftsman from "@/backend/models/CrafstmanModel";
import {
  checkRequiredQueryParam,
  errorResponse,
} from "@/backend/utils/errorHandler";
import getDistanceAggrQuery from "@/helper/aggregateDistanceQuery";
import { getPaginatedData } from "@/helper/getPaginatedData";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import PostalCode from "@/backend/models/PostalCode";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      try {
        // Extract necessary query parameters from the request
        const { pageNumber, pageSize } = checkRequiredQueryParam(req); // Extract pagination parameters
        const sortedQuery = req.query?.categories as string; // Extract categories query parameter
        const Place_Name = req.query?.Place_Name; // Extract postal code query parameter
        const longitude = req.query?.Longitude; // Extract postal code query parameter
        const distance: any = req.query?.distance; // Extract distance query parameter, default to 0 if not provided
        const authHeader = req.headers?.authorization; // Extract authorization header

        // Extract token from authorization header
        const token = authHeader?.split(" ")[1];

        // Decode token to get user information
        const authUser = jwt.decode(token as string) as JwtPayload;

        let query: any = { status: "open" }; // Initialize query object with default status filter

        // If categories are provided, add category filter to the query
        if (sortedQuery) {
          const categories = sortedQuery.split(",").filter((i) => i !== "");
          if (categories.length > 0) {
            query.category = { $in: categories };
          }
        }

        // If distance is provided, add distance filter to the query
        if (distance && !isNaN(Number(distance))) {
          query = { ...query, distance: { $lte: Number(distance) } };
        }
        if (Place_Name) {
          query = {
            ...query,
            "location.place_name": Place_Name,
          };
        }

        // Count total documents that match the query
        const totalDocument = await JobPost.countDocuments(query);

        // Calculate pagination metadata
        const {
          hasToContinue,
          adjustedPageSize,
          emptyResponse,
          totalPages,
          currentPage,
        } = getPaginatedData(totalDocument, pageSize, pageNumber);

        // If no documents to return, send empty response
        if (!hasToContinue) {
          return res.status(200).json(emptyResponse);
        }

        // Define aggregation pipeline for querying job posts
        let aggreationPipeline: any = [
          { $match: query }, // Match documents based on the query conditions
          { $sort: { createdAt: -1 } }, // Sort documents by createdAt field in descending order
          { $skip: (pageNumber - 1) * pageSize }, // Skip documents based on pagination parameters
          { $limit: adjustedPageSize }, // Limit the number of documents returned
        ];

        // Populate user's address information if available
        const user = authUser?._id
          ? await userDb
              .findOne({ _id: authUser?._id })
              .populate({ path: "address", model: PostalCode })
          : null;

        if (user) {
          // If user exists, add geoNear stage to calculate distance from user's location

          // Combine distance calculation stage with existing aggregation pipeline
          aggreationPipeline = [
            ...getDistanceAggrQuery(
              user.address.Longitude,
              user.address.Latitude
            ),
            ...aggreationPipeline,
          ];
        }
        // console.log(aggreationPipeline);
        // Execute aggregation pipeline to fetch job posts
        let jobPosts = await JobPost.aggregate(aggreationPipeline).exec();

        // Send response with fetched job data and pagination metadata
        res.status(200).json({
          message: "Datos de trabajo público recuperados",
          data: jobPosts,
          totalPages,
          currentPage,
        });
      } catch (error: any) {
        // Handle errors that occur during the process
        errorResponse(res, error);
      }
    }

    if (req.method === "POST") {
      const payload = req.body;
      const sortedData = payload.sortedData;
      const jobPostOrder = payload.jobPostOrder;
      const service = payload.service;
      const status = payload.status;
      const jobId = payload.jobId;
      const newTitle = payload.newTitle;
      const newParagraph = payload.newParagraph;

      // console.log(service, sortedData, jobPostOrder, "service data");
      // console.log(newParagraph, newTitle, " =>> payload of jobs");

      // for single cat based sorting
      if (sortedData === undefined) {
        const allJobData = await JobPost.find().sort({
          created_at: -1,
        });

        const filteredData = allJobData.filter((data: any) =>
          data.category.includes(service)
        );

        res.status(200).json({ data: filteredData });
      } else {
        // for multiple cat based sorting
        // sorted by order
        if (
          jobPostOrder === "Sort by newest or older order" ||
          jobPostOrder === "Sort by New order"
        ) {
          const allJobData = await JobPost.find().sort({
            created_at: -1,
          });

          if (sortedData.length === 0) {
            res.status(200).json({ data: allJobData });
          }

          const filteredData = allJobData.filter((data: any) =>
            sortedData.some((category: string) =>
              data.category.includes(category)
            )
          );

          // console.log(filteredData, "filtered data");
          // console.log(jobPostOrder, "jobPostOrder data");

          res.status(200).json({ data: filteredData });
        } else {
          // if order by old data
          const allJobData = await JobPost.find({}).sort({
            created_at: 1,
          });

          if (sortedData.length === 0) {
            res.status(200).json({ data: allJobData });
          }

          const filteredData = allJobData.filter((data: any) =>
            sortedData.some((category: string) =>
              data.category.includes(category)
            )
          );

          // console.log(filteredData, "filtered data");
          // console.log(jobPostOrder, "jobPostOrder data");

          res.status(200).json({ data: filteredData });
        }
      }

      // status logic
      // param @ open, close, accepted
      if (status) {
        const findCriteria = {
          _id: new mongoose.Types.ObjectId(jobId),
        };
        const jobDetails = await JobPost.findById(findCriteria).updateOne({
          $set: { status: status },
        });
        // operation ends
      }

      //edited job data saving logic
      // param @newTitle @newParagraph
      if (newTitle || newParagraph) {
        const findCriteria = {
          _id: new mongoose.Types.ObjectId(jobId),
        };
        const updateCriteria = {
          serviceTitle: {
            service_title: newTitle,
          },
          additional_job_description: newParagraph,
        };

        const updatedJob = await JobPost.findById(findCriteria).updateOne({
          $set: updateCriteria,
        });
        // operation ends
      }
    }

    if (!["POST", "GET"].includes(req.method as string)) {
      res.status(404).json({ message: "Invalid request method" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get data" });
  }
};

export default connectDb(handler);
