// utils/auth.ts
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const useLogout = () => {
	const router = useRouter();
	const { setUserData } = useAuth();
	const logout = () => {
		// Remove the authentication tokens from localStorage
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");

		// Redirect to the login page using the router
		setUserData([]);
		router.replace("/");
		toast.success("INCOMPTIR SEXITO");
	};

	return logout;
};
