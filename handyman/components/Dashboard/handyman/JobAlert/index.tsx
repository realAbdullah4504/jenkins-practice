import useJobAlertRequests from "@/ApiRequests/jobalert";
import usePostalRequests from "@/ApiRequests/postal";
import Switcher1 from "@/components/Common/Switch";
import Loader from "@/components/Loader";
import { ServiceCard } from "@/components/ServiceCard";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import SliderCrouserl from "react-slick";

export default function JobAlerts() {
	// API requests
	const { GetJobAlert, UpdatedJobAlert } = useJobAlertRequests();
	const { GetPostalsBySearch } = usePostalRequests();
	const { data, isLoading } = GetJobAlert();
	const { userData } = useAuth();
	const user = userData[0];
	const zipCode = user?.address?.Postal_Code.toString() || "";

	// States
	const [isChecked, setIsChecked] = useState<boolean>(
		data?.status === "active"
	); // Switcher state
	const [searchZip, setSearchZip] = useState<number>(); // Postal code search
	const [enableAddLocationBtn, setEnableAddLocationBtn] =
		useState<boolean>(false); // Add location button
	const [selectedService, setSelectedService] =
		useState<string>("Select Service"); // Selected service
	const [selectCard, setSelectCard] = useState<string[]>(
		data?.keywords || []
	); // Selected cards
	const [zipCodes, setZipcodes] = useState<any[]>(data?.location || []); // Zip codes
	const [radius, setRadius] = useState<number>(100); // Search radius
	const [isCatUpAvl, setIsCatUpAvl] = useState<boolean>(false); // Category update availability

	// Refs
	const slider = useRef<SliderCrouserl>(null);

	const { data: postals, refetch } = GetPostalsBySearch(searchZip);

	//Router instance
	const router = useRouter();
	const query = router.query?.unsubscribe;

	// Error handler
	const handleErorr = clientError();

	useEffect(() => {
		setSearchZip(Number(zipCode))
	}, [])
	// Effects
	useEffect(() => {
		// Initial state setup
		setSelectCard(data?.keywords || []);
		setZipcodes(data?.location || []);
		setRadius(data?.radius);
		setIsChecked(data?.status === "active");
	}, [data]);

	useEffect(() => {
		// Postal code search and button enable/disable
		refetch();
		if (postals?.some((i: any) => i.Postal_Code !== searchZip)) {
			setEnableAddLocationBtn(false);
		}
	}, [searchZip, postals]);

	useEffect(() => {
		// Category update availability check
		const isCategoryUpdateAvl =
			data?.keywords.length === selectCard?.length &&
			JSON.stringify(data?.keywords) === JSON.stringify(selectCard);
		setIsCatUpAvl(isCategoryUpdateAvl);
	}, [selectCard]);

	useEffect(() => {
		if (query === "true") {
			handleUpdate({ status: "inactive" });
			router.push({
				pathname: router.pathname,
				query: "",
			});
		}
	}, [query]);

	// Handlers
	const handleUpdate = async (data: any) => {
		try {
			await UpdatedJobAlert.mutateAsync(data, {
				onSuccess(data) {
					toast.success("Actualizado con éxito");
					setSearchZip(undefined);
				},
			});
			return undefined;
		} catch (error) {
			handleErorr(error);
			return undefined;
		}
	};

	// Filter postal codes
	const filterPostal = postals
		?.map((i: any) => i.Postal_Code)
		?.filter(
			(item: any, index: any, self: any) =>
				self?.findIndex((i: any) => i === item) === index
		)
		.filter((item: any) => !data.location.some((i: any) => i === item));

	const handleUpdateDebounce = useDebounce((radius) => {
		handleUpdate({ radius });
	}, 500)

	// JSX
	if (isLoading) return <Loader />;

	return (
		<div className="my-2 w-full">
			<h1 className="lg:text-3xl text-lg font-bold">
				<span className="text-orange">Notificaciones para </span> pareo
órdenes
			</h1>
			{/* Switcher */}
			<div className="my-4 flex items-center gap-2">
				<b className="text-lg">Estado de alerta:</b>
				<Switcher1
					isChecked={isChecked}
					setIsChecked={setIsChecked}
					handleAction={(status: boolean) => {
						handleUpdate({
							status: status ? "active" : "inactive",
						});
					}}
				/>
			</div>
			{/* Filters */}
			<div className="w-full flex gap-2">
				<div className="flex gap-5 mt-3 items-center flex-wrap md:relative">
					{/* Radius filter */}
					<div>
						<p className="font-semibold mb-4">Radio</p>
						<div className="flex gap-2">
							<input
								type="number"
								className="w-full outline-none bg-white px-3 py-3 rounded-lg  shadow"
								id="filter_km"
								name="filter_km"
								placeholder="50 km"
								min={1}
								value={radius || ""}
								onChange={(e) => {
									setRadius(Number(e.target.value))
									handleUpdateDebounce(Number(e.target.value))
								}}
							/>
							{/* <button
								onClick={() => {
									handleUpdate({ radius });
								}}
								disabled={
									!radius ||
									(radius && data?.radius === radius
										? true
										: false)
								}
								className="bg-orange px-2 w-fit disabled:opacity-50 text-nowrap text-white rounded font-semitbold">
								Update
							</button> */}
						</div>
					</div>
					{/* Zip code filter */}
					{/* <div className="relative">
						<p className="font-semibold mb-4">Zip Code</p>
						<div className="flex gap-2">
							<input
								type="text"
								className="w-full outline-none bg-white px-3 py-3 rounded-lg  shadow"
								id="filter_pin"
								name="filter_pin"
								placeholder="e.g. 40210"
								maxLength={6}
								value={searchZip || ""}
								onChange={(e) =>
									setSearchZip(Number(e.target.value))
								}
							/>
							<button
								onClick={() =>
									handleUpdate({
										location: [
											...data.location,
											searchZip,
										].filter(
											(item, index, arr) =>
												arr?.findIndex(
													(i: any) => i === item
												) === index
										),
									})
								}
								disabled={!enableAddLocationBtn}
								className="bg-orange px-2 w-fit disabled:opacity-50 text-nowrap text-white rounded font-semitbold">
								Add
							</button>
						</div>
						{!enableAddLocationBtn && filterPostal?.length > 0 && (
							<div className="absolute overflow-auto z-10 top-24 w-full rounded shadow-lg bg-white flex flex-col gap-2 h-fit p-2">
								{filterPostal?.map((item: any, ind: number) => {
									return (
										<button
											onClick={() => {
												setEnableAddLocationBtn(true);
											}}
											key={ind}
											className="border cursor-pointer text-left w-fit shadow border-gray-300 p-2 rounded">
											<span className="text-black ">
												{item}
											</span>
										</button>
									);
								})}
							</div>
						)}
					</div> */}
				</div>
			</div>
			{/* Category filter */}
			<div className="relative">
				<div className="mt-3 sm:px-5 py-3">
					<h3 className="font-semibold">Filtrar por categoría</h3>
					<ServiceCard
						slider={slider}
						slidesToShowCustom={7}
						setSelectCard={setSelectCard}
						selectCard={selectCard}
						selectedServices={selectedService}
					/>
					<div
						className="text-4xl sm:flex justify-between items-center top-[45%] absolute  -right-2 -left-2 hidden"
						aria-hidden="true">
						<button
							onClick={() => slider.current?.slickPrev()}
							aria-label="Left shift">
							<IoIosArrowBack className="text-[48px] sm:text-[30px]" />
						</button>
						<button
							onClick={() => slider.current?.slickNext()}
							aria-label="right shift">
							<IoIosArrowForward className="text-[48px] sm:text-[30px]" />
						</button>
					</div>
					<button
						className={`bg-orange p-2 text-white rounded font-semibold ml-auto w-fit flex justify-end transition-opacity duration-300 ease-in-out ${!isCatUpAvl
							? "opacity-100"
							: "opacity-0 pointer-events-none"
							}`}
						onClick={() => handleUpdate({ keywords: selectCard })}>
						Categoría de actualización
					</button>
				</div>
				{/* Zip codes */}
				{/* <div className="mt-5 sm:px-5 py-3">
					<h1 className="mb-2 font-semibold">Zip Codes</h1>
					<div className="flex gap-2 flex-wrap">
						{zipCodes?.map((i: any, ind: number) => (
							<div
								key={ind}
								className=" relative rounded-lg shadow  p-4 bg-white w-fit ">
								<RxCross2
									onClick={() => {
										handleUpdate({
											location: zipCodes.filter(
												(f: any) => f !== i
											),
										});
									}}
									className="absolute top-1 right-1 cursor-pointer hover:text-orange"
								/>
								<span>{i}</span>
							</div>
						))}
					</div>
				</div> */}
			</div>
		</div>
	);
}
