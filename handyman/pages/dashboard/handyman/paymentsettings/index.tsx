import { HandymanLayout, PaymentSetting } from "@/components/Dashboard";
import Head from "next/head";
import React from "react";

export default function Index() {
	return (
		<React.Fragment>
			<Head>
				<title>Handyman | Payment Settings</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/paymentsettings`} />
			</Head>
			<div className="bg-mainBackground ">
				<HandymanLayout>
					<main className="min-h-full ">
						<div className="Container pt-24 flex justify-center">
							<PaymentSetting />
						</div>
					</main>
				</HandymanLayout>
			</div>
		</React.Fragment>
	);
}
