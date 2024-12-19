import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { useEffect } from "react";
import Messages from "../../components/Messages";
import { NotFoundData } from "../../handyman/Orders";

export default function Index() {
	const { conversations, isLoading, refetch } = useChatContext();
	const { userData } = useAuth();
	const user = userData[0];

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return <Loader />;
	}
	return (
		<div className={`w-full  my-12`}>
			<section className="  my-8">
				<h1 className="font-bold text-4xl text-Heading">
					Comuníquese fácilmente:
					<span className="text-orange font-bold">
						Su Centro de Mensajes
					</span>
				</h1>
			</section>
			<div className="rounded-md h-[18rem] flex flex-col gap-5">
				{conversations && conversations.length > 0 ? (
					conversations?.map((item: any) => {
						let sender = item.participants.find(
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
								convId={item._id}
								key={item._id}
								lastMessage={lastMessage}
								sender={sender}
								message={item.messages}
							/>
						);
					})
				) : (
					<NotFoundData text="No se encontraron mensajes aún" />
				)}
			</div>
		</div>
	);
}
