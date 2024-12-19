import { useState } from "react";
import { AllServices } from "./components";

export default function Services() {
	const [orderNewOrOld, setOrderNewOrOld] = useState(false);
	const [orderTime, setOrderTime] = useState("Todos los Servicios");

	const toggleOrderDropdown = () => {
		setOrderNewOrOld(!orderNewOrOld);
	};

	const handleSortOptionClick = (option: any) => {
		setOrderTime(option);
		toggleOrderDropdown();
	};

	return (
		<div className="w-full pt-20 pb-10">
			<div className="col-4 w-4/4 flex justify-end">
				<div className="relative">
					{orderNewOrOld && (
						<div
							className={`bg-white shadow p-3 rounded cursor-pointer mt-1 absolute flex flex-col space-y-5 z-40`}>
							<span
								className="hover:text-orange cursor-pointer"
								onClick={() => {
									setOrderNewOrOld(false);
									setOrderTime("Ordenar por nuevo pedido");
								}}>
								Ordenar por nuevo pedido
							</span>
							<span
								className="hover:text-orange cursor-pointer"
								onClick={() => {
									setOrderNewOrOld(false);
									setOrderTime("Ordenar por pedido antiguo");
								}}>
								Ordenar por pedido antiguo
							</span>
							<span
								className="hover:text-orange cursor-pointer"
								onClick={() => {
									setOrderNewOrOld(false);
									setOrderTime("Ordenar por más nuevo o más antiguo");
								}}>
								Ordenar por más nuevo o más antiguo
							</span>
						</div>
					)}
				</div>
			</div>
			<div className="pt-1 flex pr-6 justify-center">
				<div className="col-8 w-4/4">
					<h1 className="ml-6 font-bold text-2xl md:text-3xl text-center">
						Selección de servicios según tus deseos:
						<br />
						<span className="text-orange text-center">
							Descubre nuestras categorías de reparaciones y recibe ofertas gratuitas de artesanos
						</span>
					</h1>
				</div>
			</div>
			<AllServices />
		</div>
	);
}
