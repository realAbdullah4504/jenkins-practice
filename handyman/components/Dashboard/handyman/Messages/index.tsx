import useMessageRequests from "@/ApiRequests/message";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Messages from "../../components/Messages";
import { NotFoundData } from "../Orders";

export default function Index() {
	const { userData } = useAuth();
	const user = userData[0];
	const { GetCoversation } = useMessageRequests();
	const { data: conversations, isLoading, refetch } = GetCoversation("");

	useEffect(() => {
		// setIsLoading(false);
	}, [conversations]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="w-full">
			<section className="">
				<h1 className="font-bold lg:text-4xl text-xl text-Heading">
					Mantente Conectado:
					<span className="text-orange font-bold">
						Tu Centro de Mensajes
					</span>
				</h1>
			</section>
			<div className=" rounded-md  h-[18rem]  flex flex-col gap-5 ">
				{conversations?.length > 0 ? (
					conversations?.map((item: any) => {
						let sender = item?.participants?.find(
							(i: any) => i?._id !== user?._id
						);
						if (sender.role === "handyman") {
							sender = {
								...sender,
								name: sender.craftsman.company_name,
							};
						}

						const lastMessage =
							item?.messages[item?.messages?.length - 1];

						return (
							<Messages
								convId={item?._id}
								key={item?._id}
								lastMessage={lastMessage}
								sender={sender}
								message={item?.messages}
							/>
						);
					})
				) : (
					<NotFoundData text="No se encontraron mensajes" />
				)}
			</div>
		</div>
	);
}
