import { HandymanLayout, SubcriptionManagement } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function Index() {
	return (
		<React.Fragment>
			<Head>
				<title>Handyman | Subscription Management</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/subscriptionmanagement`} />
			</Head>
			<div className="bg-mainBackground ">
				<HandymanLayout>
					<main className="min-h-screen ">
						<div className="Container  flex justify-center">
							<SubcriptionManagement />
						</div>
					</main>
				</HandymanLayout>
			</div>
		</React.Fragment>
	);
}
