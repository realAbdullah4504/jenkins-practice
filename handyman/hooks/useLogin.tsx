import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useLogin = () => {
	const [isLogin, setIsLogin] = useState(false);
	const router = useRouter();

	const login = async (
		email: string,
		password: string,
		redirect: string = "/",
		setToggleLogin: any
		// setEmailVerification: Dispatch<SetStateAction<string>>
	) => {
		try {
			setIsLogin(true);

			const loginResponse = await axios.post("/api/auth/login", {
				email,
				password,
			});

			const userData = loginResponse.data;
			setIsLogin(false);

			if (loginResponse.status === 200) {
				localStorage.setItem(
					"accessToken",
					JSON.stringify(userData?.accessToken)
				);
				localStorage.setItem(
					"refreshToken",
					JSON.stringify(userData.refreshToken)
				);
				setToggleLogin && setToggleLogin(false);
				router.push(redirect);
				toast.success("Inicio de sesión exitosa");
				return 200;
				// setEmailVerification("");
				// localStorage.setItem("email_verification", "");
			}
		} catch (error: any) {
			setIsLogin(false);

			if (error.response) {
				// Custom handling for 401 error
				toast.error(error.response.data.message);
			} else {
				console.error(error);
				toast.error("Algo salió mal, intenta de nuevo");
			}
		}
	};

	return { isLogin, login };
};

export default useLogin;
