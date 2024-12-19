import { Document, Schema, model, models } from "mongoose";

// Define the interface for Plan
 export interface IPlan {
	name: string;
	price: number;
	duration_in_months: number;
	description: string;
}

interface IPlanDoc extends IPlan, Document {}
// Define the schema for Plan
const planSchema = new Schema<IPlanDoc>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	duration_in_months: { type: Number, required: true, min: 1, max: 12 },
	description: { type: String, required: true },
});

// Define and export the Plan model
const Plans =
	models.Plans ?? model<IPlanDoc,IPlan>("Plans", planSchema);

export default Plans;
