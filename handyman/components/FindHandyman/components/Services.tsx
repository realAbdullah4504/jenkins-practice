import SearchPostalCode from "@/components/Common/SearchPostalCode";
import { ServiceCard } from "@/components/ServiceCard";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";

const Zip_code = ({
	setServicePopUP,
	setZip_code,
	zip_code,
	find_handyman_search,
	zip_codeError,
	setZip_codeError,
	city,
	setCity,
}: {
	setServicePopUP: Dispatch<SetStateAction<boolean>>;
	setZip_code: Dispatch<SetStateAction<string>>;
	zip_code: string;
	find_handyman_search: () => void;
	zip_codeError: string;
	setZip_codeError: Dispatch<SetStateAction<string>>;
	city: string;
	setCity: Dispatch<SetStateAction<string>>;
}) => {
	return (
		<div className="mb-16 mt-5 mx-10 relative bg-white p-4 rounded-md py-6">
			<h2 className="text-2xl font-bold">Introduce el código postal</h2>
			<p className="text-gray-500 mb-3 mt-1">
				Especifica la ubicación del trabajo por código postal.
			</p>
			<div className="bg-white py-3 px-2 rounded-lg border-2 flex items-center relative sm:w-[25rem] w-full">
				<input
					type="text"
					className="w-full outline-none"
					name="zip_code"
					placeholder="e.g. 5000"
					maxLength={6}
					pattern="[0-9]{6}"
					onChange={(e) => {
						setZip_code(e.target.value);
						setZip_codeError("");
					}}
					value={zip_code}
				/>
				<span>{city}</span>
				<SearchPostalCode
					position="top-[50px]"
					search={zip_code}
					onSelect={(item: any) => {
						setCity(item?.Place_Name);
					}}
				/>
			</div>
			{zip_codeError && (
				<span className="font-medium text-red-500 text-sm">
					{zip_codeError}
				</span>
			)}
			<div className="space-x-5 mt-7">
				<button
					className="border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg"
					onClick={() => {
						setServicePopUP(false);
						setZip_code("");
						setZip_codeError("");
						setCity("");
					}}>
					Volver
				</button>
				<button
					className="border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white"
					onClick={find_handyman_search}>
					Buscar Reparador
				</button>
			</div>
		</div>
	);
};

export default function Services({
	setServiceCardData,
	setZip_code,
	zip_code,
	find_handyman_search,
	zip_codeError,
	setZip_codeError,
	city,
	setCity,
}: {
	setServiceCardData: Dispatch<SetStateAction<string[]>>;
	setZip_code: Dispatch<SetStateAction<string>>;
	zip_code: string;
	find_handyman_search: () => void;
	zip_codeError: string;
	setZip_codeError: Dispatch<SetStateAction<string>>;
	city: string;
	setCity: Dispatch<SetStateAction<string>>;
}) {
	const slider = useRef<SliderCrouserl>(null);
	const [servicePopUp, setServicePopUP] = useState<boolean>(false);
	useEffect(() => {
		if (!servicePopUp) {
			document.body.style.overflowY = "scroll";
		} else {
			document.body.style.overflowY = "hidden";
		}
	}, [servicePopUp]);
	return (
		<div className="w-full">
			<section className="text-center space-y-2 flex items-end justify-between">
				<span className="font-bold flex gap-2 text-xl ">
					Buscar Reparador
					<p className="font-bold text-orange">Perfiles</p>
				</span>
				<span>
					<h1 className="text-3xl font-bold text-black">
						Nuestros Servicios
					</h1>
					<p className="text-xl font-medium">
						Construimos para tu Comodidad
					</p>
				</span>
				<span></span>
			</section>
			<div className="mt-3 sm:px-5 py-3 relative">
				<ServiceCard
					slider={slider}
					slidesToShowCustom={7}
					setServicePopUP={setServicePopUP}
					setServiceCardData={setServiceCardData}
				/>
				<div
					className="text-4xl sm:flex justify-between items-center top-[45%] absolute md:-left-2 md:-right-2 right-0 left-0 hidden"
					aria-hidden="true">
					<button
						className="cursor-pointer bg-orange rounded-full text-white"
						onClick={() => slider.current?.slickPrev()}
						aria-label="Desplazamiento a la izquierda"
						aria-hidden="true">
						<IoIosArrowBack className="text-[48px] sm:text-[30px]" />
					</button>
					<button
						className="cursor-pointer bg-orange rounded-full text-white"
						onClick={() => slider.current?.slickNext()}
						aria-label="Desplazamiento a la derecha"
						aria-hidden="true">
						<IoIosArrowForward className="text-[48px] sm:text-[30px]" />
					</button>
				</div>
			</div>
			{servicePopUp && (
				<div className="bg-gray-200 fixed h-screen inset-0 flex justify-center items-center bg-opacity-40 z-50">
					<Zip_code
						setServicePopUP={setServicePopUP}
						setZip_code={setZip_code}
						zip_code={zip_code}
						find_handyman_search={find_handyman_search}
						zip_codeError={zip_codeError}
						setZip_codeError={setZip_codeError}
						city={city}
						setCity={setCity}
					/>
				</div>
			)}
		</div>
	);
}
