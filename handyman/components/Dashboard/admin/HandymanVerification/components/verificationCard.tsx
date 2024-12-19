import useUserRequests from "@/ApiRequests/user";
import ModalStruc from "@/components/Common/ModalStruc";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import useChat from "@/hooks/useChat";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeclineReason from "./declineReason";
import OpenDocs from "./openDocs";

export default function VerificationCard({
	name,
	time,
	message,
	documents,
	user,
	status,
	isViewing
}: {
	name: string;
	time: string;
	message: string;
	documents: any;
	user: string;
	status: string;
	isViewing?: boolean;
}) {
	const maxLength = 30;
	const { userData } = useAuth();
	const loggedUser = userData[0];
	const [expanded, setExpanded] = useState(false);
	const [replyVisible, setReplyVisible] = useState(false);
	const [isCustomMessage, setIsCustomMessage] = useState(false);
	const toggleAccordion = () => {
		setExpanded(!expanded);
	};

	const toggleReplySection = () => {
		setReplyVisible(!replyVisible);
	};

	const [isOpenDoc, setIsOpenDoc] = useState(false);
	const [isDecline, setIsDecline] = useState(false);
	const [reason, setReason] = useState("");
	const handleOpen = () => setIsOpenDoc(!isOpenDoc);

	const handleError = clientError();
	const { UpdateCraftman } = useUserRequests();
	const handleUpdate = async (status: string, reason: string = "") => {
		try {
			if (status === "declined" && reason === "") {
				return setIsDecline(true);
			}
			await UpdateCraftman.mutateAsync(
				{ status, user, message: reason },
				{
					onSuccess(data) {
						toast.success(
							status === "verified" ? "Aceptado" : "Rechazado"
						);
						setIsDecline(false);
					},
				}
			);
		} catch (error) {
			handleError(error);
		}
	};

	// Función para manejar el envío de mensajes
	const { createCoversation, inputMessage, setInputMessage, isCreatingConv } =
		useChat();
	const handleMessageSent = async (e: any) => {
		e.preventDefault();
		createCoversation(user);
	};
	useEffect(() => {
		!isCreatingConv && setIsCustomMessage(false);
	}, [isCreatingConv]);

	const router = useRouter();
	const handleView = () => {
		router.push(`/dashboard/admin/handymanverification/${name}`);
	};

	return (
		<div className="px-10 py-5 bg-white w-full border border-gray-300 rounded-lg">
			<div className="accordion">
				<div className="accordion-item">
					<div className="accordion-header w-full flex justify-between items-center gap-20">
						<h1 className="font-bold text-2xl text-orange font-bold">
							{name}
						</h1>
						<div className="flex items-center space-x-4">
							<button
								onClick={() => setIsCustomMessage(true)}
								className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md text-sm">
								Mensaje Personalizado
							</button>

							{!isViewing && (
								<button
									onClick={handleView}
									disabled={documents?.length === 0}
									className={`px-2 py-1 text-white ${
										documents?.length === 0
											? "bg-red-500"
											: "bg-green-500"
									} hover:bg-green-600 rounded-md text-sm`}>
									{documents?.length !== 0
										? "Ver"
										: "Sin Documentos"}
								</button>
							)}

							{status !== "verified" && (
								<button
									onClick={() => handleUpdate("verified")}
									className="px-2 py-1 text-white bg-green-500 hover:bg-green-600 rounded-md text-sm">
									Aceptar
								</button>
							)}

							{status !== "declined" && (
								<button
									onClick={() => handleUpdate("declined")}
									className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm">
									Rechazar
								</button>
							)}
						</div>
						<span>{moment(time || new Date()).fromNow()}</span>
					</div>
				</div>
			</div>
			<div></div>

			<OpenDocs
				isOpen={isOpenDoc}
				onClose={handleOpen}
				documentUrls={documents}
				userId={user}
			/>

			<DeclineReason
				isOpen={isDecline}
				onClose={() => setIsDecline(false)}
				handleUpdate={handleUpdate}
				isPending={UpdateCraftman.isPending}
			/>

			{/* enviar mensaje */}
			<ModalStruc
				isOpen={isCustomMessage}
				closeModal={() => setIsCustomMessage(false)}>
				<form className="flex flex-col" onSubmit={handleMessageSent}>
					<textarea
						onChange={(e) => setInputMessage(e.target.value)}
						value={inputMessage}
						className="w-[20rem] h-[10rem] border border-1 border-gray-500 rounded p-2"
						placeholder="Introduce tu mensaje aquí.."></textarea>
					<button
						type="submit"
						disabled={isCreatingConv}
						className="globalbtn disabled:opacity-50 mt-2">
						Enviar
					</button>
				</form>
			</ModalStruc>
		</div>
	);
}
