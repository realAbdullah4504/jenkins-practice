import { useState } from "react";
import toast from "react-hot-toast";

const useOnChangeUploadImages = () => {
	const [imageDataPageData, setImagePageData] = useState<string[]>([]);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files: FileList | null = event.target.files;
		// console.log(files[0], "event");
		let image: any;
		if (files && files[0] !== null && files[0]?.size / 500000 < 5) {
			// console.log(isImgUploading, "loading state");
			const imageFormData = new FormData();
			imageFormData.append("file", files[0]);
			imageFormData.append("upload_preset", "nlkuezdy");
			imageFormData.append("cloud_name", "dcncm1bi9");
			// saving to cloudinary
			setIsImgUploading(true);
			try {
				await fetch(
					"https://api.cloudinary.com/v1_1/dcncm1bi9/image/upload",
					{
						method: "POST",
						body: imageFormData,
					}
				)
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						image = data;
						setImagePageData([
							...imageDataPageData,
							data.secure_url,
						]);

						if (data.error) {
							console.log(data?.error?.message);

							// toast.error(data?.error?.message);
							setIsImgUploading(false);
							// setImages(null);
						} else {
							setIsImgUploading(false);
						}
					})
					.catch((err) => {
						// toast.error(err.message + "try again");
						setIsImgUploading(false);
					});
			} catch (error) {
				console.log(error);
				// toast.error(error);
				// setIsImgUploading(false);
			} finally {
				// setIsImgUploading(false);
				// setInputImage(null);
			}
			return image;
		} else if (files && files[0]?.size / 500000 > 5) {
			toast.error("El tamaño de la imagen no puede exceder los 5 MB");
			setIsImgUploading(false);
		}
	};
	return { isImgUploading, imagesData: imageDataPageData, setImagePageData, handleImageUpload };
};
export default useOnChangeUploadImages;
