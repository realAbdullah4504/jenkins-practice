import React, { useEffect, useState } from "react";
import Page1 from "./page/Step1";
import Page2 from "./page/Step2";
import Page3 from "./page/Step3";
import Page4 from "./page/Step4";
import Page5 from "./page/Step5";
import Page6 from "./page/Step6";
import Page7 from "./page/Step7";
import Page8 from "./page/Step8";

import useJobpostRequests from "@/ApiRequests/jobpost";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import { getLocationByZipCode } from "@/helper/getLocationByZipcode";
import useApiCaller from "@/hooks/useApiCaller";
import { toast } from "react-hot-toast";
import { useMultiStepForm } from "./useMultiStepForm";
import { error } from "console";
export default function Service({
  setServicePopUP,
  serviceCardPopUPData,
  setSentData,
  serviceTitle,
  serviceCardData,
}: {
  setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
  serviceCardPopUPData: serviceCardPopUPDataType;
  setSentData: React.Dispatch<React.SetStateAction<boolean>>;
  serviceTitle: string[];
  serviceCardData: string[] | undefined;
}) {
  // all job queiry hooks
  const { CreateJobPost } = useJobpostRequests();
  const handleError = clientError();
  // user jobs
  const { userData } = useAuth();

  // contact details
  const contacts = { ...userData[0] };

  const [page1Data, setPage1Data] = useState<Page1DataType>({
    //Page1 data
    service_title: "",
    other_title: "",
    square_meters: "",
  });
  const [titleError, handleTitleError] = useState<string>("");
  const [textAreaPageData, setTextAreaPageData] = useState<string>(""); //page3 data
  const [imageDataPageData, setImagePageData] = useState<string[]>([]); //page4 data
  const [locationDataPage, setLocationDataPage] = useState<string>(""); //page5 data

  const [addressId, setAddressId] = React.useState<string>("");
  const [locationDataPageError, setlocationDataPageError] =
    useState<string>("");

  const [working_SchedulePage, setWorking_SchedulePage] = useState<
    "flexible" | "rápidamente" | "en_una_semana" | "en_3_meses"
  >("flexible"); //page6 data
  const [working_SchedulePageError, setWorking_SchedulePageError] =
    useState<string>("");

  // const [isJobPosted, setIsJobPosted] = useState(false);
  const apiCaller = useApiCaller();
  const [contactDetailsPage, setContactDetailsPage] =
    useState<ContactDetailsPageDataType>({
      //page7 data
      name: contacts?.name ? contacts?.name : "",
      email: contacts?.email ? contacts?.email : "",
      phone: contacts?.phone ? contacts?.phone : "",
      password: "",
      address: "",
    });

  const [contactDetailsPageError, setContactDetailsPageError] =
    useState<ContactDetailsPageDataTypeError>({
      nameError: "",
      emailError: "",
      phoneError: "",
    });
  const [numberOfElement, setNumberOfElement] = useState<NumberOfElementType>({
    square_meters: "",
    how_many_rooms: "",
    how_many_floors: "",
  });

  const [isNextBtnDisable, setIsNextBtnDisable] = useState<boolean>(false);
  const [isPostJobBtnDisable, setIsPostJobBtnDisable] =
    useState<boolean>(false);
  const {
    currentStepIndex,
    step,
    back,
    next,
    isFirstStep,
    isLastStep,
    setIsLastStep,
  } = useMultiStepForm([
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
        setWorking_SchedulePage,
        working_SchedulePage,
        working_SchedulePageError,
        setWorking_SchedulePageError,
      }}
    />,

    <Page6
      key={6}
      {...{
        setContactDetailsPage,
        contactDetailsPageError,
        contactDetailsPage,
        setIsNextBtnDisable,
        isNextBtnDisable,
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
    <Page8
      key={8}
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
  ]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  async function handleNext() {
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
      console.log("Step 1");

      if (userData.length && currentStepIndex === 3) {
        setIsLastStep(true);
      }
      next();
    }

    if (currentStepIndex === 4) {
      console.log("Step 4");

      userData.length && setIsLastStep(true);
      next();
      return;
    }

    if (currentStepIndex === 5) {
      console.log("Step 5");
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
      } else {
        try {
          console.log("Step 5 try");
          const { data, status } = await apiCaller.get(
            `/user?email=${contactDetailsPage.email}`
          );
          if (status === 200) {
            if (data.role === "handyman") {
              handleError("Solo las clientas pueden publicar trabajos");
            } else {
              console.log("Step 5 try 200");
              setIsNextBtnDisable(true);
              toast.success("El usuario ya existe. Por favor, ingrese su contraseña");
              setContactDetailsPage((pre) => ({
                ...pre,
                name: data.name,
                phone: data.phone,
                email: data.email,
              }));
              console.log("Step 5 try setconta");
              setLocationDataPage(data.zipCode);
              console.log(
                "Step 5 try setconta1",
                data,
                data.address.Postal_Code
              );

              //const locationName = await getLocationByZipCode(
              //	data.address.Postal_Code
              //);
              //console.log("Step 5 try setconta2", locationName, locationName[0].location)

              //setAddressId(locationName[0].location);
              console.log("Step 5 try setcont3");

              setIsLastStep(true);
              return;
            }
          }
        } catch (error: any) {
          console.log("Step 5 catch");
          setContactDetailsPage((pre) => ({
            ...pre,
            name: contacts?.name ? contacts?.name : "",
            phone: contacts?.phone ? contacts?.phone : "",
            password: "",
          }));
          setLocationDataPage("");
          setAddressId("");
          next();
        }
      }
    }

    if (currentStepIndex === 6) {
      console.log("Step 6");
      if (contactDetailsPage.name === "") {
        setContactDetailsPageError((e) => ({
          ...e,
          nameError: "Se requiere el nombre",
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
      } else {
        setIsLastStep(true);
        next();
      }
    }
  }

  function handleBack() {
    back();
    setIsLastStep(false);
    switch (currentStepIndex) {
      case 4:
        setlocationDataPageError("");

        break;
      case 5:
        setWorking_SchedulePageError("");

        setIsNextBtnDisable(false);
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

  async function handleSendJOB() {
    if (currentStepIndex === 5) {
      if (contactDetailsPage.password === "")
        return setContactDetailsPageError((e) => ({
          ...e,
          emailError: "Se requiere contraseña",
        }));

      if (contactDetailsPage.password.length < 8)
        return setContactDetailsPageError((e) => ({
          ...e,
          emailError: "La contraseña debe tener al menos 8 carácter",
        }));
    }
    // console.log('sdfasdf')
    if (locationDataPage !== "" && currentStepIndex === 7) {
      if (addressId === "") {
        setlocationDataPageError("Ubicación no encontrada");
        console.log("sdfasdf");
        return;
      }
    } else if (currentStepIndex === 7) {
      setlocationDataPageError("Se requiere código postal");
      return;
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
      serviceCardPopUPData.working_schedule = working_SchedulePage;
      serviceCardPopUPData.contactDetails = {
        ...contactDetailsPage,
        address: addressId,
      };

      // posting data to save in the data base
      try {
        let newData = {
          ...serviceCardPopUPData,
          category: serviceCardData && serviceCardData[0],
        };

        // saving job post to db
        await CreateJobPost.mutateAsync(newData, {
          onSuccess(data) {},
        });
      } catch (error) {
        console.log(error);
        handleError(error);
      }

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

  useEffect(() => {
    if (!isNextBtnDisable && currentStepIndex === 5) {
      setIsLastStep(false);
    }
    if (
      !isNextBtnDisable &&
      currentStepIndex === 5 &&
      contactDetailsPage.password
    ) {
      setIsNextBtnDisable(false);
    }
  }, [
    isNextBtnDisable,
    currentStepIndex,
    setIsLastStep,
    setIsNextBtnDisable,
    contactDetailsPage.password,
  ]);

  return (
    <div>
      {step}
      <div className="pb-5">
        <div className="space-x-8">
          {isFirstStep ? (
            <button
              onClick={() => setServicePopUP(false)}
              className="border border-orange md:px-7 px-5 md:py-2 py-1 rounded-lg shadow ml-5 "
            >
              Atrás
            </button>
          ) : (
            <button
              onClick={handleBack}
              className="border border-orange md:px-7 px-5 md:py-2 py-1 rounded-lg shadow bg-white md:ml-9 lg:ml-[5rem] ml-5"
            >
              Atrás
            </button>
          )}
          {!isLastStep ? (
            <button
              onClick={handleNext}
              disabled={isNextBtnDisable}
              className={`border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white ${
                isNextBtnDisable && "cursor-not-allowed opacity-50"
              }`}
            >
              Próxima
            </button>
          ) : (
            <button
              disabled={CreateJobPost.isPending || isPostJobBtnDisable}
              onClick={handleSendJOB}
              className="border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white disabled:cursor-not-allowed disabled:opacity-20"
            >
              Puesta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
