import { createError } from "@/backend/utils/errorHandler";
import getNotificationMessage, { N, generateLink } from "@/helper/getNotificationsMessage";
import OfferDb from "../../models/Offer";
import { createAndSaveNotification } from "../Notifications";

const createOffer = async ({
	userId,
	client,
	job,
	price,
	expires_in = "2024-12-31T23:59:59.999Z",
	handymanName,
	objId
}: any) => {
	price = Number(price);

	try {
		// Create a new offer instance
		const offer = await OfferDb.findOne({
			$and: [
				{ craftman: userId },
				{ job },
				{ status: { $ne: "withdrawn" } },
			],
		});

		offer &&
			createError("Craftsman no puede enviar múltiples ofertas para un trabajo", 400);

		// Create a new offer instance
		const newOffer = new OfferDb({
			craftman: userId,
			client,
			job,
			price,
			expires_in,
			status: "pending",
		});

		// Save the offer to the database
		await newOffer.save();

		// Generate and send notification for the handyman
		const handymanNotification = getNotificationMessage({
			identifier: N.NewOffer,
			fromHandyman: true,
		});
		const handymanLink = generateLink("handyman", "orders", newOffer._id);

		await createAndSaveNotification({
			contentText: handymanNotification,
			link: handymanLink,
			senderName: 'customerName',
			userId: objId
		});

		// Generate and send notification for the client
		const clientNotification = getNotificationMessage({
			identifier: N.NewOffer,
			handymanName,
		});
		const clientLink = generateLink("client", "offers", newOffer._id);

		await createAndSaveNotification({
			contentText: clientNotification,
			userId: client,
			link: clientLink,
			senderName: handymanName,
		});

		// Return the created offer document
		return newOffer;
	} catch (error) {
		console.error("Error de creación de ofertas:", error);
		throw error;
	}
};

export default createOffer;
