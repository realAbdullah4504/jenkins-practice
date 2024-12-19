import React from "react";
import { Footer, Job } from "@/components";
import Head from "next/head";
import {Header} from '@/components';

export default function JobDetails() {
  return (
    <div className="bg-mainBackground">
       <Head>
        <title>Craftsman experto necesitaba para el piso en el baño, la cocina, el salón</title>
        <meta name="description" content="¿Busca un artesano hábil para manejar el piso en el baño, la cocina, el salón?Haga una oferta y conéctese con artesanos talentosos que se especializan en el piso en el baño, la cocina, el salón.Encuentre la coincidencia perfecta para su proyecto y garantice la mano de obra de calidad.Comience ahora y da vida a su visión con la ayuda de artesanos expertos." />
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="#" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header className="white flex justify-between items-center bg-white shadow-lg px-5 py-6 z-50">
        <div className="Container">
          <div className="flex items-center gap-3">
            <ImArrowLeft2 className="text-2xl cursor-pointer" onClick={()=>router.push('/')}/>
            <span className="font-bold text-xl">Job Details</span>
          </div>
        </div>
        <div/>
      </header> */}
      <header className="Container">
        <Header/>
     </header>
      <div className="Container pt-24">
        <Job />
      </div>
      <Footer/>
    </div>
  );
}
