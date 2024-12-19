import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
type NaviagtionLinksType = {
	id: number;
	linkText: string;
	img: string;
	href: string;
};
export default function SidbarNavigationLinks({
	navigation,
	toggleSideBar,
	isAdmin,
}: {
	navigation: NaviagtionLinksType[];
	toggleSideBar: boolean;
	isAdmin?: Boolean;
}) {
	const { userData } = useAuth();
	const user = userData[0];
	const router = useRouter();
	const isActiveLink = (path: string, ind: number) => {
		if (ind === 0 && router.pathname.split("/").length === 3) {
			return "bg-orange bg-opacity-60";
		}
		return router.pathname === path ? "bg-orange bg-opacity-60" : "";
	};

	return (
		<ul
			className={`${
				toggleSideBar ? "md:ml-7" : "ml-0"
			} text-sm md:text-base sm:space-y-3 ${!isAdmin && "h-[65vh]"} overflow-y-scroll`}>
			{navigation?.map(({ id, linkText, href, img }, ind) => (
				<Link href={`${href}`} key={id}>
					<li
						className={`${
							toggleSideBar
								? "hover:bg-orange hover:bg-opacity-60"
								: ""
						} ${
							!isAdmin ? "sm:py-3 py-2" : "py-1"
						} rounded-l-full my-1 ${isActiveLink(href, ind)}`}>
						<div className="flex justify-start items-center gap-4 ml-6">
							<Image
								src={img}
								alt="client"
								className={`object-cover ${
									toggleSideBar && !isAdmin ? "w-5" : "w-5"
								} ${isAdmin && "w-[20px]"} cursor-pointer`}
								width={20}
								height={20}
							/>
							<span
								title={linkText}
								className={`${
									isAdmin ? "font-bold" : "font-bold"
								}  hover:text-white ${
									toggleSideBar ? "block" : "hidden"
								}`}>
								{linkText}
							</span>
						</div>
					</li>
				</Link>
			))}
		</ul>
	);
}
