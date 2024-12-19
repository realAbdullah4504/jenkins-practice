import usePlanRequest from "@/ApiRequests/plan";
import paymentImages from "@/components/Dashboard/handyman/PaymentSetting/payments.png";
import { useAuth } from "@/context/AuthContext";
import useApiCaller from "@/hooks/useApiCaller";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BankTransferForm from "../Dashboard/handyman/SubscriptionManagment/components/pymentForm";
import ModalStruc from "./ModalStruc";

interface Plan {
	_id: string;
	name: string;
	duration_in_months: number;
	price: number;
}

interface ActivePlan {
	plan: string;
	end_date: string;
}

interface PendingSubscription {
	plan: Plan;
}

const PlanCards: React.FC = () => {
	const { userData } = useAuth();
	const user: any = userData[0];
	const { GetPlans } = usePlanRequest();
	const { data: Plans } = GetPlans({ pageSize: 1 }, {});
	const active_plan: any = user?.craftsman?.current_subscription;

	function calculateRemainingDays(endDate: string): number {
		const currentDate = new Date(); // Get the current date
		// Calculate remaining milliseconds
		const remainingMs = new Date(endDate).getTime() - currentDate.getTime();
		// Convert remaining milliseconds to days
		const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
		if (remainingDays < 0) {
			return 0;
		}
		return remainingDays;
	}
	const [pendingSubscription, setPendingSubscription] = useState<any>(null);

	const apiCaller = useApiCaller();

	const [initiatPayment, setInitiatPayment] = useState(null);

	useEffect(() => {
		apiCaller.get("/subscription/get_pending_subs").then((res: any) => {
			setPendingSubscription(res.data);
		});
	}, [apiCaller, initiatPayment]);
	const [isUserActivated, setIsUserActivated] = useState(false);
	return (
		<div className="my-7 mx-5 flex flex-row gap-4">
			{Plans?.sort(
				(a: any, b: any) => a.duration_in_months - b.duration_in_months
			).map((item: any, idx: any) => (
				<div
					key={idx}
					className="flex bg-white items-center pb-0 flex-col justify-between p-4 border border-gray-300 rounded-lg h-[20rem] shadow-md mb-4">
					<div className="flex items-center justify-between flex-col h-full">
						<span className="font-semibold text-center text-2xl">
							{item?.name}
						</span>
						<div className="text-center ">
							<div className="flex items-center gap-1 justify-center mb-2">
								{active_plan?.plan === item._id
									? calculateRemainingDays(
											active_plan?.end_date
									  )
											.toString()
											.split("")
											.map((i, ind) => (
												<span
													key={ind}
													className="font-semibold shadow text-white text-[25px] bg-gradient-to-b from-[#3A3A3A] to-[#121212] rounded px-3">
													{i}
												</span>
											))
									: (item.duration_in_months * 30)
											.toString()
											.split("")
											.map((i, ind) => (
												<span
													key={ind}
													className="font-semibold shadow text-white text-[25px] bg-gradient-to-b from-[#3A3A3A] to-[#121212] rounded px-3">
													{i}
												</span>
											))}
							</div>
							<p>
								{item._id !== active_plan?.plan
									? item.duration_in_months * 30
									: calculateRemainingDays(
											active_plan.end_date
									  )}{" "}
								días restantes
							</p>
						</div>
						<span className="mr-2 text-3xl">${item.price}</span>
						{(item._id === pendingSubscription?.plan?._id ||
							item._id === active_plan?.plan) && (
							<button
								disabled={pendingSubscription || active_plan}
								onClick={() => setInitiatPayment(item)}
								className={`py-1 px-4 rounded-xl ${
									active_plan.status === "active" &&
									item?._id === active_plan?.plan
										? "bg-[#FF6A18] text-[#ffffff]"
										: "border border-black bg-white text-black"
								}`}>
								{active_plan.status === "active"
									? item?._id === active_plan?.plan &&
									  "Activo"
									: "Expirado"}
								{item?._id === pendingSubscription?.plan?._id &&
									"Pendiente"}
							</button>
						)}
						{!pendingSubscription &&
							active_plan?.status !== "active" && (
								<button
									onClick={() => {
										if (
											user?.craftsman?.status ===
											"unverified"
										) {
											setIsUserActivated(true);
										}
										setInitiatPayment(item);
									}}
									className="py-1 px-4 rounded-xl border border-black bg-white text-black">
									Pedir
								</button>
							)}
						{calculateRemainingDays(active_plan?.end_date) ===
							30 && (
							<button
								disabled={pendingSubscription && true}
								onClick={() => setInitiatPayment(item)}
								className="py-1 px-4 rounded-xl border border-black bg-white text-black">
								Mejorar
							</button>
						)}
					</div>
					<div className="mt-4 pb-2">
						<Image width={386} src={paymentImages} alt="" />
					</div>
				</div>
			))}
			<ModalStruc
				isOpen={initiatPayment ? true : false}
				closeModal={() => setInitiatPayment(null)}>
				<BankTransferForm
					subscription={initiatPayment}
					closeModal={() => setInitiatPayment(null)}
				/>
			</ModalStruc>
			<ModalStruc
				isOpen={isUserActivated}
				closeModal={() => setIsUserActivated(false)}>
				<div>
					<p className="mb-4 text-[20px] max-w-[300px] text-center bg-orange text-white rounded p-4 shadow">
						Tu perfil aún no está activado. Puedes usar esta función tan pronto como tu perfil haya sido activado
					</p>
				</div>
			</ModalStruc>
		</div>
	);
};

export default PlanCards;
