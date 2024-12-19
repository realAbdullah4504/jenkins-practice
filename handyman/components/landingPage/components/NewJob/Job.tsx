/* eslint-disable @next/next/no-img-element */
import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";
import { formatTimeDifference } from "@/helper/formatTimeDifference";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";

export const JOB = ({ jobs }: any) => {
	const { userData } = useAuth();
	const user = userData[0];
	const address = userData[0]?.address;
	const jobAddress = jobs?.location;
	const [toggleLogin, setToggleLogin] = useState<boolean>(false);
	const router = useRouter();
	const handleView = () => {
		if (user) {
			router.push(`/newjob/${jobs?._id}`);
		} else {
			setToggleLogin(true);
		}
	};
	return (
		<div className="my-2 lg:mx-10">
			<div className="bg-white border border-1 rounded-2xl shadow">
				<div className="w-full flex">
					<div className="hidden sm:block">
						<img
							className="h-full w-28 rounded-s-2xl flex-none bg-cover text-center overflow-hidden"
							src={
								jobs?.images[0]
									? `${jobs?.images[0]}`
									: "/no-image.jpg"
							}
							alt="imágenes del trabajo"
						/>
					</div>

					<div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal">
						<div className="mb-2">
							<p className="text-orange gap-2 flex items-center">
								<BiSolidCategory />
								{jobs?.category}
							</p>
							<div className="text-gray-900 font-semibold mb-2 mr-4 hover:text-orange hover:underline">
								<button onClick={handleView}>
									{jobs?.serviceTitle.service_title
										? jobs?.serviceTitle.service_title
										: jobs?.serviceTitle.other_title}
								</button>
								<span>
									{jobs?.additional_details.square_meters}
								</span>
							</div>
							<div className="flex sm:items-center items-start sm:flex-row flex-col font-semibold">
								<h3 className="text-sm flex items-center">
									<CiLocationOn className="mr-1 items-center" />
									<span className="mr-2">
										{jobs?.location?.place_name}
									</span>
								</h3>
								<p className="text-sm">
									{jobs?.distance &&
										`${jobs?.distance} km`}
								</p>

								<p className="text-gray-700 flex sm:ms-4 ms-0 gap-1 text-sm items-center text-base">
									<span className="font-semibold">
										Publicado:
									</span>
									<span className="text-sm text-gray-600">
										{formatTimeDifference(jobs?.createdAt)}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="w-full my-4">
					<div className="flex flex-wrap justify-center items-start gap-4">
						<div className="flex flex-col space-y-3 md:space-y-5">
							<h3 className="text-xl font-semibold">m2</h3>
							<span className="text-sm md:text-base text-gray-600">
								{jobs?.additional_details.square_meters}
							</span>
						</div>
						<div className="flex items-center">
							{jobs?.images[0] ? (
								<Image
									src={jobs?.images[0]}
									alt="nuevo trabajo listado"
									width={170}
									height={170}
									className="w-40 h-40 object-contain"
								/>
							) : (
								<div className="flex flex-col items-center justify-center w-40 h-40 bg-[#eaeaea] rounded-md p-3">
									<BsImage size={160} color="#666666" />
									<p className="text-xs md:text-lg font-bold opacity-60">
										Sin imagen
									</p>
								</div>
							)}
						</div>
						<div className="flex flex-col space-y-3 md:space-y-5">
							<h3 className="text-xl font-semibold">Publicado</h3>
							<span className="text-sm md:text-base text-gray-600">
								{formatTimeDifference(
									jobs?.createdAt 
								)}
							</span>
						</div>
						<div className="flex flex-col space-y-3 md:space-y-5">
							<div className="flex items-center space-x-2">
								<CiLocationOn className="text-xl" />
								<h3 className="text-sm md:text-lg font-semibold">
									<span className="mr-2">
										{jobs?.location?.Place_Name}
									</span>
									{address &&
										`Distancia: ${calculateDistanceVincenty(
											address?.Latitude as number,
											address?.Longitude as number,
											jobAddress?.Latitude,
											jobAddress?.Longitude
										)} km`}
								</h3>
							</div>
						</div>
					</div>
				</div> */}
			</div>

			{toggleLogin && <Login setToggleLogin={setToggleLogin} />}
		</div>
	);
};
