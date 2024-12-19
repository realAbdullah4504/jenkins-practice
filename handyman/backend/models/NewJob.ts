import mongoose, { Document, Model } from "mongoose";

// Define the schema for the JobPost document
const jobPostSchema = new mongoose.Schema(
  {
    category: { type: String },
    listingId: { type: Number },
    userId: { type: String },
    status: {
      type: String,
      default: "open",
      enum: ["open", "close", "pending", "accepted"],
    },
    additional_details: {
      how_many_floors: { type: String },
      how_many_rooms: { type: String },
      square_meters: { type: String },
    },
    additional_job_description: { type: String },
    images: [String],
    contactDetails: {
      email: { type: String },
      name: { type: String },
      phone: { type: String },
    },

    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" },
      place_name: { type: String, required: true },
      zip_code: { type: Number, required: true },
    },
    serviceTitle: {
      other_title: { type: String },
      service_title: { type: String },
      square_meters: { type: String },
    },
    working_schedule: {
      type: String,
      default: "flexible",
      enum: ["flexible", "rápidamente", "en_una_semana", "en_3_meses"],
    },
  },
  { timestamps: true }
);

// Define the interface for the JobPost document
interface IJobPost extends Document {
  category: string;
  listingId: number;
  userId: string;
  status: string;
  additional_details: {
    how_many_floors: string;
    how_many_rooms: string;
    square_meters: string;
  };
  additional_job_description: string;
  contactDetails: {
    email: string;
    name: string;
    phone: string;
  };

  location: {
    type: string;
    coordinates: { type: string; coordinates: number[] };
    zip_code: number;
    place_name: string;
  };
  images: string[];
  serviceTitle: {
    other_title: string;
    service_title: string;
    square_meters: string;
  };
  working_schedule: string;
  createdAt: Date;
  updatedAt: Date;
}

// jobPostSchema.index({ location: "2dsphere" });
// Define the model type for the JobPost model
type JobPostModel = Model<IJobPost>;

const JobPost =
  mongoose.models.JobPost ??
  mongoose.model<IJobPost, JobPostModel>("JobPost", jobPostSchema);
export default JobPost;
