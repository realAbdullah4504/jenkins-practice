import SidbarNavigationLinks from "@/components/Dashboard/components/SidbarNavigationLinks";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React from "react";
import Logout from "../Dashboard/handyman/layout/components/Logout";

export default function Sidebar({
	slideNav,
	toggleSideBar,
	setToggleSideBar,
	navigationLinks,
}: {
	slideNav: boolean;
	toggleSideBar: boolean;
	setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
	navigationLinks: any;
}) {
	const { userData } = useAuth();
	const craftsman = userData[0]?.craftsman;
	const user = userData[1] || userData[0] || {};

	return (
		<div
			className={`bg-white shadow-lg border-2  fixed z-10 top-[65px] ${
				slideNav
					? toggleSideBar
						? "w-[300px] sm:left-0 left-0"
						: "w-[80px] sm:left-0 left-0"
					: "-left-72 sm:-left-96"
			}
			transition-all duration-300 ease-in-out overflow-y-auto`}>
			<nav className="h-[calc(100vh-80px)]  flex flex-col justify-center ">
				<div
					className={`flex justify-start items-center ${
						toggleSideBar ? "sm:mx-9 mx-5" : "justify-center pr-2"
					} gap-3`}>
					<div className="bg-white shadow rounded-full my-4 p-1">
						<Image
							alt="profile"
							src={user?.profile_photo as string}
							width={60}
							height={60}
							className="cursor-pointer w-16 h-16  rounded-full"
							title="Click on image"
							onClick={() => setToggleSideBar(!toggleSideBar)}
						/>
					</div>
					<section
						className={`${toggleSideBar ? "block" : "hidden"}`}>
						<h1 className="text-xl font-bold">
							{craftsman?.company_name || user?.name}
						</h1>
					</section>
				</div>

				<SidbarNavigationLinks
					navigation={navigationLinks}
					toggleSideBar={toggleSideBar}
				/>
				<Logout toggleSideBar={toggleSideBar} />
			</nav>
		</div>
	);
}
