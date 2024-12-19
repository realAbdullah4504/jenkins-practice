import React from "react";
import { AdminDashBoard, ClientLayout, ClientMessages, Messages } from "@/components/Dashboard";
import Head from "next/head";

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
         <AdminDashBoard>
      <main className="h-screen bg-mainBackground">
          <div className="Container pt-24">
            <Messages />
          </div>
        </main>
      </AdminDashBoard>
    </React.Fragment>
  );
}
