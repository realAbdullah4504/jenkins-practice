import JobPost from "@/backend/models/NewJob";
import { createError } from "@/backend/utils/errorHandler";

const updateJobPost = async (id: any, data: any, token: any) => {
	try {
		if (!id) {
			createError("Object id is undefined", 400);
		}
		const findCiteria = {
			$and: [
				{ _id: id }, // Match the document with the specified _id
				{ userId: token._id }, // Match the document with the specified userId
			],
		};

		const updates = { $set: data };
		const updateJob = await JobPost.findOneAndUpdate(findCiteria, updates, {
			new: true,
		});
		if (updateJob) {
			return updateJob;
		} else createError("trabajo no encontrado", 404);
	} catch (error) {
		throw error;
	}
};

export { updateJobPost };

