import React from "react";
import HeroSearchAndText from './components/HeroSearchAndText';
import Image from "next/image";
import HeroImage from '../../public/LandingPage/landingPage.png';

export default function Hero() {
  return (
    <div className="w-full lg:px-5 px-1 mt-5 ">
    <div className="flex items-start justify-between flex-col lg:flex-row gap-3 md:gap-0">
      <Image src={"/heroPageImages/HeroPageSticker.webp"} alt="Sticker" className="h-auto w-auto absolute top-20 -left-3 -z-10 " width={100} height={100}/>
      <HeroSearchAndText homePageOrNOt={true}/>
      <div className="pt-6 relative mt-10 lg:mt-0">
        <Image src={"/heroPageImages/Hero-img.webp"} className="h-auto w-auto" alt="Handyman" width={660} height={660}/>
        <Image src={"/heroPageImages/HeroPageSticker2.webp"} alt="Sticker" className="h-auto w-auto absolute bottom-20 -z-10 -left-10" width={100} height={100}/>
      </div>
      </div>
    </div>
  );
}
