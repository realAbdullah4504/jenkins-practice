import { ServiceCard } from "@/components/ServiceCard";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";
import ServicePopUpPage from "./ServicePopUP";

export default function AllServices() {
  const slider = useRef<SliderCrouserl>(null);
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]);
  useEffect(() => {
    if (!servicePopUp) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [servicePopUp]);
  // console.log(serviceCardData, "serviceCard data");
  return (
    <div className="w-full px-[50px]">
      <div className="relative">
        <div className="mt-3 sm:px-5 py-3">
          <ServiceCard
            slider={slider}
            slidesToShowCustom={7}
            setServicePopUP={setServicePopUP}
            setServiceCardData={setServiceCardData}
          />
          <div
            className="text-4xl sm:flex justify-between items-center top-[45%] absolute md:-left-2 md:-right-2 right-0 left-0 hidden"
            aria-hidden="true"
          >
            <button
              className="cursor-pointer bg-orange rounded-full text-white"
              onClick={() => slider.current?.slickPrev()}
              aria-label="Left shift"
              aria-hidden="true"
            >
              <IoIosArrowBack className="text-[48px] sm:text-[30px]" />
            </button>
            <button
              className="cursor-pointer bg-orange rounded-full text-white"
              onClick={() => slider.current?.slickNext()}
              aria-label="right shift"
              aria-hidden="true"
            >
              <IoIosArrowForward className="text-[48px] sm:text-[30px]" />
            </button>
          </div>
        </div>
      </div>
      {servicePopUp && (
        <div className="fixed inset-0 bg-[rgba(189,189,189,0.6)] z-50">
          <div className="max-h-full overflow-y-auto">
            <ServicePopUpPage
              setServicePopUP={setServicePopUP}
              servicePopUp={servicePopUp}
              serviceCardData={serviceCardData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
