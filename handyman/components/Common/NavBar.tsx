import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MessageNotification from "../Dashboard/components/MessagePopUpNavBar";
import NotificationBar from "../Dashboard/components/NotificationPopUPNavBar";

export default function NavBar({
	setSlideNav,
	isCheckingProfile = false,
}: {
	setSlideNav: React.Dispatch<React.SetStateAction<boolean>>;
	isCheckingProfile?: boolean;
}) {
	const [messageToggle, setMessageToggle] = useState<Boolean>(false);
	const [notifcationToggle, setNotificationToggle] = useState<Boolean>(false);
	const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
	const router = useRouter();
	const { userData } = useAuth();
	const company_name = userData[0]?.craftsman?.company_name;
	const profileRoute = router.pathname.split("/")[3];
	const creftmanRoute = router.pathname.split("/")[1];
	const toggleHamburger = () => {
		setIsHamburgerOpen((prevState) => !prevState);
		setSlideNav((prevState) => !prevState);
	};
	const commonClasses = " transform [-translate-x-1/2] [-translate-y-1/2]";
	return (
		<div className="bg-white shadow-lg px-5 md:px-20 py-6 w-full fixed z-50 left-0 right-0 top-0">
			<nav className="flex justify-between  md:justify-around items-center relative">
				<button
					className="block focus:outline-none relative"
					onClick={toggleHamburger}>
					<span
						className={`w-5 block h-[2px] bg-black mb-1 ${commonClasses} ${
							!isHamburgerOpen ? "opacity-0" : ""
						}`}></span>
					<span
						className={`w-5 block h-[2px] bg-black mb-1 ${commonClasses} ${
							!isHamburgerOpen
								? "rotate-[-45deg] translate-y-[3px] transition-transform duration-300"
								: "transition-transform duration-300"
						}`}></span>
					<span
						className={`w-5 h-[2px] block bg-black ${commonClasses} ${
							!isHamburgerOpen
								? "rotate-[45deg] -translate-y-[3px] transition-transform duration-300"
								: "transition-transform duration-300"
						}`}></span>
				</button>

				<Link
					href={`/dashboard/${userData[0]?.role}`}
					className="cursor-pointer  md:block hidden flex items-center text-orange ml-10 justify-center gap-3">
					<span className="text-xl font-bold inline-block mb-1">
						Inicio
					</span>
				</Link>

				<div className="lg:w-2/3"></div>
				<div className="flex gap-5  w-full  md:w-2/3  justify-end">
					<div className="flex items-center justify-center gap-5">
						{(profileRoute === "editprofile" ||
							creftmanRoute === "craftsman") && (
							<>
								{isCheckingProfile ? (
									<button
										onClick={() => router.back()}
										className={`bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl
								font-medium focus:outline-none float-right disabled:cursor-not-allowed 
								disabled:opacity-50`}>
										Volver al panel de control
									</button>
								) : (
									<Link
										href={`/craftsman/${company_name}`}
										className={`  text-sm bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl
                  				font-medium focus:outline-none float-right disabled:cursor-not-allowed 
                  				disabled:opacity-50`}>
										Ver perfil como cliente{" "}
									</Link>
								)}
							</>
						)}

						<MessageNotification
							setMessageToggle={setMessageToggle}
							messageToggle={messageToggle}
							removeOtherBar={() => setNotificationToggle(false)}
						/>

						<NotificationBar
							setMessageToggle={setNotificationToggle}
							messageToggle={notifcationToggle}
							removeOtherBar={() => setMessageToggle(false)}
						/>
					</div>
				</div>
			</nav>
		</div>
	);
}
