import { ClientLayout, ClientMessages } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function changeemail() {
	return (
		<React.Fragment>
			<Head>
				<title>Messages</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/messages`} />
			</Head>
			<ClientLayout>
				<main>
					<div className="Container">
						<ClientMessages />
					</div>
				</main>
			</ClientLayout>
		</React.Fragment>
	);
}
