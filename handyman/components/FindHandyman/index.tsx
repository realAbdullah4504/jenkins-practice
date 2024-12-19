import { Find_handyman } from "@/constants/FindHandyman";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Article1 from "./components/Article1";
import Article2 from "./components/Article2";
import Article3 from "./components/Article3";
import Services from "./components/Services";

export default function Find_handymanPage() {
	const [zip_code, setZip_code] = useState<string>("");
	const [zip_codeError, setZip_codeError] = useState<string>("");
	const [serviceCardData, setServiceCardData] = useState<string[]>([]);
	const [city, setCity] = useState<string>("");
	const router = useRouter();
	const find_handyman_search = () => {
		if (!zip_code && !city) {
			setZip_codeError("Por favor, selecciona una ubicación válida");
			return;
		} else {
			setZip_codeError("");
		}
		if (city && zip_code) {
			router.push({
				pathname: `/findhandyman/${serviceCardData[1]}`,
				query: { search: zip_code, city },
			});
			document.body.style.overflowY = "scroll";
		}
	};
	return (
		<div className="pt-12">
			<div className="pt-20 bg-gradient-radial from-[#f87b37df] via-[#f87b37ab]  w-full flex justify-center items-center py-10 px-3 flex-col">
				<Image
					src={"/FindHandyman/hero.svg"}
					alt="Encuentra un reparador"
					width={800}
					height={800}
				/>
				<h1 className="text-4xl font-bold mt-4">
					Encuentra un <span className="text-orange">Reparador</span>
				</h1>
			</div>
			<div className="Container my-10">
				<Services
					setServiceCardData={setServiceCardData}
					setZip_code={setZip_code}
					zip_code={zip_code}
					find_handyman_search={find_handyman_search}
					zip_codeError={zip_codeError}
					setZip_codeError={setZip_codeError}
					setCity={setCity}
					city={city}
				/>
			</div>
			<div className="space-y-8 Container">
				<Article1 />
				<Article2 />
				<Article3 />
				<div>
					<Link
						href={"/register"}
						title={Find_handyman.Footer.color_text}
						className="text-orange">
						{Find_handyman.Footer.color_text}{" "}
					</Link>
					<span>{Find_handyman.Footer.text}</span>
				</div>
			</div>
		</div>
	);
}
