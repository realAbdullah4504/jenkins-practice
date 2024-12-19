import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
export default function Page7({
	setContactDetailsPage,
	contactDetailsPageError,
	contactDetailsPage,
	setIsNextBtnDisable,
}: ContactDetailsPropsTypePag) {
	const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
	const { userData } = useAuth();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setContactDetailsPage((pre: ContactDetailsPageDataType) => ({
			...pre,
			[name]: value,
		}));

		if (contactDetailsPage.name && name == "name") {
			contactDetailsPageError.nameError = "";
		}
		// if (contactDetailsPage.email && name == "email") {
		// 	contactDetailsPageError.emailError = "";
		// }
		if (contactDetailsPage.phone && name == "phone") {
			contactDetailsPageError.phoneError = "";
		}
	};

	const isDisabled = userData[0]?.accessToken ? true : false;
	return (
		<section className="m-2 mx-5 mb-6 mt-5  md:mx-10 lg:mx-20">
			<h2 className="mb-5 mt-1 font-semibold">
				Los datos de contacto solo son visibles para los artesanos que
				se han puesto en contacto contigo.
			</h2>
			<div className="space-y-5">
				<div className="md:flex w-full gap-9 space-y-5 md:space-y-0">
					<div className="md:w-1/2 relative">
						<label
							htmlFor="page6PopUP_name__number"
							className="font-semibold">
							Nombre
						</label>
						<div className="bg-white py-3 px-3 rounded-lg  border-2 mt-2 w-full">
							<input
								disabled={isDisabled}
								type="text"
								className={`w-full outline-none  ${
									isDisabled && "cursor-not-allowed"
								}`}
								id="page6PopUP_name__number"
								name="name"
								placeholder="Tu nombre"
								onChange={handleChange}
								value={contactDetailsPage.name}
							/>
						</div>
						{contactDetailsPageError.nameError && (
							<p className="absolute text-sm text-red-500">
								{contactDetailsPageError.nameError}
							</p>
						)}
					</div>
					{/* <div className="md:w-1/2 relative">
						<label
							htmlFor="page6PopUP_email__number"
							className="font-semibold">
							Email
						</label>
						<div className="bg-white py-3 px-3 rounded-lg  border-2 mt-2 w-full relative">
							<input
								disabled={isDisabled}
								type="email"
								className={`w-full outline-none  ${
									isDisabled && "cursor-not-allowed"
								}`}
								id="page6PopUP_email__number"
								name="email"
								placeholder="Email address"
								onChange={handleChange}
								value={contactDetailsPage.email}
							/>
						</div>
						{contactDetailsPageError.emailError && (
							<p className="absolute text-sm text-red-500">
								{contactDetailsPageError.emailError}
							</p>
						)}
					</div> */}
				</div>
				<div className="md:w-1/2 relative">
					<label
						htmlFor="page6PopUP_phone__number"
						className="font-semibold">
						Número de teléfono
					</label>
					<div className="bg-white py-3 px-3 rounded-lg  border-2 mt-2 relative md:mr-4">
						<input
							type="tel"
							className={`w-full outline-none`}
							id="page6PopUP_phone__number"
							name="phone"
							placeholder="Número de teléfono"
							pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
							onChange={handleChange}
							value={contactDetailsPage.phone}
						/>
					</div>
					{!showSaveButton && contactDetailsPageError.phoneError && (
						<p className="absolute text-sm text-red-500">
							{contactDetailsPageError.phoneError}
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
