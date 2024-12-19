import React from "react";
import Head from "next/head";
import { AdminDashBoard, AdminReviewsSection, ClientLayout, ReviewsAndFeedbackClient } from "@/components/Dashboard";

export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Client | Reviews & Feedback</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/reviewsandfeedback`} />
      </Head>
      <AdminDashBoard>
        <main className="h-full bg-mainBackground ">
          <div className="Container pt-24 flex justify-center">
            <AdminReviewsSection />
          </div>
        </main>
      </AdminDashBoard>
    </React.Fragment>
  );
}
