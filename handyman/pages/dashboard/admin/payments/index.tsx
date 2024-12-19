import { AdminDashBoard, Payments } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function changeemail() {
	return (
		<React.Fragment>
			<Head>
				<title>Payments | Admin</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/payments`} />
			</Head>
			<div className="bg-mainBackground min-h-screen">
				<AdminDashBoard>
					<main className="w-full">
						<div className="Container">
							<Payments />
						</div>
					</main>
				</AdminDashBoard>
			</div>
		</React.Fragment>
	);
}
