import { ServiceCards } from "@/constants/landingPage";
import Image from "next/image";

export default function ServiceList({
	handleRemove,
	data,
}: {
	data: string[];
	handleRemove?: any;
}) {
	const userServiceList = ServiceCards.filter((i) =>
		data.includes(i.shortText)
	);
	return (
		<section className="flex flex-wrap items-center">
			{userServiceList?.map((item, idx) => (
				<div
					className={`w-[120px] h-[120px] bg-white cursor-pointer relative m-3 px-3 flex justify-center items-center text-center flex-col py-5 rounded-xl shadow-md h-[8rem] transform hover:scale-105`}
					// onClick={() => setServicePopUP(true)}
					key={idx}>
					{handleRemove && (
						<button
							className="absolute -top-2 -right-2 w-6 h-6 bg-orange rounded-full flex items-center justify-center opacity-50"
							onClick={() => {
								handleRemove(idx, "services");
							}}>
							<span className="text-white text-xs">X</span>
						</button>
					)}
					<Image
						src={item.icon}
						className="w-10 h-auto mb-4 mt-1"
						alt="icon"
						width={100}
						height={100}
					/>
					<span
						className="leading-tight hover:text-orange"
						title={item.shortText}>
						{item.shortText}
					</span>
				</div>
			))}

			{/* View More Card
					<div
						className={`w-16 h-16 bg-orange cursor-pointer m-3 px-3 flex justify-center items-center text-center flex-col py-5 rounded-xl shadow-md h-[4rem] transform hover:scale-105`}
						// onClick={() => setServicePopUP(true)}
					>
						<button
							disabled={userService.length === 12}
							onClick={() => setIsOpen("open")}
							className="w-20 h-20 bg-orangerounded-full disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center">
							<span className="text-white text-4xl">+</span>
						</button>

						<AddServices
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							setSelectCard={setSelectCard}
							selectCard={selectCard}
						/>
					</div> */}
		</section>
	);
}
