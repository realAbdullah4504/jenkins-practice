import useUserRequests from "@/ApiRequests/user";
import { useAuth } from "@/context/AuthContext";
import useImageUploader from "@/hooks/useMultipleImageUploader";
import toast from "react-hot-toast";
import { MdCameraAlt } from "react-icons/md";

const ChangeProfilePhoto = () => {
	const {
		handleFileChange,
		setBase64Images,
		base64Images,
		handleUploadImages,
	} = useImageUploader();
	const { UpdateUser } = useUserRequests();
	const { getLoginUser, userData } = useAuth();
	const user = userData[0];
	const handleChangImage = async () => {
		try {
			// upload image to cloudinary
			const image = await handleUploadImages([
				base64Images[base64Images.length - 1].file,
			]);
			console.log(image);
			// update user profile photo
			await UpdateUser.mutateAsync(
				{ profile_photo: image[0] },
				{
					onSuccess(data) {
						toast.success(data.message);
						setBase64Images([]);
						getLoginUser();
					},
				}
			);
		} catch (error) {}
	};
	return (
		<div className=" w-fit flex h-fit mt-8  items-center justify-center flex-col  bg-white p-2 rounded shadow-lg">
			<label className="cursor-pointer">
				<input
					type="file"
					onChange={handleFileChange}
					id="dropzone-file"
					name="myFile"
					title="subir imágenes"
					aria-label="subir imágenes"
					accept="image/*"
					className="hidden"
				/>
				<div className="w-28 h-28 flex items-center justify-center  rounded-full border-4 border-white shadow">
					{base64Images.length > 0 || user?.profile_photo ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={
								base64Images[base64Images.length - 1]?.base64 ||
								user?.profile_photo
							}
							alt=""
							className=" h-full w-full overflow-hidden rounded-full "
						/>
					) : (
						<div className="flex items-center flex-col justify-center font-bold">
							<MdCameraAlt
								className="cursor-pointer text-gray-500  text-6xl"
								title="Cambiar Foto"
							/>
							<span>Subir foto</span>
						</div>
					)}
				</div>
			</label>
			<button
				onClick={handleChangImage}
				disabled={UpdateUser.isPending || base64Images.length === 0}
				className="bg-orange hover:text-black text-white font-bold disabled:opacity-50 py-2.5 px-4 rounded-md focus:outline-none mt-4">
				Cambiar Foto
			</button>
		</div>
	);
};

export default ChangeProfilePhoto;
