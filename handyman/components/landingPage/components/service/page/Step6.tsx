import { useAuth } from "@/context/AuthContext";
import React from "react";
export default function Page6({
	setContactDetailsPage,
	contactDetailsPageError,
	contactDetailsPage,
	isNextBtnDisable,
	setIsNextBtnDisable,
}: ContactDetailsPropsTypePag) {
	const { userData } = useAuth();
	// const [isEmailRegistered, setIsEmailRegistered] = useState<boolean>(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setContactDetailsPage((pre: ContactDetailsPageDataType) => ({
			...pre,
			[name]: value,
		}));

		if (contactDetailsPage.email && name == "email") {
			contactDetailsPageError.emailError = "";
		}
		if(name==='email' && value !== contactDetailsPage.email){
			setIsNextBtnDisable(false)
		}
	
	};
	const isDisabled = userData[0]?.accessToken ? true : false;
	return (
		<section className="m-2 mx-5 mb-6 mt-5  md:mx-10 lg:mx-20">
			<h2 className="mb-5 mt-1 font-semibold">Ingrese el correo electrónico</h2>
			<div className="space-y-5">
				<div className=" md:w-2/4 w-full gap-9 space-y-5 md:space-y-0">
					<div className="mb-3">
						<div className="bg-white py-3 px-3  rounded-lg  border-2 mt-2 w-full relative">
							<input
								disabled={isDisabled}
								type="email"
								className={`w-full outline-none  ${
									isDisabled && "cursor-not-allowed"
								}`}
								id="page6PopUP_email__number"
								name="email"
								placeholder="Dirección de correo electrónico"
								onChange={handleChange}
								value={contactDetailsPage.email}
							/>
						</div>
	
						{!isNextBtnDisable && (
							<>
								{contactDetailsPageError.emailError && (
									<p className=" text-sm mb-2 text-red-500">
										{contactDetailsPageError.emailError}
									</p>
								)}
							</>
						)}
					</div>
	
					{isNextBtnDisable && (
						<>
							<div className="bg-white py-3 px-3  rounded-lg  border-2 mt-2 w-full relative">
								<input
									type="password"
									id="page6PopUP_password"
									name="password"
									className={`w-full outline-none`}
									placeholder="Contraseña"
									onChange={handleChange}
									value={contactDetailsPage.password}
								/>
							</div>
							{contactDetailsPageError.emailError && (
								<p className=" text-sm mb-2 text-red-500">
									{contactDetailsPageError.emailError}
								</p>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	);
	
}
