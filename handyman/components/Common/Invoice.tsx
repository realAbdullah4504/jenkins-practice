import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import useApiCaller from "@/hooks/useApiCaller";
import moment from "moment";
import { useState } from "react";
function Invoice({ subscription }: any) {
	const { userData } = useAuth();
	const user = userData[0];
	const companyDetails: any = {
		logo: null, // URL to logo if available
		name: "handyman",
		owner: "Owner Name",
		address: "Company's Address",
		cityStateZip: "City, State Zip",
		country: "France",
	};
	const clientDetails = {
		name: user?.name,
		address: user.streetAddress,
		cityStateZip: `${user?.address?.Admin_Name2}, ${user?.address?.Admin_Name}, ${user?.address?.Postal_Code}`,
		country: "France",
	};

	const paymentDetails = {
		paymentId: subscription?.paymentId,
		paymentMethod: subscription?.payment_details?.payment_method,
		paymentDate: moment(subscription?.createdAt).format("L"),
	};

	const items = [
		{
			description: subscription?.plan?.description,
			quantity: 1,
			rate: subscription?.plan?.price,
			amount: subscription?.plan?.price,
		},
	];

	const subTotal = subscription?.plan?.price;
	const apiCaller = useApiCaller();
	const [isDownloading, setIsDownloading] = useState(false);
	const handleClientError = clientError();
	// Function to download invoice
	const downloadPDF = async () => {
		try {
			// Fetch the PDF blob from the server
			setIsDownloading(true);
			const response = await apiCaller.post(
				`/subscription/get_invoice`,
				{ client: user, subscription },
				{ responseType: "blob" }
			);

			// Ensure response is not empty
			if (!response.data) {
				console.error("Empty response received from the server");
				return;
			}

			// Create a URL for the Blob
			const url = window.URL.createObjectURL(response.data);

			// Create a temporary anchor element
			const a = document.createElement("a");
			a.href = url;
			a.download = `invoice_${moment(Date.now()).format("L")}.pdf`;

			// Append the anchor to the document body
			document.body.appendChild(a);

			// Trigger a click event on the anchor to initiate the download
			a.click();

			// Clean up: remove the anchor and revoke the URL
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			handleClientError(error);
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<div className="max-w-5xl mx-auto p-5">
			<div className="">
				<div className="flex justify-between mb-8">
					<div>
						<span className="block w-full mb-2 font-bold text-gray-700">
							Facturar a:
						</span>
						<span className="block w-full mb-2">
							{clientDetails.name}
						</span>
						<span className="block w-full mb-2">
							{clientDetails.address}
						</span>
						<span className="block w-full mb-2">
							{clientDetails.cityStateZip}
						</span>
						<span className="block w-full mb-2">
							{clientDetails.country}
						</span>
					</div>
					<div className="space-y-2">
						<div className="flex items-center">
							<span className="block w-1/2 font-bold">
								ID de Pago
							</span>
							<span className="block w-1/2">
								{paymentDetails.paymentId}
							</span>
						</div>
						<div className="flex items-center">
							<span className="block w-1/2 font-bold">
								Método
							</span>
							<span className="block w-1/2">
								{paymentDetails.paymentMethod}
							</span>
						</div>
						<div className="flex items-center">
							<span className="block w-1/2 font-bold">Fecha</span>
							<span className="block w-1/2">
								{paymentDetails.paymentDate}
							</span>
						</div>
					</div>
				</div>

				<div className="bg-gray-800 text-white flex mb-6 p-2 rounded-t">
					<div className="w-1/2 p-2">Descripción del Artículo</div>
					<div className="w-1/6 p-2 text-right">Cant.</div>
					<div className="w-1/6 p-2 text-right">Tarifa</div>
					<div className="w-1/6 p-2 text-right">Monto</div>
				</div>

				{items.map((item: any) => (
					<div
						key={item.description}
						className="flex items-center mb-4 p-2 bg-gray-100 rounded">
						<div className="w-1/2 p-2">
							<span className="block w-full">
								{item.description}
							</span>
						</div>
						<div className="w-1/6 p-2 text-right">
							<span className="block w-full">
								{item.quantity}
							</span>
						</div>
						<div className="w-1/6 p-2 text-right">
							<span className="block w-full">{item.rate}</span>
						</div>
						<div className="w-1/6 p-2 text-right">
							<span className="block w-full">{item.amount}</span>
						</div>
					</div>
				))}

				<div className="flex justify-between mb-4">
					<div></div>
					<div className="space-y-2 w-1/2">
						<div className="flex justify-between">
							<span>Sub Total</span>
							<span>{subTotal?.toFixed(2)}</span>
						</div>

						<div className="bg-gray-200 p-2 rounded flex justify-between">
							<span className="font-bold">TOTAL</span>
							<span className="font-bold">
								${subTotal?.toFixed(2)}
							</span>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<span className="block w-full mb-2 font-bold">Notas</span>
					<span className="block w-full">
						Fue un placer hacer negocios con usted
					</span>
				</div>

				<div>
					<span className="block w-full mb-2 font-bold">
						Términos y Condiciones
					</span>
					<span className="block w-full">
						Por favor, realice el pago antes de la fecha de vencimiento.
					</span>
				</div>
			</div>
			{/* Download button */}
			<div className="text-center">
				<button
					disabled={isDownloading}
					className="globalbtn mt-5"
					onClick={downloadPDF}>
					Descargar Factura
				</button>
			</div>
		</div>
	);
}

export default Invoice;
