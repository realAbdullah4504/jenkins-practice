import { Context } from "@/components/Common/DashboardLayout";
import ServicePopUpPage from "@/components/landingPage/components/ServicePopUP";
import { useContext, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";
import { ServiceCard } from "../../components/ServiceCards";
import Header from "./components/Header";

export default function FindHanyman() {
	const slider = useRef<SliderCrouserl>(null);
	const [servicePopUp, setServicePopUP] = useState<boolean>(false);
	const [serviceCardData, setServiceCardData] = useState<string[]>([]);
	const { toggleSideBar } = useContext(Context);

	return (
		<div className={`w-full my-12`}>
			<h1 className=" text-3xl text-center font-bold">
				Recibe una <span className="text-orange">oferta gratuita</span> de un handyman{" "}
			</h1>
			<h2 className="ml-2 text-center mt-5 font-bold text-2xl md:text-3xl mb-2">
				Selecciona el servicio apropiado para tu trabajo:{" "}
			</h2>

			<div className="flex justify-between items-center lg:mx-20 my-10 flex-wrap flex-row-reverse">
				<Header />
			</div>
			<div className="mt-3  lg:px-20 py-3 relative">
				<ServiceCard
					slider={slider}
					slidesToShowCustom={7}
					setServicePopUP={setServicePopUP}
					setServiceCardData={setServiceCardData}
				/>
				<div
					className="text-4xl sm:flex justify-between items-center top-[50%] absolute right-4 left-4  lg:right-12 lg:left-12 hidden"
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
				<div className="fixed inset-0 bg-[rgba(189,189,189,0.6)] z-50">
					<div className="max-h-full overflow-y-auto">
						<ServicePopUpPage
							setServicePopUP={setServicePopUP}
							servicePopUp={servicePopUp}
							serviceCardData={serviceCardData}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
