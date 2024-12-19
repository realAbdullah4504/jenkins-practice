import clientError from "@/helper/clientError";
import useApiCaller from "@/hooks/useApiCaller";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const LiveDashboard = () => {
	const [search, setSearch] = useState("");

	const handleError = clientError();
	function logIframeNavigation(event: any) {
		console.log(
			"Iframe navegó a:",
			event.target.contentWindow.location.href
		);
	}

	const apiCaller = useApiCaller();
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<any>(null);
	const handleSearch = async (e: any) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			const response = await apiCaller.get(`/user?email=${search}`);
			setUser(response?.data);

			if (typeof window !== "undefined") {
				window.localStorage.setItem(
					"userId_for_admin_req",
					response.data?.craftsman?._id || response?.data?._id
				);
				window.localStorage.setItem(
					"email_for_admin_req",
					response.data?.email || response?.data?._id
				);
			}
		} catch (error) {
			console.log(error);
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full">
			{!user ? (
				<div className="lg:w-3/4 lg:mx-auto">
					<section className="my-8">
						<h1 className="font-bold text-4xl  text-Heading text-center">
							Vista en Vivo del Panel para Administrador:
							<span className="text-orange font-bold">
								Resumen del proyecto del cliente
							</span>
						</h1>
					</section>

					<form
						className="flex w-5/5 p-4 justify-center relative"
						onSubmit={handleSearch}>
						<span
							style={{ left: "2%" }}
							className="absolute inset-y-0 left-0 pl-3 flex items-center">
							<FaSearch className="text-gray-400" />
						</span>
						<input
							style={{ height: 56 }}
							type="email"
							required
							placeholder="Ingrese la dirección de correo electrónico del usuario"
							className="pl-10 w-4/5 pr-4 py-2 border rounded-l-2xl focus:outline-none focus:ring "
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							value={search}
						/>
						<button
							disabled={isLoading}
							type="submit"
							className="w-1/5 disabled:opacity-50 bg-white px-4 py-2 border rounded-r-2xl focus:outline-none focus:ring text-[#0E172C]">
							Buscar Perfil{" "}
						</button>
					</form>
				</div>
			) : (
				<div className="w-full h-full">
					<iframe
						onLoad={logIframeNavigation}
						src={`/dashboard/${user?.role}`}
						className="w-full h-screen"
					/>
				</div>
			)}
			{/* <ModalStruc
				isOpen={user ? true : false}
				closeModal={() => {
					setUser(null);
				}}>
		
			</ModalStruc> */}
		</div>
	);
};
export default LiveDashboard;
