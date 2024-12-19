import React from "react";
import { ImArrowLeft2 } from "react-icons/im";
import { useRouter } from "next/router";
import {FindHandyman} from '@/components';
import {Footer} from '@/components';
import Head from "next/head";
import {Header} from '@/components';

export default function Find_Handyman() {
  const router = useRouter();
  return (
    <div className="bg-mainBackground">
       <Head>
        <title>Find Qualified Craftsmen Conveniently Online with MyCraftsman</title>
        <meta name="description" content="Discover the convenience of finding qualified craftsmen in your area with MyCraftsman. Say goodbye to endless waiting, hidden costs, and unpleasant surprises. " />{" "}
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/findhandyman`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header className="white flex justify-between items-center bg-white shadow-lg px-5 py-6 w-full fixed z-50 left-0 right-0 top-0">
        <div className="Container">
          <div className="flex items-center gap-3">
            <ImArrowLeft2 className="text-2xl cursor-pointer" onClick={() => router.push("/")}/>
            <span className="font-bold text-xl">Find Handyman</span>
          </div>
        </div>
        <div />
      </header> */}
      <header className="Container">
        <Header/>
      </header>
      <FindHandyman/>
      <Footer/>
    </div>
  );
}
