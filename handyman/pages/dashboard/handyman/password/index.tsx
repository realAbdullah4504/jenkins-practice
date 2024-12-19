import { HandymanLayout } from "@/components/Dashboard";
import ChangePassword from "@/components/Dashboard/client/ChangePassword";
import Head from "next/head";
import React from "react";

const PasswordManagement = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Handyman | Password Management</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/password`} />
			</Head>
			<div className={"bg-mainBackground h-screen"}>
				<HandymanLayout>
					<main className="bg-mainBackground">
						<div className="Container ">
							<ChangePassword />
						</div>
					</main>
				</HandymanLayout>
			</div>
		</React.Fragment>
	);
};

export default PasswordManagement;
