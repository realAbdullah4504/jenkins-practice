import useReviewsRequests from "@/ApiRequests/reviews";
import ModalStruc from "@/components/Common/ModalStruc";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import clientError from "@/helper/clientError";
import useScrollFetch from "@/hooks/useScrollFetchs";
import moment from "moment";
import Link from "next/link";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import JobDetails from "./jobsdetail";

const ReviewsSection = ({ item }: { item: any }) => {
	const [offerId, setOfferId] = useState("");
	const [isConfirmAccept, setIsConfirmAccept] = useState(false);
	const [isConfirmRejected, setIsConfirmRejected] = useState(false);
	const [rejectMessage, setRejectMessage] = useState("");
	const [isRejected, setIsRejected] = useState(false);
	const { UpdateReclaim } = useReviewsRequests();

	const handleError = clientError();
	const handleAction = (
		reclaimId: string,
		type: string,
		message: string = ""
	) => {
		try {
			const updateData = {
				decision: {
					type,
					message,
				},
				reclaimId,
			};
			UpdateReclaim.mutateAsync(
				{
					data: updateData,
					notifyUser: item?.review?.craftsman?.user,
				},
				{
					onSuccess(data) {
						toast.success("Reclamación actualizada exitosamente");
						setRejectMessage("");
						setIsConfirmAccept(false);
						setIsRejected(false);
						setIsConfirmRejected(false);
					},
				}
			);
		} catch (error) {
			handleError(error);
		} finally {
			setRejectMessage("");
			setIsConfirmAccept(false);
			setIsRejected(false);
			setIsConfirmRejected(false);
		}
	};
	return (
		<div className="w-full bg-white rounded-lg shadow my-4">
			<section className="flex items-center justify-between p-2">
				<div className="flex items-center gap-3">
					<Link
						className="globalbtn opacity-80"
						href={`/craftsman/${item.review.craftsman.company_name}`}>
						Ver Artesano
					</Link>
				</div>
				<div className="text-normal">
					<button
						onClick={() => setOfferId(item.review.offer)}
						className="globalbtn opacity-80">
						Ver Trabajo
					</button>
				</div>
				<div className="font-semibold">
					Revisado el: {moment(item.review?.createdAt).format("L")}
				</div>
			</section>

			<div className="flex md:justify-around md:items-center gap-16 px-7 pb-5 flex-col md:flex-row">
				<div className="flex flex-col justify-center items-center space-y-3">
					<span>{item.review.rating}.0 estrellas</span>
					<div className="flex">
						{Array.from({ length: 5 })
							.fill(0)
							.map((i, index) => (
								<span
									key={index}
									className={`text-3xl ${
										index < item.review.rating
											? "text-yellow-400"
											: "text-gray-400"
									} focus:outline-none`}>
									★
								</span>
							))}
					</div>
				</div>
				<p className="flex items-end justify-start flex-col font-medium text-gray-600 md:w-2/3 w-full">
					{item?.review?.comment}
				</p>
			</div>
			<hr />
			<div className="font-semibold p-2">
				<p className="">Razón de Reclamación: {item?.reason}</p>
				<p className="">
					Reclamado el: {moment(item?.createdAt).format("L")}
				</p>
				{item?.decision?.message && (
					<p className="">
						Razón de Rechazo:{" "}
						{item?.decision?.message ||
							"No se mencionó ninguna razón"}
					</p>
				)}
			</div>
			<div className="mb-4 flex justify-end p-2 gap-2">
				{item.decision.type === "pending" ? (
					<>
						<button
							onClick={() => setIsConfirmAccept(true)}
							className="bg-orange text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4">
							Aceptar
						</button>
						<button
							onClick={() => setIsRejected(true)}
							className="bg-orange text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4">
							Rechazar
						</button>
					</>
				) : (
					<button className="capitalize globalbtn opacity-50">
						{item.decision.type}
					</button>
				)}
			</div>

			{/* modales */}
			<ModalStruc
				isOpen={offerId ? true : false}
				closeModal={() => setOfferId("")}>
				<JobDetails offer_id={offerId} />
			</ModalStruc>

			<CustomConfirmPrompt
				promptText="¿Estás seguro de que quieres aceptar la reclamación?"
				isOpen={isConfirmAccept}
				onConfirm={() => handleAction(item?._id, "accepted")}
				onCancel={() => setIsConfirmAccept(false)}
				isLoading={UpdateReclaim.isPending}
			/>
			<ModalStruc
				isOpen={isRejected}
				closeModal={() => setIsRejected(false)}>
				<div>
					<h1 className="mb-2 font-semibold">Razón de Rechazo:</h1>
					<textarea
						className="mb-2 min-w-[200px] min-h-[100px] border border-black"
						onChange={(e) =>
							setRejectMessage(e.target.value)
						}></textarea>
					<button
						onClick={() => setIsConfirmRejected(true)}
						className="globalbtn block">
						Enviar
					</button>
					<CustomConfirmPrompt
						promptText="¿Estás seguro de que quieres rechazar la reclamación?"
						isOpen={isConfirmRejected}
						onConfirm={() =>
							handleAction(item?._id, "rejected", rejectMessage)
						}
						onCancel={() => setIsConfirmRejected(false)}
						isLoading={UpdateReclaim.isPending}
					/>
				</div>
			</ModalStruc>
		</div>
	);
};

export default function ReviewsFromClients() {
	const { GetReclaims } = useReviewsRequests();
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		GetReclaims({ pageSize: 10 }, {});
	useScrollFetch({ fetchNextPage, hasNextPage, isWindowScroll: true });

	return (
		<div className="my-2 w-full md:mx-32">
			<h1 className="text-3xl font-bold">
				<span className="text-orange">Voces de experiencia</span>{" "}
				Reseñas y Comentarios
			</h1>
			<div className="my-7 mx-5">
				{data?.pages.map((page: any, ind: number) => (
					<Fragment key={ind}>
						{page?.data.map((item: any) => (
							<ReviewsSection key={item._id} item={item} />
						))}
					</Fragment>
				))}
			</div>
		</div>
	);
}
