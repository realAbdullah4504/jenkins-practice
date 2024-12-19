import React from "react";
import { AdminDashBoard, ClientLayout, JobPostings, StatisticsAndAnalytics } from "@/components/Dashboard";
import Head from "next/head";
export default function Index() {
  return (
    <React.Fragment>
        <Head>
        <title>Admin | Statistics and Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/statisticsandanalytics`} />
      </Head>
      <AdminDashBoard>
        <main className="h-screen bg-mainBackground">
          <div className="Container pt-24">
            <StatisticsAndAnalytics />
          </div>
        </main>
      </AdminDashBoard>
    </React.Fragment>
  );
}
