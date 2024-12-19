import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";

// Modal styling with Tailwind CSS classes
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		transform: "translate(-50%, -50%)",
		maxWidth: "90%",
		maxHeight: "90%",
	},
};

// Supported file extensions
const supportedExtensions = ["jpg", "jpeg", "png", "gif", "pdf"];

const OpenDocs = ({
	isOpen,
	onClose,
	documentUrls,
	userId,
}: {
	isOpen: boolean;
	onClose: () => void;
	documentUrls: string[];
	userId: string;
}) => {
	const [currentDocumentIndex, setCurrentDocumentIndex] = useState<number>(0);
	const [isCompare, setIsCompare] = useState(false);
	// Determine file extension
	const getFileExtension = (url: string): string | null => {
		const extension = url.split(".").pop()?.toLowerCase() || "";
		return supportedExtensions.includes(extension) ? extension : null;
	};

	const handleNext = () => {
		if (currentDocumentIndex < documentUrls.length - 1) {
			setCurrentDocumentIndex((prevIndex) => prevIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentDocumentIndex > 0) {
			setCurrentDocumentIndex((prevIndex) => prevIndex - 1);
		}
	};

	if (!isOpen || !documentUrls.length) {
		return null;
	}

	const currentDocumentUrl: any = documentUrls[currentDocumentIndex];
	const fileExtension = getFileExtension(currentDocumentUrl?.document_link);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Modal de Documento"
			className="mx-auto relative p-5 my-32 p-6 rounded-md bg-white shadow-lg outline-none"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
			<button
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
				<FaTimes size={20} />
			</button>
			<p className="text-semibold py-2 ">
				Nombre del Documento:{" "}
				<Link
					href={currentDocumentUrl.document_link}
					target="_blank"
					className=" text-blue-500 capitalize ">
					{currentDocumentUrl.document_type.split("_").join(" ")}
				</Link>
			</p>
			<div className="w-full h-full flex flex-col justify-center items-center">
				{fileExtension === "pdf" ? (
					<iframe
						title="Visor de Documentos"
						src={currentDocumentUrl.document_link}
						width="100%"
						height="80%"
						className="border-none mb-4"
					/>
				) : (
					<Image
						height={300}
						width={300}
						src={currentDocumentUrl.document_link}
						alt="Visor de Documentos"
						className="w-full h-96 mb-4"
					/>
				)}
				<div className="flex justify-between w-full">
					<button
						onClick={handlePrev}
						className=" globalbtn text-white "
						disabled={currentDocumentIndex === 0}>
						Anterior
					</button>

					<button
						onClick={()=>setIsCompare(true)}
						className=" globalbtn text-white">
						Comparar
					</button>
					<button
						onClick={handleNext}
						className=" globalbtn text-white "
						disabled={
							currentDocumentIndex === documentUrls.length - 1
						}>
						Siguiente
					</button>
				</div>
			</div>
			{/* <CompareDocs
				isOpen={isCompare}
				closeModal={setIsCompare}
				src={currentDocumentUrl.document_link}
				userId={userId}
				fileExtension={fileExtension}
			/> */}
		</Modal>
	);
};

export default OpenDocs;
