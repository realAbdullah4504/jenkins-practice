// Define enum for notification identifiers
export enum N {
	NewReview = "newReview",
	NewOffer = "newOffer",
	DeactivatedReview = "deactivatedReview",
	ChangedReview = "changedReview",
	OfferWithdrawalConfirmation = "offerWithdrawalConfirmation",
	OfferAcceptance = "offerAcceptance",
	OfferRejection = "offerRejection",
	MessageFromHandyman = "messageFromHandyman",
	OfferWithdrawalByHandyman = "offerWithdrawalByHandyman",
	SuccessfulOfferRejection = "successfulOfferRejection",
}

// Define interface for notification message parameters
interface NotificationParams {
	identifier: N;
	fromHandyman?: boolean;
	handymanName?: string;
	customerName?: string;
}

// Function to get notification message
export default function getNotificationMessage(
	params: NotificationParams
): string {
	const {
		identifier,
		handymanName,
		fromHandyman = false,
		customerName = "",
	} = params;

	let message: string = "";

	if (fromHandyman) {
		switch (identifier) {
			case N.NewReview:
				message = `Ha recibido una nueva reseña de ${customerName}.`;
				break;
			case N.NewOffer:
				message = `Ha enviado con éxito una oferta a ${customerName}.`;
				break;
			case N.DeactivatedReview:
				message = `${customerName} ha desactivado la revisión de este trabajo.`;
				break;
			case N.ChangedReview:
				message = `${customerName} ha cambiado la revisión de este trabajo.`;
				break;
			case N.OfferWithdrawalConfirmation:
				message =
					"Ha retirado con éxito su oferta para el trabajo.";
				break;
			case N.OfferAcceptance:
				message =
					"Su oferta para el trabajo ha sido aceptada por el cliente.";
				break;
			case N.OfferRejection:
				message =
					"Su oferta para el trabajo ha sido rechazada por el cliente.";
				break;
			default:
				message = "Notificación desconocida.";
		}
	} else {
		switch (identifier) {
			case N.NewOffer:
				message = `Nueva oferta de ${handymanName} recibió.Verifique el estado en la sección de ofertas.`;
				break;
			case N.DeactivatedReview:
				message = "Su revisión ha sido desactivada con éxito.";
				break;
			case N.MessageFromHandyman:
				message = `Ha recibido un nuevo mensaje de ${handymanName}.Verifique su bandeja de entrada para ver el mensaje.`;
				break;
			case N.OfferWithdrawalByHandyman:
				message = `${handymanName} ha retirado su oferta por el trabajo.`;
				break;
			case N.SuccessfulOfferRejection:
				message =
					"Has rechazado con éxito la oferta para el trabajo.";
				break;
			default:
				message = "Notificación desconocida.";
		}
	}

	return message;
}

export const generateLink = (role: string, path: string, id: string) =>
	`/dashboard/${role}/${path}/#${id}`;
