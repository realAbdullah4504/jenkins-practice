"use client";

import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import LoginInputs from "./components/LoginInputs";
export default function Login({ setToggleLogin }: { setToggleLogin: any }) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [isLogin, setIsLogin] = useState<boolean>(false);
	// const { setEmail_verification } = useAuth();
	const { login } = useLogin();
	const router = useRouter();
	// const token = localStorage.getItem("accessToken");
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email) {
			setEmailError("Se requiere correo electrónico");
			return;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError("El correo electrónico no es válido");
			return;
		}
		if (!password) {
			setPasswordError("Se requiere contraseña");
			return;
		} else if (password.length <= 5) {
			setPasswordError("La longitud de la contraseña debe ser al menos 6 caracteres");
			return;
		}
		if (emailError === "" && passwordError === "") {
			try {
				await login(email, password, "/", setToggleLogin);
			} catch (error) {
				console.log(error);
				setIsLogin(false);
				toast.error("Network error try again!");
			}
		}
	};
	return (
		<div className="w-full h-screen flex justify-center items-center bg-gray-500 fixed z-50 inset-0 bg-opacity-50">
			<div className="flex justify-around items-center w-full shadow">
				<LoginInputs
					email={email}
					setEmail={setEmail}
					setPassword={setPassword}
					password={password}
					handleSubmit={handleSubmit}
					emailError={emailError}
					passwordError={passwordError}
					setEmailError={setEmailError}
					setPasswordError={setPasswordError}
				/>
			</div>
			<div className="absolute top-10 right-20">
				<AiFillCloseCircle
					className="text-4xl  text-orange cursor-pointer hover:text-white"
					onClick={() => setToggleLogin(false)}
				/>
			</div>
		</div>
	);
}
