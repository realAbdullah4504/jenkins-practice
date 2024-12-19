import React, { useEffect, useRef, useState } from "react";
import SliderCrouserl from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ServiceCard } from "@/components/ServiceCard";
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
  return (
    <div className="w-full ">
   
          <ServiceCard slider={slider} slidesToShowCustom={7} setServicePopUP={setServicePopUP} setServiceCardData={setServiceCardData}/>
      
      {servicePopUp && (
        <div className="fixed inset-0 bg-[rgba(189,189,189,0.6)] z-50">
          <div className="max-h-full overflow-y-auto">
            <ServicePopUpPage setServicePopUP={setServicePopUP} servicePopUp={servicePopUp} serviceCardData={serviceCardData}/>
          </div>
        </div>
      )}
    </div>
  );
}
