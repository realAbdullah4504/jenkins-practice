import {
  Craftsman,
  Footer,
  Header,
  Hero,
  NewListedOrder,
  RegisterNowForFree,
  Services,
  Steps,
} from "@/components";
import Head from "next/head";
import React from "react";
export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Handyman</title>
        <meta
          name="description"
          content="Discover professional handyman services to enhance your home with expert support. Find skilled craftsmen for all your home projects, from repairs to renovations. Explore our new listed orders and register now to reach local customers and expand your business. Trust our excellent craftsmen to deliver exceptional results and bring your vision to life with precision and expertise. Don't wait, take the first step towards transforming your home today!"
        />{" "}
        {/*Short description more effective for SEO*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="Container space-y-20">
          <Header />
          <Hero />
        </div>
        <div className="bg-mainBackground">
          <div className="py-3 mt-10">
            <Services />
            <Steps isShowHeadingText={true} />
            <NewListedOrder />
          </div>
          <RegisterNowForFree />
          <Craftsman />
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
}
