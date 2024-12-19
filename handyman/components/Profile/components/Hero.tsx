import { AllServices } from "@/components/landingPage/components";
import getAverageRating from "@/helper/getAverageRatings";
import Image from "next/image";
import React, { useState } from "react";
import { CiLocationOn, CiPhone, CiLocationArrow1 } from "react-icons/ci";
import { GoUnverified } from "react-icons/go";
export default function Hero({ data = {} }: any) {
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  const [serviceCardData, setServiceCardData] = useState<string>("");
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  const Request_a_Quote__PopUp = ({
    serviceCardData,
    showArrows,
    setServiceCardData,
  }: {
    setServiceCardData: React.Dispatch<React.SetStateAction<string>>;
    serviceCardData: string;
    showArrows: Boolean;
  }) => {
    return (
      <>
        <div className="bg-white rounded-md p-3">
          <h1 className="text-4xl py-5 font-bold">Elija cualquier servicio</h1>
          <AllServices />
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex justify-around items-center relative bg-white rounded-md flex-col lg:flex-row lg:py-10 shadow">
      <div className="absolute w-full md:h-52 h-40 bg-orange top-0 -z-0 rounded-t-md opacity-70" />
      <div className="z-10 sm:px-10 my-5 sm:w-2/3 w-full">
        <div className="flex justify-center items-center text-center flex-col mt-20 lg:mt-20 mb-6">
          <Image
            src={data?.user?.profile_photo}
            alt="user name"
            width={100}
            height={100}
            className=" rounded-full w-24 h-24 border border-4 border-white shadow "
          />

          <div>
            <div className="flex justify-center flex-col items-center text-center mb-1 ">
              <h1 className="font-bold text-2xl">{data?.company_name}</h1>
              <div className="flex items-center justify-center">
                {data.status === "verified" ? (
                  <Image
                    src={"/ProfileTest/verified.svg"}
                    alt="verifed"
                    width={100}
                    height={100}
                    className="w-auto h-auto"
                  />
                ) : (
                  <GoUnverified className="mr-1" />
                )}
                <span>
                  {data.status === "verified" ? "Verificada" : "Inconfirmado"}
                </span>
              </div>
            </div>

            <div className="flex items-center px-[20px] mb-3">
              {data?.reviews ? (
                <>
                  <div className="flex">
                    {Array.from({
                      length: 5,
                    })
                      .fill(0)
                      .map((item: any, ind: number) => (
                        <span
                          key={ind}
                          className={`text-3xl ${
                            ind < getAverageRating(data?.reviews)
                              ? "text-yellow-400"
                              : "text-gray-400"
                          } focus:outline-none`}
                        >
                          ★
                        </span>
                      ))}
                  </div>
                  <span className="inline-block mt-2 ml-1">
                    {data?.reviews?.length}
                  </span>
                </>
              ) : (
                "No review"
              )}
            </div>
            <h1 className="mb-1">
              {data?.user?.name} {data?.user?.lastName}
            </h1>
            <div className="flex items-center px-[20px] gap-1 font-medium mb-1">
              <CiLocationArrow1 />
              {data?.user?.streetAddress}
            </div>
            <div className="flex items-center px-[20px] gap-1 font-medium mb-1">
              <CiPhone />
              {data?.user?.phone}
            </div>
            <div className="flex items-center px-[20px] gap-1 font-medium mb-1">
              <CiLocationOn />
              <span>{data?.user?.address?.Place_Name}</span>
              <span>{data?.user?.address?.Postal_Code}</span>
            </div>
            {/* <div className="bg-white p-1 flex items-center rounded-full group-hover:bg-gray-200">
							<IoCallOutline className="text-black mr-2" />{" "}
							{data?.phone}
						</div> */}
          </div>
        </div>
      </div>
      <div className="z-10 mb-10 w-full lg:flex lg:justify-end lg:pr-32 lg:mt-20 pl-10">
        {/* <a onClick={() => {setServicePopUP(true);setServiceCardData('')}}>
          <button className="bg-white border border-orange px-4 py-2 rounded-lg hover:bg-orange hover:text-white">Request a Quote</button>
        </a> */}
      </div>
      {servicePopUp && (
        <div className="min-h-screen overflow-scroll w-full fixed inset-0 bg-gray-200 z-50 bg-opacity-50 flex justify-center items-center">
          <Request_a_Quote__PopUp
            showArrows={false}
            setServiceCardData={setServiceCardData}
            serviceCardData={serviceCardData}
          />
        </div>
      )}
    </div>
  );
}
