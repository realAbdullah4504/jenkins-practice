import useJobpostRequests from "@/ApiRequests/jobpost";
import Loader from "@/components/Loader";
import { statuses } from "@/constants/Dashboard/handyman";
import useScrollFetch from "@/hooks/useScrollFetchs";
import React from "react";
import { NotFoundData } from "../../handyman/Orders";
import StatusButton from "../../handyman/Orders/components/StatusButton";
import Orders from "./components/orders";

export default function Index() {

	const { GetUserJobPost } = useJobpostRequests();

	const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
		GetUserJobPost({ pageSize: 5 }, {});

	useScrollFetch({
		hasNextPage,
		fetchNextPage,
		isWindowScroll: true,
	});

	return (
		<div className={` my-12 w-full flex flex-col gap-4`}>
			<section className="my-8">
				<h1 className="font-bold text-4xl text-Heading mb-5">
					Tu viaje artesanal:{" "}
					<span className="text-orange font-bold">
						Descubre tu historial de trabajos{" "}
					</span>
				</h1>
				<div className="flex gap-3 justify-end my-3">
					{statuses?.slice(1, 4).map((status, idx) => (
						<StatusButton
							key={idx}
							showIcons={false}
							status={status}
						/>
					))}
				</div>{" "}
				<span className="text-[#3849E4] text-sm underline underline-offset-8 flex justify-end">
					Ver más
				</span>
			</section>
			{data?.pages[0]?.data?.length > 0 ? (
				data?.pages.map((page, pageIndex) => (
					<React.Fragment key={pageIndex}>
						{page?.data?.map((item: any) => (
							<div
								key={item._id}
								className="bg-white rounded-2xl shadow-md  ">
								<Orders item={item} />
							</div>
						))}
					</React.Fragment>
				))
			) : isFetching ? (
				<Loader />
			) : (
				<NotFoundData text="No se ha recibido ninguna oferta. Por favor, vuelve a comprobar más tarde" />
			)}
			{hasNextPage && isFetchingNextPage && (
				<div className="bg-white h-[40rem] rounded-md shadow-md">
					<Loader />
				</div>
			)}
		</div>
	);
}
