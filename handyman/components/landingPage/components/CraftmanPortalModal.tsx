import Login from "@/components/Login";
import Link from "next/link";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";

// Modal Styles
const customStyles: Modal.Styles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		maxWidth: "600px",
		width: "100%",
		padding: "20px",
	},
};

// Required by React Modal

interface CraftsmanPortalModalProps {
	isOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CraftsmanPortalModal: React.FC<CraftsmanPortalModalProps> = ({
	isOpen,
	setModalIsOpen,
}) => {
	React.useEffect(() => {
		// Prevent scrolling on the background when the modal is open
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		// Cleanup
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const [isLogin, setIsLogin] = useState(false);
	if (isLogin) {
		return <Login setToggleLogin={setIsLogin} />;
	}
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={() => setModalIsOpen(false)}
			className="overflow-auto mx-auto mt-20 md:my-32 relative p-6 rounded-md bg-white shadow-lg z-100 outline-none max-h-[90vh]"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
			<button
				className="absolute top-5 right-5 text-gray-600 hover:text-red-500 focus:outline-none"
				onClick={() => setModalIsOpen(false)}>
				<FaTimes />
			</button>
			<div className="text-center mt-3">
				<p className="mb-4 font-bold">
					Para acceder a más listados de trabajo, lo invitamos a iniciar sesión o
crear una cuenta.
				</p>

				<div className="flex flex-col gap-4 justify-between">
					<div>
						<h3 className="font-semibold mb-2">
							¿Ya está registrado?
						</h3>
						<p className="max-w-[300px] m-auto">
							Si ya tiene una cuenta con nosotros, puede iniciar sesión
aquí para continuar.
						</p>
						<button
							onClick={() => {
								setIsLogin(true);
								setModalIsOpen(false);
							}}
							className="globalbtn mt-2">
							Acceso
						</button>
					</div>
					<hr />
					<div>
						<h3 className="font-semibold mb-2">
							¿Aún no está registrado?
						</h3>
						<p className="max-w-[300px] mx-auto mb-4">
							¡Ningún problema!Puede registrarse fácilmente como artesano
para acceder a cientos de trabajos y otras excelentes características.
						</p>
						<Link href={"/register"} className="globalbtn">
							Regístrese ahora gratis
						</Link>
					</div>
				</div>

				<div className="mt-6">
					<h3 className="font-bold  text-left mb-2">
						¿Por qué registrarse con nosotras?
					</h3>
					<p className="list-disc text-left list-inside flex flex-col gap-1 font-semibold">
						<span>
							- Acceso a una variedad de listados de trabajo de diferentes
industrias y ubicaciones.
						</span>
						<span>
							- Perfil personal para mostrar sus habilidades y
experiencia.
						</span>
						<span>
							- notificaciones sobre nuevos trabajos que coinciden con su
habilidades.
						</span>
						<span>
							- oportunidad de conectarse con clientes potenciales y
Haga crecer su negocio.
						</span>
					</p>
				</div>
			</div>
		</Modal>
	);
};

export default CraftsmanPortalModal;
