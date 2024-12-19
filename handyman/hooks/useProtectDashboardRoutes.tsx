import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useApiCaller from "./useApiCaller";

const useProtectDashboard = () => {
	const { userData, setUserData, isAuthUserLoading } = useAuth();
	const [isDashboard, setIsDashboard] = useState(false);
	const router = useRouter();
	const dashboradRoutes = ["admin", "handyman", "client"];
	useEffect(() => {
		let toastId;
		if (isAuthUserLoading) {
			toastId = toast.loading("Espere por favor ...");
		} else toast.dismiss(toastId);
	}, [isAuthUserLoading]);
	const apiCaller = useApiCaller();
	useEffect(() => {
		let path = router.pathname.split("/");
		if (!isAuthUserLoading && dashboradRoutes.includes(userData[0]?.role)) {
			const userId_for_admin_req = localStorage.getItem(
				"userId_for_admin_req"
			);
			if (userId_for_admin_req && userData[0].role !== "admin") {
				const getUser = async () => {
					try {
						const response = await apiCaller.get(
							`/user?email=${localStorage.getItem(
								"email_for_admin_req"
							)}`
						);
						setUserData((p: any) => [...p, response.data]);
					} catch (error) {}
				};
				getUser();
			}
			if (userId_for_admin_req && userData[0].role === "admin") {
				setIsDashboard(true);
			} else if (path[2] !== userData[0]?.role) {
				path[2] = userData[0]?.role;
				router.replace(path.join("/"));
			} else setIsDashboard(true);
		} else if (
			!isAuthUserLoading &&
			!dashboradRoutes.includes(userData[0]?.role)
		) {
			router.push("/");
		}
	}, [userData]);
	return isDashboard;
};
export default useProtectDashboard;
