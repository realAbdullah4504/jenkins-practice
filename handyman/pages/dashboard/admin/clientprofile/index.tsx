import { AdminDashBoard, ClientProfile } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function Index() {
	return (
		<React.Fragment>
			<Head>
				<title>Admin | Client profile</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/clientprofile`} />
			</Head>
			<AdminDashBoard>
				<main className="">
					<div className="Container ">
						<ClientProfile />
					</div>
				</main>
			</AdminDashBoard>
		</React.Fragment>
	);
}
