import { HandymanLayout, HandyManMessages } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function changeemail() {
  return (
    <React.Fragment>
      <Head>
        <title>Messages</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/messages`} />
      </Head>
      <div className="bg-mainBackground min-h-screen">
      <HandymanLayout>
        <main className="">
          <div className="Container">
            <HandyManMessages />
          </div>
        </main>
      </HandymanLayout>
      </div>
    </React.Fragment>
  );
}
