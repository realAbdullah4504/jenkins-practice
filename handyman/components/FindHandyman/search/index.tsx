import { ServiceCards } from "@/constants/landingPage";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ServicePopUpPage from "../search/components/ServicePopUP";
import SearchResult from "./components/SearchResult";
import ServiceCardsCarousel from "./components/ServiceCards";

type SearchProps = {
	id: number;
	icon: string;
	shortText: string;
	slug: string;
};

export default function Search({ params }: any) {
	const [Services, setServices] = useState<SearchProps[]>([
		{
			id: 0,
			icon: "",
			shortText: "",
			slug: "",
		},
	]);
	const initialService = params?.handyman?.split("-").join(" ");
	const [userType, setUserType] = useState<string[]>([]);
	const [servicePopUp, setServicePopUP] = useState<boolean>(false);
	const [serviceCardData, setServiceCardData] = useState<string[]>([]);
	const initialLoadRef = useRef(true);

	const HandleChange = useCallback(
		(e: any) => {
			const SearchVal = ServiceCards
			// .sort((a, b) =>
			// 	a.shortText.localeCompare(b.shortText)
			// )
			.filter((item) =>
				item.shortText
					.toLowerCase()
					.includes(e.target.value.toLowerCase())
			);
			setServices(SearchVal);
			setUserType([e.target.value]);
		},
		[setServices]
	);

	const FindService = () => {
		if (initialLoadRef.current) {
			const item = Services[0];
			initialLoadRef.current = false;
			setServiceCardData([item.shortText, item.slug]);
			setServicePopUP(true);
			return;
		}
		if (userType[0] !== "") {
			setServiceCardData(userType);
			setServicePopUP(true);
			setUserType([""]);
		}
	};

	useEffect(() => {
		HandleChange({ target: { value: initialService } });
	}, [HandleChange, initialService]);

	return (
		<div className="w-full Container">
			<section className="w-full space-y-5">
				<div className="w-full flex justify-center items-center flex-col gap-2">
					<label
						htmlFor="search_service"
						className="md:w-1/2 text-gray-600 w-full font-medium">
						Describe el servicio que necesitas
					</label>
					<div className="flex shadow-md md:w-1/2 grow w-full rounded-md relative">
						<div className="z-30 w-full flex">
							<input
								type="text"
								placeholder="e.g. Pintor"
								id="search_service"
								name="search_service"
								className="grow px-3 py-3 capitalize border-2 border-r-0 rounded-l-md outline-none"
								title="Buscar nuestros servicios"
								onChange={HandleChange}
								value={userType?.join()?.split(",")[0]}
							/>
							<button
								className="bg-orange py-3 shadow-md px-4 text-white rounded-r-md hover:text-black"
								onClick={FindService}>
								Publicar Trabajo
							</button>
						</div>
						<div
							className={`border-2 bg-white py-5 shadow-md rounded-b-md w-full absolute z-20 top-10 ${
								userType.length !== 0 && userType[0] !== ""
									? "block"
									: "hidden"
							}`}>
							{Services.length !== 0 ? (
								Services.slice(0, 14).map((item) => (
									<div
										key={item.id}
										className="flex justify-start items-center mx-3">
										<Image
											src={item.icon}
											alt={item.shortText}
											width={28}
											height={28}
										/>
										<span
											className="px-2 py-1 hover:text-gray-700 text-gray-500 cursor-pointer"
											onClick={() => {
												setUserType([
													item.shortText,
													item.slug,
												]);
												initialLoadRef.current = false;
											}}>
											{item.shortText}
										</span>
									</div>
								))
							) : (
								<span className="px-2 py-1 hover:text-gray-700 text-gray-500 cursor-pointer">
									Servicio no encontrado
								</span>
							)}
						</div>
					</div>
				</div>
				{servicePopUp && (
					<div className="fixed left-0 right-0 -top-10 bottom-0 bg-[rgba(189,189,189,0.6)] z-50">
						<div className="max-h-full overflow-y-auto">
							<ServicePopUpPage
								setServicePopUP={setServicePopUP}
								servicePopUp={servicePopUp}
								serviceCardData={serviceCardData}
							/>
						</div>
					</div>
				)}
			</section>

			<div className="py-10">
				<ServiceCardsCarousel />

				<SearchResult params={params} />
			</div>
		</div>
	);
}
