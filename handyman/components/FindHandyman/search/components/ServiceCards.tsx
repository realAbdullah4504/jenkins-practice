import React, { useRef, useState,useEffect} from "react";
import { ServiceCard } from "@/components/ServiceCard";
import SliderCrouserl from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ServicePopUpPage from '@/components/landingPage/components/ServicePopUP';

export default function ServiceCards() {
  const slider = useRef<SliderCrouserl>(null);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]); //service card data
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  useEffect(() => {
    if (!servicePopUp) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [servicePopUp]);
  return (
    <div className="mt-3 sm:px-5 py-3 relative">
        <ServiceCard slider={slider} slidesToShowCustom={7} setServicePopUP={setServicePopUP} setServiceCardData={setServiceCardData}/>
      <div className="text-4xl sm:flex justify-between items-center top-[45%] absolute md:-left-2 md:-right-2 right-0 left-0 hidden" aria-hidden="true">
        <button className="cursor-pointer bg-orange rounded-full text-white" onClick={() => slider.current?.slickPrev()} aria-label="Left shift" aria-hidden="true">
          <IoIosArrowBack className="text-[48px] sm:text-[30px]" />
        </button>
        <button className="cursor-pointer bg-orange rounded-full text-white" onClick={() => slider.current?.slickNext()} aria-label="right shift" aria-hidden="true">
          <IoIosArrowForward className="text-[48px] sm:text-[30px]" />
        </button>
      </div>
      {servicePopUp && (
        <div className="fixed -top-8 left-0 right-0 bottom-0 bg-[rgba(189,189,189,0.6)] z-50">
          <div className="overflow-y-auto">
          <ServicePopUpPage setServicePopUP={setServicePopUP} servicePopUp={servicePopUp} serviceCardData={serviceCardData}/>
          </div>
        </div>
      )}
    </div>
  );
}
