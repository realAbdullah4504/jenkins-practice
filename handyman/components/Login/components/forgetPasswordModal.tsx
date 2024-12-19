import useAuthRequests from "@/ApiRequests/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface PasswordResetPopupProps {
	isOpen: boolean;
	onClose: () => void;
	// onResetPassword: () => void;
}

export default function PasswordResetPopup({
	isOpen,
	onClose,
}: PasswordResetPopupProps) {
	const closePopup = () => {
		onClose();
	};

	const [email, setEmail] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const { resetPassword } = useAuthRequests();
	const handleReset = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await resetPassword.mutateAsync(
				{ email },
				{
					onSuccess(data, variables, context) {
						toast.success(data.message);
						closePopup();
					},
				}
			);
		} catch (error: any) {
			console.log(error);
			if (error.response) {
				const { data } = error.response;
				toast.error(data.message);
			} else toast.error(error.message);
		}
	};

	return (
		<div>
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div
						className="fixed inset-0 bg-gray-800 opacity-50"
						onClick={closePopup}></div>
					<div className="bg-white p-8 rounded-lg shadow-lg z-10">
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
							onClick={closePopup}>
							Cerrar
						</button>
						<h2 className="text-2xl font-semibold mb-4">
							¿Olvidaste tu contraseña?
						</h2>
						<form onSubmit={handleReset}>
							<input
								type="email"
								placeholder="Introduce tu correo electrónico"
								className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
								required
								onChange={handleChange}
							/>
							<button
								type="submit"
								disabled={resetPassword.isPending}
								className="bg-orange hover:bg-orange disabled:opacity-40 text-white font-bold py-2 px-4 rounded-full w-50">
								Enviar correo de restablecimiento de contraseña
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
