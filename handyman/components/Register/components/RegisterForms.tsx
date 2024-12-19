import usePostalRequests from "@/ApiRequests/postal";
import useUserRequests from "@/ApiRequests/user";
import Loader from "@/components/Loader";
import clientError from "@/helper/clientError";
import useOnChangeUploadImages from "@/hooks/useUploadImage";

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsBook, BsCardImage } from "react-icons/bs";

const InputBoxes = ({
	setInputData,
	inputData,
	setInputDataError,
	inputDataError,
	imageDataPageData,
	setImagePageData,
}: SetInputDataTypeProps) => {
	const [search, setSearch] = useState<any>();
	const { GetPostalsBySearch } = usePostalRequests();
	const { data, refetch, isLoading } = GetPostalsBySearch(search);
	const [address, setAddress] = useState<any>();

	const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setInputData({
			...inputData,
			[name]: value,
		});
		if (name === "zip_code") {
			if (!value) {
				setInputData({
					...inputData,
					zip_code: "",
				});
				return setSearch("");
			}
			setSearch(value);
			setAddress(undefined);
			setInputData((p) => ({ ...p, address: "" }));
		}

		if (inputData.password)
			setInputDataError((e) => ({ ...e, passwordError: "" }));
		if (inputData.zip_code)
			setInputDataError((e) => ({ ...e, zip_codeError: "" }));
		if (inputData.email_address)
			setInputDataError((e) => ({ ...e, email_addressError: "" }));
	};

	const handleLocation = (address: any) => {
		setSearch("");
		setInputData((p) => ({ ...p, address: address._id }));
		setAddress(address);
	};

	useEffect(() => {
		refetch();
	}, [search, refetch]);

	return (
		<div className="flex flex-col md:flex-row w-full">
			<div className="w-full md:w-1/2 space-y-4">
				<div className="px-10">
					<label htmlFor="first_name" className="font-medium">
						Nombre
					</label>
					<div className="py-3 px-3 rounded-lg border mt-2 border-orange">
						<input
							type="text"
							id="first_name"
							className="w-full outline-none bg-transparent"
							name="first_name"
							placeholder="Ingresa tu nombre"
							value={inputData.first_name}
							onChange={handleChangeEvent}
							required
						/>
					</div>
					{inputDataError.first_nameError && (
						<p className="absolute text-sm text-red-500">
							{inputDataError.first_nameError}
						</p>
					)}
				</div>

				<div className="px-10">
					<label htmlFor="company_name" className="font-medium">
						Nombre de la Empresa
					</label>
					<div className="py-3 px-3 rounded-lg border mt-2 border-orange">
						<input
							type="text"
							id="company_name"
							className="w-full outline-none bg-transparent"
							name="company_name"
							required
							placeholder="Ingresa el nombre de tu empresa"
							value={inputData.company_name}
							onChange={handleChangeEvent}
						/>
					</div>
					{inputDataError.company_nameError && (
						<p className="absolute text-sm text-red-500">
							{inputDataError.company_nameError}
						</p>
					)}
				</div>
				<div className="px-10 relative">
					<label htmlFor="email_address" className="font-medium">
						Dirección de Correo Electrónico
					</label>
					<div className="py-3 px-3 rounded-lg border mt-2 border-orange">
						<input
							type="email"
							required
							id="email_address"
							className="w-full outline-none bg-transparent"
							name="email_address"
							placeholder="xyz@gmail.com"
							value={inputData.email_address}
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
							onChange={handleChangeEvent}
						/>
					</div>
					{inputDataError.email_addressError && (
						<p className="absolute text-sm text-red-500">
							{inputDataError.email_addressError}
						</p>
					)}
				</div>
			</div>
			<div className="w-full md:w-1/2 space-y-4">
				<div className="px-10">
					<label htmlFor="last_name" className="font-medium">
						Apellido
					</label>
					<div className="py-3 px-3 rounded-lg border mt-2 border-orange">
						<input
							type="text"
							id="last_name"
							required
							className="w-full outline-none bg-transparent"
							name="last_name"
							placeholder="Ingresa tu apellido"
							value={inputData.last_name}
							onChange={handleChangeEvent}
						/>
					</div>

					{inputDataError.last_nameError && (
						<p className="absolute text-sm text-red-500">
							{inputDataError.last_nameError}
						</p>
					)}
				</div>

				<div className="px-10 flex gap-3 relative">
					<div className="w-1/2">
						<label htmlFor="streetAddress" className="font-medium">
							Dirección
						</label>
						<div className="py-3 px-3 rounded-lg border mt-2 border-orange">
							<input
								type="text"
								id="streetAddress"
								className="w-full outline-none bg-transparent"
								name="streetAddress"
								required
								placeholder="Ingresa la calle, número"
								value={inputData.streetAddress}
								onChange={handleChangeEvent}
							/>
						</div>
						{inputDataError.streetAddressError && (
							<p className="absolute text-sm text-red-500">
								{inputDataError.streetAddressError}
							</p>
						)}
					</div>

					<div className="w-1/2 relative">
						<label htmlFor="zip_Code" className="font-medium">
							Código Postal
						</label>
						<div className="py-3 px-3 rounded-lg relative border mt-2 border-orange">
							<input
								type="text"
								id="zip_Code"
								className="w-full outline-none bg-transparent"
								name="zip_code"
								placeholder="e.g. 40210"
								value={inputData.zip_code}
								onChange={handleChangeEvent}
								maxLength={6}
							/>
							<span className="absolute right-2 top-2.5 ">
								{address?.Place_Name}
							</span>
						</div>
						{inputDataError.zip_codeError && (
							<p className="absolute text-sm text-red-500">
								{inputDataError.zip_codeError}
							</p>
						)}
						{search && (
							<div className="absolute z-10 overflow-auto top-18 rounded shadow-lg bg-white flex flex-col gap-2 h-48 p-2">
								{isLoading ? (
									<Loader />
								) : data.length > 0 ? (
									data?.map((item: any, ind: number) => {
										return (
											<button
												onClick={() =>
													handleLocation(item)
												}
												key={ind}
												className="border cursor-pointer text-left w-fit shadow border-gray-300 p-2 rounded">
												<span className="text-black ">
													{item?.Place_Name}
													{/* ,{" "}
													{item?.Admin_Name},{" "}
													{item?.Admin_Name2},{" "}
													{item?.Admin_Name3} */}
												</span>
											</button>
										);
									})
								) : (
									<p className="w-full p-2 text-center">
										No se encontró ubicación
									</p>
								)}
							</div>
						)}
					</div>
				</div>

				<div className="px-10 relative">
					<label htmlFor="phone_number" className="font-medium">
						Número de Teléfono
					</label>
					<div className="py-3 px-3 rounded-lg border mt-2 border-orange">
						<input
							type="tel"
							id="phone_number"
							className="w-full outline-none bg-transparent"
							name="phone_number"
							placeholder="Ingresa tu número de teléfono"
							value={inputData.phone_number}
							required
							onChange={handleChangeEvent}
						/>
					</div>
					{inputDataError.phoneError && (
						<p className="absolute text-sm text-red-500">
							{inputDataError.phoneError}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default function RegisterForms({
	step,
	setStep,
	selectCard,
	setSelectCardError,
	setSelectCard,
}: {
	step: Number;
	setStep: React.Dispatch<React.SetStateAction<Number>>;
	selectCard: string[];
	setSelectCardError: React.Dispatch<React.SetStateAction<string>>;
	setSelectCard: React.Dispatch<React.SetStateAction<string[]>>;
}) {
	const [tradeLincence, setTradeLincence] = useState<string[]>([]);
	const [craftCard, setCraftCard] = useState<string[]>([]);
	const { CreateUser } = useUserRequests();
	const { isImgUploading, handleImageUpload } = useOnChangeUploadImages();
	const handleError = clientError();
	const [inputData, setInputData] = useState<InputDataType>({
		first_name: "",
		last_name: "",
		company_name: "",
		password: "",
		zip_code: "",
		email_address: "",
		phone_number: "",
		address: "",
		streetAddress: "",
	});
	const [inputDataError, setInputDataError] = useState<FormDataErrorType>({
		passwordError: "",
		zip_codeError: "",
		email_addressError: "",
		selectCardDataError: "",
		phoneError: "",
		company_nameError: "",
		last_nameError: "",
		first_nameError: "",
		addressError: "",
		streetAddressError: "",
	});
	const router = useRouter();

	const handleTradeLiecenseUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const data = await handleImageUpload(event);
		setTradeLincence([data?.secure_url || ""]);
	};

	const handleCraftCardUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const data = await handleImageUpload(event);
		setCraftCard([data?.secure_url || ""]);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errors: FormDataErrorType = {};

		if (!inputData.zip_code) {
			errors.zip_codeError = "El código postal es obligatorio";
		} else if (isNaN(Number(inputData.zip_code))) {
			errors.zip_codeError = "El código postal debe ser un número";
		}
		if (!inputData.address) {
			errors.zip_codeError = "El código postal es inválido";
		}
		if (!inputData.email_address) {
			errors.email_addressError = "El correo electrónico es obligatorio";
		} else if (!/\S+@\S+\.\S+/.test(inputData.email_address)) {
			errors.email_addressError = "El correo electrónico es inválido";
		}
		if (!inputData.phone_number) {
			errors.phoneError = "El número de teléfono es obligatorio";
		}

		if (!inputData.streetAddress) {
			errors.streetAddressError = "La dirección es obligatoria";
		}

		if (Object.keys(errors).length === 0) {
			setStep(3);
			if (step === 3) {
				const userDocument: any = [];
				craftCard.forEach((i) =>
					userDocument.push({
						document_type: "craft_card",
						document_link: i,
					})
				);

				tradeLincence.forEach((i) =>
					userDocument.push({
						document_type: "trade_licence",
						document_link: i,
					})
				);
				if (userDocument.length === 0) {
					return toast.error("Debes subir al menos un documento");
				}

				const userData = {
					name: inputData.first_name,
					phone: inputData.phone_number,
					email: inputData.email_address,
					zipCode: inputData.zip_code,
					role: "handyman",
					lastName: inputData.last_name,
					address: inputData.address,
					streetAddress: inputData.streetAddress,
					craftmanDetails: {
						services: selectCard,
						documents: userDocument,
						company_name: inputData.company_name,
						images: [],
						description: "",
					},
				};

				try {
					await CreateUser.mutateAsync(userData, {
						onSuccess(data) {
							router.push("/");
							toast.success(data?.message);
						},
					});
				} catch (error: any) {
					handleError(error);
				}
			}
		} else {
			setInputDataError(errors);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="space-y-5">
					{step === 2 ? (
						<>
							<InputBoxes
								setInputData={setInputData}
								inputData={inputData}
								setInputDataError={setInputDataError}
								inputDataError={inputDataError}
								imageDataPageData={tradeLincence}
								setImagePageData={setTradeLincence}
							/>
							<div className="py-5 px-2 gap-2">
								<div className="flex justify-end w-full items-center gap-5">
									<button
										onClick={() => setSelectCard([])}
										className="border border-orange px-10 py-3 rounded-lg text-black font-semibold">
										Atrás
									</button>
									<input
										type="submit"
										value={"Próxima"}
										className="bg-orange px-7 py-3 rounded-xl text-md font-semibold text-white cursor-pointer"
									/>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="flex flex-col md:flex-col w-full">
								<div>
									<>
										<div className="ml-10 space-y-4 flex items-center flex-row gap-5 justify-center">
											<div className="flex flex-col sm:flex-row">
												<label
													htmlFor="dropzone-file1"
													className={`flex flex-col items-center ${
														isImgUploading
															? "cursor-not-allowed"
															: "cursor-pointer"
													} justify-center w-28 h-28 border-2 border-orange rounded-xl`}
													style={{
														width: 284,
														height: 226,
														background:
															"rgba(255, 106, 24, 0.3)",
													}}>
													<div className="flex items-center justify-center text-black pt-5 pb-6">
														<BsBook
															className="font-bold text-black-500 text-2xl"
															style={{
																marginRight: 5,
															}}
														/>{" "}
														<span>
															{isImgUploading
																? "Subiendo"
																: "Subir licencia comercial"}
														</span>
													</div>
													<input
														type="file"
														onChange={
															handleTradeLiecenseUpload
														}
														id="dropzone-file1"
														name="myFile1"
														disabled={
															isImgUploading
														}
														title="subir imágenes"
														aria-label="subir imágenes"
														accept="image/*"
														className="hidden"
														multiple
													/>
												</label>

												<div className="flex items-center sm:space-x-4 mt-3 sm:mt-0 flex-wrap">
													{tradeLincence.map(
														(
															dataUrl: string,
															index: number
														) => {
															if (
																tradeLincence[0] !==
																""
															) {
																return (
																	<Image
																		src={dataUrl}
																		alt={`Imagen subida ${index}`}
																		width={110}
																		height={110}
																		key={index}
																		className="object-cover m-1 w-28 h-auto"
																	/>
																);
															}
														}
													)}
												</div>
											</div>
											<div
												style={{ marginTop: 0 }}
												className="flex flex-col sm:flex-row mt-0">
												<label
													htmlFor="dropzone-file2"
													className={`flex flex-col items-center ${
														isImgUploading
															? "cursor-not-allowed"
															: "cursor-pointer"
													} justify-center w-28 h-28 border-2 border-orange rounded-xl cursor-pointer`}
													style={{
														width: 284,
														height: 226,
														background:
															"rgba(255, 106, 24, 0.3)",
													}}>
													<div className="flex items-center justify-center text-black pt-5 pb-6">
														<BsCardImage
															className="font-bold text-black-500 text-2xl"
															style={{
																marginRight: 5,
															}}
														/>{" "}
														<span>
															{isImgUploading
																? "Subiendo"
																: "Subir tarjeta de oficio"}
														</span>
													</div>
													<input
														type="file"
														onChange={
															handleCraftCardUpload
														}
														id="dropzone-file2"
														name="myFile2"
														title="subir imágenes"
														aria-label="subir imágenes"
														accept="image/*"
														className="hidden"
														multiple
													/>
												</label>
												<div className="flex items-center sm:space-x-4 mt-3 sm:mt-0 flex-wrap">
													{craftCard.map(
														(
															dataUrl: string,
															index: number
														) => (
															<Image
																src={dataUrl}
																alt={`Imagen subida ${index}`}
																width={110}
																height={110}
																key={index}
																className="object-cover m-1 w-28 h-auto"
															/>
														)
													)}
												</div>
											</div>
										</div>
									</>
								</div>
								<div className="py-5 px-2 gap-2">
									<div className="flex justify-end w-full items-center gap-5">
										<button
											onClick={() => setStep(2)}
											className="border border-orange px-10 py-3 rounded-lg text-black font-semibold">
											Atrás
										</button>
										<button
											disabled={CreateUser.isPending}
											type="submit"
											className="bg-orange px-7 py-3 rounded-xl text-md disabled:opacity-50 font-semibold text-white cursor-pointer">
											Registrarse
										</button>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
