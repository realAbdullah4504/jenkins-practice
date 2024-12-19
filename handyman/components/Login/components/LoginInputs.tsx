import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordResetPopup from "./forgetPasswordModal";

interface LoginInputsPropsType {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	password: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	emailError: string;
	passwordError: string;
	setEmailError: React.Dispatch<React.SetStateAction<string>>;
	setPasswordError: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginInputs({
	email,
	setEmail,
	setPassword,
	password,
	handleSubmit,
	emailError,
	passwordError,
	setEmailError,
	setPasswordError,
}: LoginInputsPropsType) {
	const [passwordViewToggle, setPasswordViewToggle] = useState<Boolean>(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const openPopup = () => {
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
			<h2 className="text-4xl font-bold text-center mb-14 mt-4">Iniciar Sesión</h2>
			<form onSubmit={handleSubmit} method="POST">
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block text-gray-700 font-bold mb-2">
						Correo Electrónico
					</label>
					<input
						id="email"
						type="email"
						className="w-full px-3 py-3 border border-gray-600 rounded outline-none"
						placeholder="Introduce tu correo electrónico"
						onChange={(e) => {
							setEmail(e.target.value);
							setEmailError("");
						}}
						value={email}
						required
					/>
					{emailError && (
						<p className="absolute text-sm text-red-500">
							{emailError}
						</p>
					)}
				</div>
				<div className="mb-5 relative">
					<label
						htmlFor="password"
						className="block text-gray-700 font-bold mb-2">
						Contraseña
					</label>
					<input
						id="password"
						type={`${passwordViewToggle ? "text" : "password"}`}
						className="w-full px-3 py-3 border border-gray-600 rounded outline-none"
						placeholder="Introduce tu contraseña"
						onChange={(e) => {
							setPassword(e.target.value);
							setPasswordError("");
						}}
						value={password}
						required
					/>
					<AiOutlineEyeInvisible
						className="absolute right-5 top-12 text-xl cursor-pointer hover:text-orange"
						onClick={() =>
							setPasswordViewToggle(!passwordViewToggle)
						}
					/>
					{passwordError && (
						<p className="absolute text-sm text-red-500">
							{passwordError}
						</p>
					)}
				</div>
				<button
					type="submit"
					className="w-full bg-orange hover:text-black text-white font-bold py-2.5 px-4 rounded-full focus:outline-none mt-4">
					Iniciar Sesión
				</button>
				<span className="text-center w-full inline-block mt-2">
					¿Olvidaste tu contraseña?{" "}
					<Link href={""} className="text-orange" onClick={openPopup}>
						Haz clic aquí
					</Link>
				</span>
				<span className="text-center w-full inline-block mt-2">
					¿No tienes una cuenta?{" "}
					<Link href={"/register"} className="text-orange">
						Regístrate Ahora
					</Link>
				</span>
			</form>
			<PasswordResetPopup
				isOpen={isPopupOpen}
				onClose={closePopup}
			/>
		</div>
	);
}
