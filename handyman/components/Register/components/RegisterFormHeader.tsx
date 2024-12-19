import { ServiceCard } from "@/components/ServiceCard";
import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";

export default function RegisterForms({
	setSelectCard,
	selectCardError,
	selectCard,
	setSelectCardError,
}: {
	setSelectCard: React.Dispatch<React.SetStateAction<string[]>>;
	selectCardError: string;
	selectCard: string[];
	setSelectCardError: React.Dispatch<React.SetStateAction<string>>;
}) {
	const slider = useRef<SliderCrouserl>(null);
	return (
		<div className="px-5">
			<div className="relative rounded-2xl sm:px-3 sm:mx-5 my-3 mb-5">
				<ServiceCard
					slider={slider}
					slidesToShowCustom={7}
					setSelectCard={setSelectCard}
					selectCard={selectCard}
					setSelectCardError={setSelectCardError}
				/>
				{selectCardError && (
					<p className="absolute text-sm text-red-500 left-0 mt-1">
						{selectCardError}
					</p>
				)}
				<div
					className="text-4xl sm:flex justify-between items-center top-[45%] absolute md:-left-4 md:-right-4 right-0 left-0 hidden"
					aria-hidden="true">
					<button
						className="cursor-pointer bg-orange rounded-full text-white"
						onClick={() => slider.current?.slickPrev()}
						aria-label="Desplazarse a la izquierda"
						aria-hidden="true">
						<IoIosArrowBack className="text-[48px] sm:text-[30px]" />
					</button>
					<button
						className="cursor-pointer bg-orange rounded-full text-white"
						onClick={() => slider.current?.slickNext()}
						aria-label="Desplazarse a la derecha"
						aria-hidden="true">
						<IoIosArrowForward className="text-[48px] sm:text-[30px]" />
					</button>
				</div>
			</div>
		</div>
	);
}
