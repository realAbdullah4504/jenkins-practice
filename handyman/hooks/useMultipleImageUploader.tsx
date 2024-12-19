import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

interface ImageUploaderResult {
	selectedFiles: File[];
	base64Images: { file: File; base64: string }[];
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleUploadImages: Function;
	isUploading: boolean;
	uploadedImages: string[];
	setBase64Images: React.Dispatch<
		React.SetStateAction<{ file: File; base64: string }[]>
	>;
}

const useImageUploader = (): ImageUploaderResult => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [base64Images, setBase64Images] = useState<
		{ file: File; base64: string }[]
	>([]);
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (files) {
			const newFiles: File[] = Array.from(files);
			setSelectedFiles([...selectedFiles, ...newFiles]);

			const promises: Promise<{ file: File; base64: string }>[] =
				newFiles.map((file) => {
					return new Promise((resolve) => {
						const reader = new FileReader();
						reader.onloadend = () => {
							resolve({ file, base64: reader.result as string });
						};
						reader.readAsDataURL(file);
					});
				});

			Promise.all(promises).then((base64Array) => {
				setBase64Images([...base64Images, ...base64Array]);
			});
		}
	};

	const handleUploadImages = async (files: FileList | []) => {
		if (!files || files.length === 0) {
			return null;
		}

		setIsUploading(true);

		const toastId = toast.loading("Subiendo ...");
		const uploadedImages: string[] = [];
		try {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const imageFormData = new FormData();

				// Append each file with the name "file"
				imageFormData.append("file", file);
				imageFormData.append("upload_preset", "x0ooef7r");
				imageFormData.append("cloud_name", "dv9vv9ju7");

				const response = await fetch(
					"https://api.cloudinary.com/v1_1/dv9vv9ju7/image/upload",
					{
						method: "POST",
						body: imageFormData,
					}
				);

				const data = await response.json();

				if (data.error) {
					toast.error(data?.error?.message);
					setIsUploading(false);
					return null;
				}

				const imageUrl = data.secure_url;
				uploadedImages.push(imageUrl);
			}

			setUploadedImages(uploadedImages);
			setIsUploading(false);
			toast.dismiss(toastId);
			setBase64Images([]);
			return uploadedImages;
		} catch (error) {
			console.error(error);
			toast.error("Error de carga de imágenes.Por favor intente de nuevo.");
			setIsUploading(false);
			toast.dismiss(toastId);
			return null;
		}
	};

	return {
		selectedFiles,
		base64Images,
		handleFileChange,
		handleUploadImages,
		isUploading,
		uploadedImages,
		setBase64Images,
	};
};

export default useImageUploader;
