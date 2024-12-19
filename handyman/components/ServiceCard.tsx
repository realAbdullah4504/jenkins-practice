import { ServiceCards } from "@/constants/landingPage/index";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SliderCrouserl from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const Service = ({
	icon,
	shortText,
	setSelectCard,
	selectCard,
	setSelectCardError,
	setServicePopUP,
	setServiceCardData,
	slug,
	showIcons = true,
	selectedServices,
}: ServicePropsType) => {
	const [toggle, setToggle] = useState<boolean>(true);
	const addToSelectCard = (shortText: string) => {
		if (setSelectCardError) setSelectCardError("");
		if (setSelectCard && toggle)
			setSelectCard((prev) => [...prev, shortText]);
		else {
			const newCard = selectCard?.filter((item) => item !== shortText);
			//console.log("===================selected card================",selectCard)
			//console.log("===================newCard================",newCard)
			if (setSelectCard && newCard) setSelectCard(newCard);
		}
		setToggle(!toggle);
	};

	const handleClick = () => {
		addToSelectCard(shortText);

		if (setServicePopUP && setServiceCardData) {
			setServicePopUP(true);
			setServiceCardData([shortText, slug,icon]);
		}
	};
	useEffect(() => {
		selectCard?.includes(shortText) && setToggle(false);
	}, [selectCard,shortText]);

	return (
		<div
			className={`bg-white cursor-pointer m-3 px-3 flex items-center text-center flex-col py-5 rounded-xl shadow-md h-[8rem] transform hover:scale-105 ${
				!toggle &&
				selectCard &&
				selectedServices === "Select Service" &&
				"border-orange border-2 border-opacity-70 text-orange"
			}`}
			style={!showIcons ? { height: "fit-content" } : {}}
			aria-hidden="true"
			onClick={() => {
				showIcons && handleClick();
			}}>
			{showIcons && (
				<Image
					src={icon}
					className="md:w-10 w-8 h-auto mb-1 md:mb-4 mt-1"
					alt="icon"
					width={100}
					height={100}
				/>
			)}
			{setSelectCard ? (
				<span
					className="leading-tight hover:text-orange cursor-pointer"
					title={shortText}>
					{shortText}
				</span>
			) : (
				<span
					className="leading-tight hover:text-orange"
					title={shortText}>
					{shortText}
				</span>
			)}
		</div>
	);
};

const ServiceForMobile = ({
	icon,
	shortText,
	setServicePopUP,
	setServiceCardData,
	slug,
}: {
	icon: string;
	shortText: string;
	setServicePopUP: React.Dispatch<React.SetStateAction<boolean>> | undefined;
	setServiceCardData:
		| React.Dispatch<React.SetStateAction<string[]>>
		| undefined;
	slug: string;
}) => {
	function handleClick() {
		if (setServicePopUP && setServiceCardData) {
			setServicePopUP(true);
			setServiceCardData([shortText, slug]);
		}
	}
	return (
		<div
			className={`bg-white cursor-pointer m-3 px-3 flex items-center text-center flex-col py-5 rounded-xl shadow-md h-[8rem] transform hover:scale-105`}
			onClick={() => handleClick()}>
			<Image
				src={icon}
				className="w-10 h-auto mb-4 mt-1"
				alt="icon"
				width={100}
				height={100}
			/>
			<span
				className="leading-tight hover:text-orange text-sm sm:text-lg"
				title={shortText}>
				{shortText}
			</span>
		</div>
	);
};

export function ServiceCard({
	slider,
	slidesToShowCustom,
	setSelectCard,
	selectCard,
	setSelectCardError,
	setServicePopUP,
	setServiceCardData,
	count,
	showIcons,
	selectedServices,
	handleUpdate,
}: ServiceCardProps) {
	const [toggleAllServicesOnMB, setToggleAllServicesOnMB] =
		useState<boolean>(false);
	const settings = {
		infinite: false,
		arrows: false,
		speed: 500,
		slidesToShow: slidesToShowCustom,
		slidesToScroll: slidesToShowCustom,
		initialSlide: 0,
		rows: showIcons || showIcons == undefined ? 2 : 1, // Conditionally set rows based on showIcons

		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 6,
					rows: showIcons ? 2 : 2, // Conditionally set rows for this breakpoint
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					rows: showIcons ? 2 : 2, // Conditionally set rows for this breakpoint
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
					rows: showIcons ? 2 : 2, // Conditionally set rows for this breakpoint
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					rows: showIcons ? 2 : 2, // Conditionally set rows for this breakpoint
				},
			},
		],
	};
	const leftAlignedClass = showIcons ? "" : "text-left";
	return (
		<div className="">
			<div className={`block ${leftAlignedClass}`}>
				<SliderCrouserl
					className={`${
						showIcons || showIcons == undefined ? "" : "ml-[-45%]"
					}`}
					{...settings}
					ref={slider}>
					{ServiceCards?.slice(0, count)?.map(
						({ id, icon, shortText, slug }) => (
							<Service
								showIcons={showIcons}
								key={id}
								icon={icon && icon}
								shortText={shortText}
								slug={slug}
								setSelectCard={setSelectCard && setSelectCard}
								selectCard={selectCard}
								setSelectCardError={setSelectCardError}
								setServicePopUP={
									setServicePopUP && setServicePopUP
								}
								setServiceCardData={setServiceCardData}
								selectedServices={selectedServices}
							/>
						)
					)}
				</SliderCrouserl>
			</div>

			{/* <div className="block sm:hidden">
				<div className="grid grid-cols-1">
					{ServiceCards.slice(
						0,
						!toggleAllServicesOnMB ? 14 : 39
					).map(({ id, icon, shortText, slug }) => (
						<ServiceForMobile
							key={id}
							icon={icon && icon}
							shortText={shortText}
							setServicePopUP={setServicePopUP && setServicePopUP}
							setServiceCardData={setServiceCardData}
							slug={slug}
						/>
					))}
				</div>
				<div className="flex justify-center items-center my-3">
					<button
						className="bg-white px-5 py-3 rounded-full shadow"
						onClick={() =>
							setToggleAllServicesOnMB(!toggleAllServicesOnMB)
						}>
						{!toggleAllServicesOnMB
							? "Show all services"
							: "Show Less all services"}
					</button>
				</div>
			</div> */}
		</div>
	);
}
