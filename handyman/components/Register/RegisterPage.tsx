import Footer from "@/components/Footer";
import { useState } from "react";
import Article from "./components/Article";
import RegisterFormHeader from "./components/RegisterFormHeader";
import RegisterForms from "./components/RegisterForms";
import Steps from "./components/Steps";

export default function RegisterForm() {
	const [selectCard, setSelectCard] = useState<string[]>([]);
	const [selectCardError, setSelectCardError] = useState<string>("");
	const [step, setStep] = useState<Number>(2);
	return (
		<div className="w-full bg-mainBackground h-screen">
			<div className="px-5 bg-cover bg-registration-hero-img md:py-20 py-10">
				<div className="max-w-7xl mx-auto mt-20 bg-white bg-opacity-50 rounded-2xl shadow-lg p-8">
					<section className="text-center flex flex-col justify-center items-center mb-5 pt-5 sm:pt-3 space-y-5">
						{step === 2 ? (
							<>
								<h1 className="sm:text-5xl text-4xl font-bold leading-tight">
									Encuentra Trabajos
								</h1>
								<p className="font-medium sm:text-xl">
									Encuentra los trabajos adecuados para tu oficio con nuestro Servicio de Manitas
								</p>
							</>
						) : (
							<h1 className="sm:text-4xl text-4xl font-bold leading-tight">
								Sube al menos un documento
							</h1>
						)}
					</section>
					<div>
						{selectCard.length <= 0 ? (
							<RegisterFormHeader
								setSelectCard={setSelectCard}
								selectCardError={selectCardError}
								selectCard={selectCard}
								setSelectCardError={setSelectCardError}
							/>
						) : (
							<RegisterForms
								selectCard={selectCard}
								step={step}
								setStep={setStep}
								setSelectCardError={setSelectCardError}
								setSelectCard={setSelectCard}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="bg-mainBackground Container">
				<Steps />
				<Article />
			</div>
			<Footer />
		</div>
	);
}
