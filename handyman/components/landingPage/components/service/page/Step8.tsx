import usePostalRequests from "@/ApiRequests/postal";
import useUserRequests from "@/ApiRequests/user";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiLocationOn } from "react-icons/ci";
export default function Page8({
	setLocationDataPage,
	locationDataPage,
	locationDataPageError,
	setlocationDataPageError,
	setAddressId,
	addressId,
	setIsNextBtnDisable,
}: LocationOfJobPage) {
	const { userData, setUserData } = useAuth();
	const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
	const { UpdateUser } = useUserRequests();
	const { mutateAsync } = UpdateUser;
	const [search, setSearch] = useState();
	const { GetPostalsBySearch } = usePostalRequests();
	const { data, refetch } = GetPostalsBySearch(search);
	const [address, setAddres] = useState<any>();
	const updateLocationName = async (data: any) => {
		if (!data) return setSearch(undefined);
		setSearch(data);
	};

	const handleLocation = (address: any) => {
		setAddressId(address._id);
		setAddres(address);
		setSearch(undefined);
	};

	useEffect(() => {
		refetch();
	}, [refetch, search]);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocationDataPage(e.target.value);

		// if (userData[0]?.zipCode.toString() === e.target.value.toString()) {
		// 	setShowSaveButton(false);
		// } else
		if (userData?.length) {
			setShowSaveButton(true);
		}

		setlocationDataPageError("");
		updateLocationName(e.target.value);
	};

	const handleUpdateZipCode = async () => {
		if (isNaN(Number(locationDataPage))) {
			toast.error("Zip code must be a number");
			return;
		}
		if (locationDataPage.trim().length !== 5) {
			toast.error("Zip code must have 5 character");
			return;
		}
		if (addressId === "") {
			toast.error("Location not found");
			return;
		}
	};

	useEffect(() => {
		setIsNextBtnDisable(showSaveButton);
	}, [showSaveButton, setIsNextBtnDisable]);

	// useEffect(() => {
	// 	updateLocationName(userData[0]?.zipCode);
	// }, []);
	return (
		<section className="py-1  flex gap-10 items-center  md:w-1/2  mb-16 mt-5 mx-[10px] md:mx-10 lg:mx-20  relative">
			<div className="w-2/3">
				<h2 className="text-2xl font-bold w-fit">Introduce el código postal</h2>
				<p className="text-gray-500 mb-3 mt-1 w-fit">
					Especifica la ubicación del trabajo por código postal.
				</p>
				<div className="bg-white py-3 px-2 rounded-lg relative  border-2 flex items-center  relative">
					<CiLocationOn className="text-2xl mr-2 text-gray-500" />
					<input
						type="text"
						className={`w-full outline-none`}
						name="zip_code"
						placeholder="e.g. 5000"
						maxLength={5}
						pattern="[0-9]{4}"
						onChange={handleChange}
						value={locationDataPage}
					/>
	
					{addressId !== "" && (
						<p className="text-right absolute right-3">
							{address?.Place_Name}
						</p>
					)}
	
					{data?.length > 0 && (
						<div className="absolute overflow-auto top-10 rounded shadow-lg bg-white flex flex-col gap-2 h-48  p-2">
							{data?.map((item: any, ind: number) => {
								return (
									<button
										onClick={() => handleLocation(item)}
										key={ind}
										className="border cursor-pointer text-left w-fit shadow border-gray-300 p-2 rounded">
										<span className="text-black ">
											{item?.Place_Name}
											{/* ,{" "}
											{item?.Admin_Name},{" "}
											{item?.Admin_Name2},{" "}
											{item?.Admin_Name3} */}
										</span>
	
										{/* <p className="text-black font-bold">{item?.Postal_Code}</p> */}
									</button>
								);
							})}
						</div>
					)}
				</div>
	
				{showSaveButton && (
					<p className="text-red-500 w-fit">
						Estos cambios actualizarán la información del perfil
					</p>
				)}
				{!showSaveButton &&
					(locationDataPage === "" ||
						isNaN(Number(locationDataPage)) ||
						locationDataPage.trim().length !== 4 ||
						addressId === "") && (
						<p className="text-sm w-fit text-red-500 absolute">
							{locationDataPageError}
						</p>
					)}
			</div>
	
			{showSaveButton && (
				<div className="flex items-center justify-start mt-10 gap-3 w-1/3">
					<button
						onClick={handleUpdateZipCode}
						className="border border-white  px-5 md:py-2 py-1  text-white rounded-lg shadow bg-orange ">
						Guardar
					</button>
					<p>Guardar para proceder</p>
				</div>
			)}
		</section>
	);
	
}
