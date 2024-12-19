import { useMultiStepForm } from "@/components/landingPage/components/service/useMultiStepForm";
import React, { useState } from "react";
import Page1 from "./page/Step1";
import Page2 from "./page/Step2";
import Page3 from "./page/Step3";
import Page4 from "./page/Step4";
import Page5 from "./page/Step5";
import Page6 from "./page/Step6";
import Page7 from "./page/Step7";
export default function Service({
	setServicePopUP,
	serviceCardPopUPData,
	setSentData,
	serviceTitle,
}: {
	setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
	serviceCardPopUPData: serviceCardPopUPDataType;
	setSentData: React.Dispatch<React.SetStateAction<boolean>>;
	serviceTitle: string[];
}) {
	const [page1Data, setPage1Data] = useState<Page1DataType>({
		//Page1 data
		service_title: "",
		other_title: "",
		square_meters: "",
	});
	// const {userData} = useAuth()
	// const isLoggedIn = userData[0]?.accessToken;
	const [titleError, handleTitleError] = useState<string>("");
	const [textAreaPageData, setTextAreaPageData] = useState<string>(""); //page3 data
	const [imageDataPageData, setImagePageData] = useState<string[]>([]); //page4 data
	const [locationDataPage, setLocationDataPage] = useState<string>(""); //page5 data
	const [addressId, setAddressId] = React.useState<string>("");
	const [locationDataPageError, setlocationDataPageError] =
		useState<string>("");
	const [working_SchedulePage, setWorking_SchedulePage] = useState<
		"POR DEFECTO" | "Rápidamente" | "En una semana" | "En 3 meses" | "Flexible"
	>("POR DEFECTO"); //page6 data
	const [working_SchedulePageError, setWorking_SchedulePageError] =
		useState<string>("");
	const [contactDetailsPage, setContactDetailsPage] =
		useState<ContactDetailsPageDataType>({
			//page7 data
			name: "",
			email: "",
			phone: "",
			address: "",
			password: "",
		});
	const [contactDetailsPageError, setContactDetailsPageError] =
		useState<ContactDetailsPageDataTypeError>({
			nameError: "",
			emailError: "",
			phoneError: "",
		});
	const [numberOfElement, setNumberOfElement] = useState<NumberOfElementType>(
		{
			square_meters: "",
			how_many_rooms: "",
			how_many_floors: "",
		}
	);
	const [isNextBtnDisable, setIsNextBtnDisable] = useState<boolean>(false);
	const { currentStepIndex, step, back, next, isFirstStep, isLastStep } =
		useMultiStepForm([
			<Page1
				key={1}
				{...{
					setPage1Data,
					page1Data,
					titleError,
					handleTitleError,
					serviceTitle,
				}}
			/>,
			<Page2
				key={2}
				numberOfElement={numberOfElement}
				setNumberOfElement={setNumberOfElement}
			/>,
			<Page3 key={3} {...{ setTextAreaPageData, textAreaPageData }} />,
			<Page4 key={4} {...{ setImagePageData, imageDataPageData }} />,
			<Page5
				key={5}
				{...{
					setLocationDataPage,
					locationDataPage,
					locationDataPageError,
					setlocationDataPageError,
					setAddressId,
					addressId,
					setIsNextBtnDisable,
				}}
			/>,
			<Page6
				key={6}
				{...{
					setWorking_SchedulePage,
					working_SchedulePage,
					working_SchedulePageError,
					setWorking_SchedulePageError,
				}}
			/>,
			<Page7
				key={7}
				{...{
					setIsNextBtnDisable,
					setContactDetailsPage,
					contactDetailsPageError,
					contactDetailsPage,
					isNextBtnDisable,
				}}
			/>,
		]);
	function handleNext() {
		if (page1Data.service_title !== "" || page1Data.other_title !== "") {
			if (currentStepIndex === 0) {
				next();
			}
		} else handleTitleError("¿Puedes responder esta pregunta?");
		if (
			currentStepIndex === 1 ||
			currentStepIndex === 2 ||
			currentStepIndex === 3
		) {
			next();
		}
		if (locationDataPage !== "" && currentStepIndex === 4) {
			if (isNaN(Number(locationDataPage))) {
				setlocationDataPageError("El código postal debe ser un número");
			} else if (locationDataPage.trim().length !== 5) {
				setlocationDataPageError("El código postal debe tener 4 caracteres");
			} else if (addressId === "") {
				setlocationDataPageError("Ubicación no encontrada");
			} else {
				next();
			}
		} else if (currentStepIndex === 4)
			setlocationDataPageError("Se requiere código postal");
		if (working_SchedulePage !== "POR DEFECTO" && currentStepIndex === 5) {
			next();
		} else if (currentStepIndex === 5)
			setWorking_SchedulePageError("Se requiere la fecha de inicio del proyecto");
	}
	function handleBack() {
		back();
		switch (currentStepIndex) {
			case 4:
				setlocationDataPageError("");
				break;
			case 5:
				setWorking_SchedulePageError("");
				break;
			case 6:
				setContactDetailsPageError({
					nameError: "",
					emailError: "",
					phoneError: "",
				});
				break;
			default:
				break;
		}
	}

	function handleSendJOB() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (contactDetailsPage.name === "") {
			setContactDetailsPageError((e) => ({
				...e,
				nameError: "Se requiere el nombre",
			}));
		}
		if (contactDetailsPage.email === "") {
			setContactDetailsPageError((e) => ({
				...e,
				emailError: "Se requiere correo electrónico",
			}));
		} else if (!emailRegex.test(contactDetailsPage.email)) {
			setContactDetailsPageError((e) => ({
				...e,
				emailError: "El correo electrónico no es válido",
			}));
		}
		if (contactDetailsPage.phone === "") {
			setContactDetailsPageError((e) => ({
				...e,
				phoneError: "Se requiere número de teléfono",
			}));
		} else if (isNaN(Number(contactDetailsPage.phone))) {
			setContactDetailsPageError((e) => ({
				...e,
				phoneError: "Debe ser un número",
			}));
		}
		if (
			contactDetailsPage.name !== "" &&
			contactDetailsPage.email !== "" &&
			contactDetailsPage.phone !== "" &&
			emailRegex.test(contactDetailsPage.email) &&
			!isNaN(Number(contactDetailsPage.phone)) &&
			locationDataPageError !== "Ubicación no encontrada"
		) {
			serviceCardPopUPData.serviceTitle = page1Data;
			serviceCardPopUPData.additional_details.square_meters =
				numberOfElement.square_meters;
			serviceCardPopUPData.additional_details.how_many_floors =
				numberOfElement.how_many_floors;
			serviceCardPopUPData.additional_details.how_many_rooms =
				numberOfElement.how_many_rooms;
			serviceCardPopUPData.additional_job_description = textAreaPageData;
			serviceCardPopUPData.images = imageDataPageData;
			serviceCardPopUPData.location = addressId;
			// serviceCardPopUPData.location_of_job.zip_code = locationDataPage;
			serviceCardPopUPData.working_schedule = working_SchedulePage;
			serviceCardPopUPData.contactDetails = contactDetailsPage;
			setSentData(true);
			setContactDetailsPage({
				name: "",
				email: "",
				phone: "",
				password: "",
				address: "",
			});
		}
	}
	return (
		<div>
			{step}
			<div className="pb-5">
				<div className="space-x-8">
					{isFirstStep ? (
						<button
							onClick={() => setServicePopUP(false)}
							className="border border-orange md:px-7 px-5 md:py-2 py-1 rounded-lg shadow ml-5 ">
							Atrás
						</button>
					) : (
						<button
							onClick={handleBack}
							className="border border-orange md:px-7 px-5 md:py-2 py-1 rounded-lg shadow bg-white md:ml-9 lg:ml-[5rem] ml-5">
							Atrás
						</button>
					)}
					{!isLastStep ? (
						<button
							onClick={handleNext}
							disabled={isNextBtnDisable}
							className={`border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white ${
								isNextBtnDisable &&
								"cursor-not-allowed opacity-50"
							}`}>
							Próxima
						</button>
					) : (
						<button
							disabled={isNextBtnDisable}
							onClick={handleSendJOB}
							className="border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white disabled:cursor-not-allowed disabled:opacity-20">
							Puesta
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
