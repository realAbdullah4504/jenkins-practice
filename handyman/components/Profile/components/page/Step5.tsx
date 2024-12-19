import React from "react";
import { CiLocationOn } from "react-icons/ci";

const ExampleZipCode = [
	{
		id: 1,
		zip_code: "12345", //Must be a string
		location: "location 1",
	},
	{
		id: 2,
		zip_code: "12323", //Must be a string
		location: "location 2",
	},
	{
		id: 3,
		zip_code: "32343", //Must be a string
		location: "location 3",
	},
	{
		id: 4,
		zip_code: "42313", //Must be a string
		location: "location 4",
	},
	{
		id: 5,
		zip_code: "43212",
		location: "location 5",
	},
];
const fetchLocationAccording__zip_code = async (zip_code: string) => {
	const location_name = ExampleZipCode.filter(
		(zip) => zip_code == zip.zip_code
	);
	return location_name; //Name will be fetch from data-base using API
};
export default function Page5({
	setLocationDataPage,
	locationDataPage,
	locationDataPageError,
	setlocationDataPageError,
	addressId,
	setAddressId,
}: LocationOfJobPage) {
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocationDataPage(e.target.value);
		setlocationDataPageError("");
		const location_res = await fetchLocationAccording__zip_code(
			e.target.value
		);
		if (e.target.value.length === 5 && location_res.length !== 0) {
			setAddressId(location_res[0].location);
		} else {
			setAddressId("");
		}
	};

	return (
		<section className="py-1  md:w-1/2  mb-16 mt-5 mx-[20px] md:mx-10 lg:mx-20  relative">
			<h2 className="text-2xl font-bold">Ingrese el código postal</h2>
			<p className="text-gray-500 mb-3 mt-1">
				Especifique la ubicación del trabajo por código postal.
			</p>
			<div className="bg-white py-3 px-2 rounded-lg  border-2 flex items-center w-2/3 relative">
				<CiLocationOn className="text-2xl mr-2 text-gray-500" />
				<input
					type="text"
					className="w-full outline-none"
					name="zip_code"
					placeholder="e.g.   5000"
					maxLength={5}
					pattern="[0-9]{4}"
					onChange={handleChange}
					value={locationDataPage}
				/>
				{addressId !== "" && (
					<p className="text-right absolute right-3">
						{addressId}
					</p>
				)}
			</div>
			{(locationDataPage === "" ||
				isNaN(Number(locationDataPage)) ||
				locationDataPage.trim().length !== 4 ||
				addressId === "") && (
				<p className="text-sm text-red-500 absolute">
					{locationDataPageError}
				</p>
			)}
		</section>
	);
}
