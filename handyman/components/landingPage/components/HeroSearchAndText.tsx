import { ServiceCards } from "@/constants/landingPage";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import ServicePopUpPage from "./ServicePopUP";
type SearchProps = {
  id: number;
  icon: string;
  shortText: string;
  slug: string;
};
export default function HeroSearchAndText({
  homePageOrNOt = false,
  title = true,
  searchDefaultField = "",
}: {
  homePageOrNOt: boolean;
  title?: boolean;
  searchDefaultField?: string;
}) {
  const [Services, setServices] = useState<SearchProps[]>([
    {
      id: 0,
      icon: "",
      shortText: "",
      slug: "",
    },
  ]);
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]);
  const [userType, setUserType] = useState<string[]>([searchDefaultField]);
  useEffect(() => {
    if (!servicePopUp) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [servicePopUp]);
  const HandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const SearchVal = ServiceCards.sort((a, b) =>
        a.shortText.localeCompare(b.shortText)
      ).filter((item) =>
        item.shortText.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setServices(SearchVal);
      setUserType([e.target.value]);
    },
    [setServices]
  );
  const FindService = () => {
    if (userType[0] !== "") {
      setServiceCardData(userType);
      setServicePopUP(true);
      setUserType([""]);
    }
  };

  return (
    <section
      className={`${
        homePageOrNOt
          ? "lg:w-1/2 md:space-y-10  space-y-5"
          : "flex flex-col items-center justify-center space-y-4"
      } w-full  lg:mt-5 py-12 `}
    >
      {title && (
        <h1
          className={`${
            homePageOrNOt ? "sm:text-[4rem]" : "text-center"
          } text-5xl font-bold leading-tight `}
        >
          Encuentra manita profesional para todos tus{" "}
          <span
            className={`text-orange  text-5xl ${
              homePageOrNOt && "sm:text-[4rem]"
            } font-bold`}
          >
            Proyectos en el hogar
          </span>
        </h1>
      )}
      <div className={`mb-6 ${homePageOrNOt ? "mr-20  w-full" : "w-3/4"}`}>
        <p className="text-gray-500">
          Encuentre la manita directa rápidamente: use nuestra barra de búsqueda
          y obtenga gratis oferta
        </p>
        <div className="bg-white relative mt-3">
          <div className="flex w-full  shadow-md   z-0 absolute rounded-md">
            <input
              type="text"
              placeholder="e.g   Pintora"
              name="search_service"
              className="grow px-3 py-3  border-2 border-r-0 rounded-l-md outline-none"
              title="Search our services"
              onChange={HandleChange}
              value={userType[0]}
            />
            <button
              className="bg-orange py-3 shadow-md px-4 text-white rounded-r-md hover:text-black"
              onClick={() => FindService()}
              disabled={userType.length == 0}
            >
              Puesta
            </button>
          </div>
          <div
            className={`border-2 bg-white py-5 shadow-md rounded-b-md  w-full absolute z-20 top-10 ${
              userType.length !== 0 && userType[0] !== "" ? "block" : "hidden"
            }`}
          >
            {Services.length !== 0 ? (
              Services.slice(0, 14).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-start items-center mx-3"
                >
                  <Image
                    src={item.icon}
                    alt={item.shortText}
                    width={28}
                    height={28}
                  />
                  <span
                    className="px-2 py-1 hover:text-gray-700 text-gray-500 cursor-pointer"
                    onClick={() => setUserType([item.shortText, item.slug])}
                  >
                    {item.shortText}
                  </span>
                </div>
              ))
            ) : (
              <span className="px-2 py-1 hover:text-gray-700 text-gray-500 cursor-pointer">
                Servicio no encontrado
              </span>
            )}
          </div>
        </div>
      </div>
      {servicePopUp && (
        <div className="fixed left-0 right-0 -top-10 bottom-0 bg-[rgba(189,189,189,0.6)] z-50">
          <div className="max-h-full overflow-y-auto">
            <ServicePopUpPage
              setServicePopUP={setServicePopUP}
              servicePopUp={servicePopUp}
              serviceCardData={serviceCardData}
            />
          </div>
        </div>
      )}
    </section>
  );
}
