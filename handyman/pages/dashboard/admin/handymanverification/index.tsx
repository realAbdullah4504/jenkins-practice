import { AdminDashBoard, HandymanVerification } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function changeemail() {
	return (
		<React.Fragment>
			<Head>
				<title>Handyman Verification | Admin</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/handymanverification`} />
			</Head>
			<AdminDashBoard>
				<main>
					<div className="Container">
						<HandymanVerification />
					</div>
				</main>
			</AdminDashBoard>
		</React.Fragment>
	);
}
