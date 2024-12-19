import { ClientLayout, FindHandyman } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function Index() {
	return (
		<React.Fragment>
			<Head>
				<title>Client dashboard | Post Job</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/postedjob`} />
			</Head>
			<ClientLayout>
				<main>
					<div className="Container">
						<FindHandyman />
					</div>
				</main>
			</ClientLayout>
		</React.Fragment>
	);
}
