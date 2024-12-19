import useOfferRequests from "@/ApiRequests/offer";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import clientError from "@/helper/clientError";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import StatusButton from "./StatusButton";
import FeedbackPopup from "./feedback";
import { statusMap } from "@/constants/Dashboard/handyman";
interface OrderItem {
	title: string;
	clientId: string;
	price: string;
	postedOn: Date;
	isNew: boolean;
	status: string;
	jobDescription: string;
	listingId: number;
	offerId: string;
	jobId: string;
}
export default function Orders({
	title,
	jobDescription,
	price,
	postedOn,
	isNew,
	status,
	listingId,
	offerId,
	jobId,
	clientId,
}: OrderItem) {
	const time = moment(postedOn).format("LT");
	const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
	const [isOfferWithdraw, setIsOfferWithdraw] = useState(false);
	const { UpdateJobOffer } = useOfferRequests();
	const clientQuery = useQueryClient();
	const translatedStatus=statusMap[status as keyof typeof statusMap]
	const openPopup = () => {
		setPopupOpen(true);
	};
	const handleClientError = clientError();
	const closePopup = () => {
		setPopupOpen(false);
	};
	const handleWithdraw = async () => {
		try {
			await UpdateJobOffer.mutateAsync(
				{
					notifyUser: clientId,
					offerId,
					jobId,
					data: { status: "withdrawn" },
				},
				{
					onSuccess(data) {
						toast.success("Oferta retirada con éxito");
						setIsOfferWithdraw(false);
					},
				}
			);
		} catch (error) {
			handleClientError(error);
		}
	};

	return (
		<>
			<div className="w-full py-5 px-3">
				<section className="flex flex-col md:flex-row justify-between items-center">
					<div className="w-full md:w-2/6 text-xl font-semibold flex flex-col">
						<h1 className="text-xl font-semibold flex gap-3 items-center">
							{moment(postedOn, "DD-MM-YYYY").format("D/MMM")}
							{isNew && (
								<span className="text-[#67B554]">
									nueva <span className="text-5xl">.</span>
								</span>
							)}
						</h1>
						<span className="font-normal">{time}</span>
					</div>

					<div className="w-full md:w-3/5 flex flex-col md:flex-row justify-between items-center mt-3 md:mt-0">
						<div className="text-normal md:w-2/3 md:text-left">
							{title}
						</div>
						<div className="font-bold md:w-1/3 md:text-right">{`Listing ID: ${listingId}`}</div>
						<div className="flex items-center gap-3 mt-3 md:mt-0 md:w-1/3 md:justify-end">
							{status === "pending" && (
								<button
									onClick={() => setIsOfferWithdraw(true)}
									className="bg-orange px-2 py-1 rounded">
									Oferta de retiro
								</button>
							)}
							<StatusButton
								showIcons={status === "accepted" ? false : true}
								status={translatedStatus}
							/>
						</div>
					</div>
				</section>
				<section className="my-3">{jobDescription}</section>
				<span className="text-xl md:text-3xl font-normal mt-3 block md:float-right">
					${price}
				</span>
			</div>
			<FeedbackPopup isOpen={isPopupOpen} onClose={closePopup} />
			<CustomConfirmPrompt
				isOpen={isOfferWithdraw}
				onConfirm={handleWithdraw}
				onCancel={function (): void {
					setIsOfferWithdraw(false);
				}}
				promptText="¿Estás segura de querer retirar esta oferta?"
				isLoading={UpdateJobOffer.isPending}
			/>
		</>
	);
}
