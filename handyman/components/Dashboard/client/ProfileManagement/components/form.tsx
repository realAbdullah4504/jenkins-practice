import usePostalRequests from "@/ApiRequests/postal";
import useUserRequests from "@/ApiRequests/user";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type formDataProps = {
	_id: string;
	name: string;
	lastName: string;
	zipCode?: number;
	phoneNumber: string;
};

export default function ProfileManagementForm() {
	const [isDataSaving, setIsDataSaving] = useState<boolean>(false);
	const { userData, setUserData, userPostedJob } = useAuth();
	const { GetPostalsBySearch } = usePostalRequests();
	const [search, setSearch] = useState<any>();
	const { data, refetch, isLoading } = GetPostalsBySearch(search);
	const { UpdateUser } = useUserRequests();
	const { mutateAsync } = UpdateUser;
	const [addressId, setAddressId] = useState<string>("");
	const [formData, setFormData] = useState<formDataProps>(() => {
		const defaultFormData: formDataProps = {
			_id: "",
			name: userData[0]?.name || "",
			lastName: userData[0]?.lastName || "",
			zipCode: userData[0]?.address?.Postal_Code,
			phoneNumber: userData[0]?.phone || "",
		};

		return defaultFormData;
	});

	const isFormBtnDisable =
		!formData.name &&
		!formData.lastName &&
		!formData.zipCode &&
		!formData.phoneNumber;

	const firstJob = userPostedJob?.slice(0, 1);
	const firstJobZipCode = firstJob[0]?.location?.Postal_Code;

	const zipCode = userData[0].address?.Postal_Code?.toString();
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "zipCode") {
			if (!value) return setSearch(undefined);
			setSearch(value);
		}
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		if (formData._id) return;

		setFormData((prevData) => ({
			...prevData,
			_id: userData[0]?._id,
		}));
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsDataSaving(true);
			const updateData = {
				...formData,
				phone: formData.phoneNumber,
				last_name: formData.lastName,
				address: addressId,
			};
			await mutateAsync(updateData, {
				onSuccess(data, variables, context) {
					toast.success(data.message);
					setFormData(data.user);
					setUserData([data.user]);
				},
				onSettled(data, error, variables, context) {
					// toast.error(data);
				},
				onError(error, variables, context) {
					toast.error(error.message);
				},
			});

			// Reset the form data
			setFormData({
				_id: userData[0]?._id || "",
				name: userData[0]?.name || "",
				lastName: userData[0]?.lastName || "",
				zipCode: userData[0]?.address?.Postal_Code,
				phoneNumber: userData[0]?.phone || "",
			});

			setIsDataSaving(false);
		} catch (error) {
			setIsDataSaving(false);
			console.log(error);
		}
	};

	useEffect(() => {
		setFormData({
			_id: userData[0]?._id,
			name: userData[0]?.name,
			lastName: userData[0]?.lastName,
			zipCode: userData[0]?.address?.Postal_Code,
			phoneNumber: userData[0]?.phone,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData[0]]);

	const handleLocation = (address: any) => {
		setSearch(undefined);
		setAddressId(address._id);
	};
	useEffect(() => {
		refetch();
	}, [search, refetch]);
	return (
		<div className="w-4/5 space-y-3">
			<form method="POST" onSubmit={handleFormSubmit}>
				<div className=" mx-auto  p-8 ">
					<div className="flex mb-4">
						<div className="w-1/2 pr-2">
							<label className="block mb-2 font-bold  text-gray-700">
								Nombre
							</label>
							<input
								disabled
								type="text"
								name="name"
								className="w-full border cursor-not-allowed rounded px-3 py-2 "
								placeholder={
									userData[0]?.name
										? userData[0]?.name
										: "Ingrese su nombre"
								}
								// onChange={handleInputChange}
							/>
						</div>
						{/* no se necesita ahora */}
						<div className="w-1/2 pl-2">
							<label className="block mb-2 font-bold text-gray-700">
								Apellido
							</label>
							<input
								type="text"
								name="lastName"
								className="w-full border rounded px-3 py-2"
								placeholder={
									userData[0]?.lastName
										? userData[0]?.lastName
										: "Ingrese su apellido (opcional)"
								}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="flex mb-4">
						<div className="w-1/2 pr-2">
							<label className="block mb-2 font-bold text-gray-700">
								Dirección de correo electrónico
							</label>
							<input
								type="email"
								name="email"
								className="w-full border rounded px-3 py-2 cursor-not-allowed"
								placeholder={
									userData[0]?.email
										? userData[0]?.email
										: "Ingrese su dirección de correo electrónico"
								}
								disabled
							/>
						</div>
						<div className="w-1/2 pl-2 relative">
							<label className="block mb-2 font-bold text-gray-700">
								Código postal
							</label>
							<input
								type="number"
								name="zipCode"
								className="w-full border rounded px-3 py-2"
								placeholder={
									zipCode || "Ingrese su código postal"
								}
								onChange={handleInputChange}
							/>

							{search && (
								<div className="absolute overflow-auto top-18 rounded shadow-lg bg-white flex flex-col gap-2 h-48  p-2">
									{isLoading ? (
										<Loader />
									) : data.length > 0 ? (
										data?.map((item: any, ind: number) => {
											return (
												<button
													onClick={() =>
														handleLocation(item)
													}
													key={ind}
													className="border cursor-pointer text-left w-fit shadow border-gray-300 p-2 rounded">
													<span className="text-black ">
														{item?.Place_Name}
														{/* ,{" "}
														{item?.Admin_Name},{" "}
														{item?.Admin_Name2},{" "}
														{item?.Admin_Name3} */}
													</span>
												</button>
											);
										})
									) : (
										<p className="w-full p-2 text-center">
											No se encontró la ubicación
										</p>
									)}
								</div>
							)}
						</div>
					</div>

					<div className="flex mb-4">
						<div className="w-1/2 pr-2">
							<label className="block mb-2 font-bold text-gray-700">
								Número de teléfono
							</label>
							<input
								type="number"
								name="phoneNumber"
								className="w-full border rounded px-3 py-2"
								placeholder={
									userData[0]?.phone
										? userData[0]?.phone
										: "Ingrese su número de teléfono"
								}
								onChange={handleInputChange}
							/>
						</div>
						<div className="w-1/2 pl-2 flex items-end justify-center">
							<label className="block mb-2 font-bold text-gray-700"></label>

							<button
								disabled={isFormBtnDisable || isDataSaving}
								className="bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl font-medium focus:outline-none float-right disabled:cursor-not-allowed disabled:opacity-50">
								Guardar
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
