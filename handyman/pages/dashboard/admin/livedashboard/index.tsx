import {
	AdminDashBoard
} from "@/components/Dashboard";
import LiveDashboard from "@/components/Dashboard/admin/LiveDashboard";
import Head from "next/head";
import React from "react";
export default function Index() {
	return (
		<React.Fragment>
			<Head>
				<title>Admin | Live Dashboard View</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/livedashboard`} />
			</Head>
			<AdminDashBoard>
				<main className="w-full">
					<div className="Container">
						<LiveDashboard />
					</div>
				</main>
			</AdminDashBoard>
		</React.Fragment>
	);
}
