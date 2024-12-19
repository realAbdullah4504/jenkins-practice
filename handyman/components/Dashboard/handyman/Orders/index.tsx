import useOfferRequests from "@/ApiRequests/offer";
import { Context } from "@/components/Common/DashboardLayout";
import Loader from "@/components/Loader";
import { statuses } from "@/constants/Dashboard/handyman";
import { nodataImg } from "@/helper/clientError";
import useScrollFetch from "@/hooks/useScrollFetchs";
import Image from "next/image";
import React, { useContext } from "react";
import Orders from "./components/Orders";
import StatusButton from "./components/StatusButton";

export const NotFoundData = ({ text }: { text: string }) => {
	return (
		<div className="flex flex-col items-center mt-20 justify-center gap-10">
			<h2 className="text-2xl text-red-500">{text}</h2>
			<Image src={nodataImg} alt="no_data" width={100} />
		</div>
	);
};

export default function Index() {
	const { toggleSideBar } = useContext(Context);
	const { GetJobOffer } = useOfferRequests();

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
		GetJobOffer({ pageSize: 5 }, {});

	useScrollFetch({
		hasNextPage,
		fetchNextPage,
		isWindowScroll: true,
	});

	return (
		<>
			<section className="flex flex-col gap-5">
				<h1 className="font-bold lg:text-4xl text-xl text-Heading">
					Tu viaje artesanal:{" "}
					<span className="text-orange font-bold">
						Descubre tu historial de trabajos{" "}
					</span>
				</h1>
				<div className="flex gap-3 justify-end my-4">
					{statuses?.slice(1, 6)?.map((status, idx) => (
						<StatusButton
							showIcons={false}
							key={idx}
							status={status}
						/>
					))}
				</div>
			</section>

			{data?.pages[0]?.data?.length > 0 ? (
				data?.pages.map((page, pageIndex) => (
					<React.Fragment key={pageIndex}>
						{page?.data?.map((item: any) => (
							<div
								key={item._id}
								className="bg-white rounded-2xl shadow-md mb-4 w-full min-h-[16rem]">
								<Orders
									key={item._id}
									status={item.status}
									listingId={item?.job?.listingId}
									isNew={item?.isNew}
									title={
										item?.job?.serviceTitle
											?.service_title ||
										item?.job?.serviceTitle?.other_title
									}
									jobDescription={
										item?.job?.additional_job_description
									}
									price={item?.price}
									postedOn={item?.createdAt || ""}
									jobId={item?.job?._id || ""}
									offerId={item?._id || ""}
									clientId={item?.client?._id || ""}
								/>
							</div>
						))}
					</React.Fragment>
				))
			) : isFetching ? (
				<Loader />
			) : (
				<NotFoundData text="No hay historial de trabajos. Por favor, revisa más tarde." />
			)}

			{hasNextPage && isFetchingNextPage && (
				<div className="bg-white h-[40rem] rounded-md shadow-md">
					<Loader />
				</div>
			)}
		</>
	);
}
