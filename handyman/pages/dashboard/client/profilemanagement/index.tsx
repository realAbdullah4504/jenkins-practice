import {
  ClientLayout,
  ProfileManagement
} from "@/components/Dashboard";
import Head from "next/head";
import React from "react";
export default function PostedJOBPage() {
	return (
		<React.Fragment>
			<Head>
				<title>Client | Profile Management</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/profilemanagement`} />
			</Head>
			<ClientLayout>
				<main className="">
					<div className="Container">
						<ProfileManagement />
					</div>
				</main>
			</ClientLayout>
		</React.Fragment>
	);
}
