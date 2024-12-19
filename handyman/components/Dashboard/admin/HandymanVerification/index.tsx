import useUserRequests from "@/ApiRequests/user";
import Loader from "@/components/Loader";
import useScrollFetch from "@/hooks/useScrollFetchs";
import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { NotFoundData } from "../../handyman/Orders";
import VerificationCard from "./components/verificationCard";

export default function Index() {
	const { GetHandymans } = useUserRequests();
	const [status, setStatus] = useState("unverified");
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = GetHandymans({ pageSize: 10 }, { status: status });
	useScrollFetch({ fetchNextPage, hasNextPage, isWindowScroll: true });
	useEffect(() => {
		refetch();
	}, [status, refetch]);
	return (
		<div className={"w-full"}>
			<section className="my-8">
				<h1 className="font-bold text-4xl text-Heading">
					Verificación de Manitas para Administradores:
					<span className="text-orange font-bold">
						Aprobación y Validación de Nuevas Inscripciones
					</span>
				</h1>
			</section>
			<Tabs>
				<TabList>
					<Tab onClick={() => setStatus("unverified")}>Pendientes</Tab>
					<Tab onClick={() => setStatus("declined")}>Rechazados</Tab>
					<Tab onClick={() => setStatus("verified")}>Verificados</Tab>
				</TabList>

				{[1, 2, 3].map((i) => (
					<TabPanel key={i}>
						<div className="rounded-md h-[18rem] flex flex-col gap-5 ">
							{isLoading || isRefetching ? (
								<Loader />
							) : data?.pages[0]?.data?.length ? (
								data?.pages.map((page: any, index: number) => (
									<React.Fragment key={index}>
										{page?.data?.map((item: any) => (
											<VerificationCard
												key={item?._id}
												name={item?.company_name}
												time={item?.createdAt}
												message={item?.message}
												documents={item?.documents}
												user={item?.user}
												status={item?.status}
											/>
										))}
									</React.Fragment>
								))
							) : (
								<NotFoundData text="No se encontraron datos" />
							)}
						</div>
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}
